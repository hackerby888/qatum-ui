export namespace Storage {
    export function setWallet(wallet: string) {
        localStorage.setItem("wallet", wallet);
    }

    export function getWallet() {
        return localStorage.getItem("wallet");
    }

    export function setLoginCredential(token: string) {
        localStorage.setItem("token", token);
    }

    export function getLoginCredential() {
        return localStorage.getItem("token");
    }
}
