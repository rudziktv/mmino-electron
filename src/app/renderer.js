const minApp = document.getElementById("minApp");

const closeApp = document.getElementById("closeApp");

minApp?.addEventListener("click", () => {
    // window.electronAPI.minimizeWindow();
    // ipcRenderer.send("minimizeWindow");
    // window.electronAPI.send("minimizeWindow");
    // alert("KURWO JEBANA");
    // window.ipcRenderer.send("minimizeWindow");
    // app.window.minimizeWindow();
});

closeApp?.addEventListener("click", () => {
    window.close();
});
