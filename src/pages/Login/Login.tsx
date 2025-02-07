import queryKeys from "@/apis/getQueryKey";
import useGeneralPost from "@/apis/useGeneralPost";
import MaterialUIInput from "@/components/MaterialUIInput";
import QButton from "@/components/QButton";
import QButtonSimple from "@/components/QButtonSimple";
import { Storage } from "@/utils/storage";
import { Box } from "@mui/material";
import { log } from "echarts/types/src/util/log.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    let [user, setUser] = useState("");
    let [password, setPassword] = useState("");

    let {
        mutate: login,
        isSuccess,
        isError,
        isPending,
        error,
        data,
    } = useGeneralPost({
        queryKey: queryKeys["login"](),
        path: "login",
    });

    let navigate = useNavigate();

    const handleLogin = () => {
        login({
            user,
            password,
        } as any);
    };

    useEffect(() => {
        if (isSuccess) {
            Storage.setLoginCredential(data?.token as string);
            setTimeout(() => {
                navigate("/stats");
            }, 3000);
        }
    });

    return (
        <Box
            sx={{
                paddingTop: "30px",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    paddingBottom: "10px",
                }}
            >
                Login
            </Box>

            {error ? (
                <Box
                    sx={{
                        borderRadius: "5px",
                        color: "red",
                        marginBottom: "8px",
                    }}
                >
                    {`${error}`}
                </Box>
            ) : (
                ""
            )}
            <Box
                sx={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <MaterialUIInput
                    onChange={(e: any) => setUser(e.target.value)}
                    customCss={{
                        borderRadius: "5px",
                    }}
                    value={user}
                    label="User"
                />
                <MaterialUIInput
                    onChange={(e: any) => setPassword(e.target.value)}
                    customCss={{
                        marginTop: "8px",
                        borderRadius: "5px",
                    }}
                    value={password}
                    label="Password"
                    type="password"
                />

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {" "}
                    {isSuccess ? (
                        <Box
                            sx={{
                                borderRadius: "5px",
                                color: "var(--q-main-color)",
                                marginY: "8px",
                            }}
                        >
                            Login Success, Redirecting in 3s...
                        </Box>
                    ) : (
                        <QButtonSimple
                            onClick={handleLogin}
                            customCss={{
                                paddingY: "5px",
                                marginTop: "8px",
                                width: "100%",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            text={!isPending ? "Login" : "Login..."}
                            isDisabled={isPending}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
