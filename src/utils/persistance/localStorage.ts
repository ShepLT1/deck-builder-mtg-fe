export const setLocalStorageUserId = (val: number) => {
  window.localStorage.setItem("user", String(val))
  window.dispatchEvent(new Event("localStorageUserId"))
}
