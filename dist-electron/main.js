import { app as e, BrowserWindow as t } from "electron";
import { fileURLToPath as i } from "url";
import n from "path";
n.dirname(i(import.meta.url));
function o(r = "/") {
  new t({
    width: 900,
    height: 700
  }).loadURL(`${process.env.VITE_DEV_SERVER_URL}/#/${r}`);
}
e.whenReady().then(() => {
  o(""), o("bms"), o("motorController");
});
e.on("window-all-closed", () => {
  e.quit();
});
