export function isLoggedIn() {
    return sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== "undefined";
}

export function deleteTokens() {
    sessionStorage.removeItem("account")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("accountname")
    sessionStorage.removeItem("phonenum")
    sessionStorage.removeItem("cardcompany")
    sessionStorage.removeItem("cardnum")
    sessionStorage.removeItem("password")
}

export function login(account, token, accountname, phonenum, cardcompany, cardnum, password) {
    sessionStorage.setItem("account", account)
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("accountname", accountname)
    sessionStorage.setItem("phonenum", phonenum)
    sessionStorage.setItem("cardcompany", cardcompany)
    sessionStorage.setItem("cardnum", cardnum)
    sessionStorage.setItem("password", password)
}

export function getId() {
    sessionStorage.getItem("account")
}
export function getPassword()   {
    sessionStorage.getItem("password")
}
