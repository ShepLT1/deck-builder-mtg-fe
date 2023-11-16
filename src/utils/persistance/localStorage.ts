export const setLocalStorageLoggedIn = (val: string) => {
  window.localStorage.setItem("loggedIn", val)
  window.dispatchEvent(new Event("localStorageLoggedIn"))
}
