const action = new Site()
document.addEventListener("DOMContentLoaded", () => {
     localStorage.setItem("visitorSaves", [])
     action.handleInitRender()
     action.handleFormSubmit()
})