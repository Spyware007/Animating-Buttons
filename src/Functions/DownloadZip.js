import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function download(css, html, js, name) {
  const zip = new JSZip();
  zip.file("style.css", css);
  zip.file("index.html", html);
  zip.file("app.js", js);

  zip.generateAsync({ type: "blob" }).then((zipFile) => {
    saveAs(zipFile, `${name} files.zip`);
  });
}
