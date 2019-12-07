export function isLoggedIn() {
    return sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("access_token") !== "undefined";
}

export function deleteTokens() {
    sessionStorage.removeItem("account")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("accountname")
    sessionStorage.removeItem("phonenum")
    sessionStorage.removeItem("cardcompany")
    sessionStorage.removeItem("cardnum")
}

export function login(account, token, accountname, phonenum, cardcompany, cardnum) {
    sessionStorage.setItem("account", account)
    sessionStorage.setItem("access_token", token)
    sessionStorage.setItem("accountname", accountname)
    sessionStorage.setItem("phonenum", phonenum)
    sessionStorage.setItem("cardcompany", cardcompany)
    sessionStorage.setItem("cardnum", cardnum)
}
