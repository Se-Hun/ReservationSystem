export function isLoggedIn() {
    return sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("access_token") !== "undefined";
}

export function deleteTokens() {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("account")
}

export function login(account, token) {
    sessionStorage.setItem("access_token", token)
    sessionStorage.setItem("account", account)
}
