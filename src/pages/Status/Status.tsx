import queryKeys from "@/apis/getQueryKey";
import useGeneralGet from "@/apis/useGeneralGet";
import QDivider from "@/components/QDivider";
import { SystemStatusApi } from "@/types";
import { Box } from "@mui/material";
import ms from "ms";

// Mining stops for one of a few reasons, none of which announce themselves anywhere else. Say which.
function miningState(data: SystemStatusApi): { text: string; color: string } {
    if (data.antTaskMismatch) {
        return {
            text: "HALTED — the node scores a different bpp9000 task than data/bpp9000.task",
            color: "red",
        };
    }
    if (!data.antContext) {
        return { text: "waiting for the epoch context from a node", color: "orange" };
    }
    if (!data.currentAnchor) {
        return { text: "waiting for a non-empty tick to anchor on", color: "orange" };
    }
    if (!data.canMineAnt) {
        return { text: "not mining", color: "orange" };
    }
    return { text: "mining", color: "var(--q-main-color)" };
}

export default function Status() {
    let { data } = useGeneralGet<SystemStatusApi>({
        queryKey: queryKeys["status"](),
        path: "status",
    });

    const rows: { text: string; value: any; color?: string }[] = [];

    if (data) {
        const state = miningState(data);

        rows.push(
            {
                text: "Last Success Sync Seed",
                value: ms(Date.now() - data.lastSuccessSyncSeed),
            },
            {
                text: "Last Fetch Score Time",
                value: ms(Date.now() - data.lastFetchScoreTime),
            },
            {
                text: "Last Highest Tick From Current Nodes",
                value: data.lastHighestTickFromCurrentNodes,
            },
            {
                text: "Last Highest Tick From Explorer",
                value: data.lastHighestTickFromExplorer,
            },
            { text: "Ant Colony", value: state.text, color: state.color }
        );

        if (data.antContext) {
            rows.push(
                { text: "Epoch", value: data.antContext.epoch },
                {
                    // Score is an error count, so lower is better and a solution passes at or below this.
                    text: "Epoch Threshold",
                    value: data.antContext.threshold,
                },
                {
                    text: "Freshness Window",
                    value: `${data.antContext.freshnessWindow} ticks`,
                },
                {
                    text: "Max Children Per Parent",
                    value: data.antContext.maxChildrenPerParent || "unbound",
                },
                {
                    text: "Solutions This Epoch (network)",
                    value: data.antContext.solutionCount,
                },
                {
                    text: "Free ANN Slots",
                    value: data.antContext.freeAnnSlotsCount,
                }
            );
        }

        if (data.currentAnchor) {
            // How far behind the tip the anchor sits. It has to stay well inside the freshness
            // window or a solution is rejected as stale and the computor's deposit is kept.
            const age =
                data.lastHighestTickFromCurrentNodes - data.currentAnchor.tick;
            rows.push({
                text: "Anchor Tick",
                value: `${data.currentAnchor.tick}${
                    age >= 0 ? ` (${age} behind tip)` : ""
                }`,
            });
        }

        if (data.currentJob) {
            const job = data.currentJob;
            // (0, 4294967295) is the identity's virtual root: a depth-1 child.
            const isRoot =
                job.parentTick === 0 &&
                job.parentSolutionIndexInTick === 4294967295;
            rows.push(
                { text: "Current Job", value: job.jobId },
                {
                    text: "Job Submit Threshold",
                    value: job.threshold,
                },
                {
                    text: "Job Parent",
                    value: isRoot
                        ? "root (depth 1)"
                        : `${job.parentTick}:${job.parentSolutionIndexInTick} (score ${job.parentScore})`,
                },
                {
                    text: "Job Age",
                    value: ms(Date.now() - job.createdAt),
                }
            );
        }
    }

    return (
        <Box
            sx={{
                paddingTop: "30px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                Status
            </Box>
            <Box
                sx={{
                    width: "50%",
                    border: "1px solid var(--q-border-color)",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "10px",
                }}
            >
                {rows.map((item) => (
                    <Box
                        key={item.text}
                        className="jura-font"
                        sx={{
                            paddingY: "5px",
                            display: "flex",
                            alignItems: "center",
                            ...(item.color ? { color: item.color } : {}),
                        }}
                    >
                        {item.text}
                        <QDivider />
                        {item.value}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
