import "./App.css";
import { Box, Container } from "@mui/material";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import DvrRoundedIcon from "@mui/icons-material/DvrRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import Footer from "./components/Footer";
import IdManager from "./pages/IdManager/IdManager";
import PaymentManager from "./pages/PaymentManager/PaymentManager";
import Stats from "./pages/Stats/Stats";
import Header from "./components/Header";
import ElectricalServicesRoundedIcon from "@mui/icons-material/ElectricalServicesRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import SolutionsManager from "./pages/SolutionsManager/SolutionsManager";
import ClusterManager from "./pages/ClusterManager/ClusterManager";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router";
import Login from "./pages/Login/Login";
import { Storage } from "./utils/storage";
import NodeManager from "./pages/NodeManager/NodeManager";
import Status from "./pages/Status/Status";
import QSnackbar from "./components/QSnackbar";
function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (page: string) => {
        navigate(page);
    };

    return (
        <>
            <Header />

            <Container
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <QSnackbar />
                {/* <QDivider py={"5px"} /> */}

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            //  flexWrap: "wrap",
                            overflowX: "auto",
                        }}
                    >
                        {[
                            {
                                text: "Stats",
                                icon: QueryStatsRoundedIcon,
                            },
                            {
                                text: "ID Manager",
                                icon: DvrRoundedIcon,
                            },
                            {
                                text: "Payment Manager",
                                icon: LocalAtmRoundedIcon,
                            },
                            {
                                text: "Solutions Manager",
                                icon: GrainRoundedIcon,
                            },
                            {
                                text: "Cluster Manager",
                                icon: ElectricalServicesRoundedIcon,
                            },
                            {
                                text: "Node Manager",
                                icon: ComputerRoundedIcon,
                            },
                            {
                                text: "Status",
                                icon: EditAttributesIcon,
                            },
                            {
                                text: "Login",
                                icon: AdminPanelSettingsRoundedIcon,
                            },
                        ].map((item) => {
                            let isActive =
                                item.text.replace(/ /g, "-").toLowerCase() ===
                                location.pathname.replace("/", "");
                            return (
                                <Box
                                    key={item.text}
                                    onClick={() =>
                                        handleNavigate(
                                            item.text
                                                .replace(/ /g, "-")
                                                .toLowerCase()
                                        )
                                    }
                                    sx={{
                                        borderBottom: `2px solid var(${
                                            isActive
                                                ? "--q-main-color"
                                                : "--q-border-color"
                                        })`,
                                        userSelect: "none",
                                        cursor: "pointer",
                                        padding: "10px",
                                        display: Storage.getLoginCredential()
                                            ? "flex"
                                            : "none",
                                        alignItems: "center",
                                    }}
                                >
                                    {
                                        <item.icon
                                            sx={{
                                                marginRight: "5px",
                                            }}
                                            fontSize="small"
                                        />
                                    }
                                    {item.text}
                                </Box>
                            );
                        })}
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Routes>
                            {" "}
                            <Route path="stats" element={<Stats />} />
                            <Route path="login" element={<Login />} />
                            <Route path="id-manager" element={<IdManager />} />
                            <Route
                                path="payment-manager"
                                element={<PaymentManager />}
                            />
                            <Route
                                path="solutions-manager"
                                element={<SolutionsManager />}
                            />
                            <Route
                                path="cluster-manager"
                                element={<ClusterManager />}
                            />
                            <Route
                                path="node-manager"
                                element={<NodeManager />}
                            />
                            <Route path="/status" element={<Status />} />
                            <Route
                                path="*"
                                element={<Navigate to="/stats" />}
                            />
                        </Routes>
                    </Box>
                </Box>

                <Footer />
            </Container>
        </>
    );
}

export default App;
