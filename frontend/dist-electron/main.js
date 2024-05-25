import { app as o, BrowserWindow as n } from "electron";
import { fileURLToPath as r } from "url";
import i from "path";
i.dirname(r(import.meta.url));
function e(t = "/") {
  new n({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }).loadURL(`${process.env.VITE_DEV_SERVER_URL}/#/${t}`);
}
o.whenReady().then(() => {
  e(""), e("bms"), e("motorController");
});
o.on("window-all-closed", () => {
  o.quit();
});
