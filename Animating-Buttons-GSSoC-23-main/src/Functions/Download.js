function download(name) {
  var filesDownload = [];
  filesDownload.push({
    path: `Buttons/${name}/index.html`,
    name: `index.html`,
  });
  filesDownload.push({
    path: `Buttons/${name}/style.css`,
    name: `style.css`,
  });
  filesDownload.push({
    path: `Buttons/${name}/app.js`,
    name: `app.js`,
  });

  console.log(filesDownload);
  var tempDownloadLink = document.createElement("a");
  tempDownloadLink.style.display = "none";
  document.body.appendChild(tempDownloadLink);
  for (var n = 0; n < filesDownload.length; n++) {
    var download = filesDownload[n];
    tempDownloadLink.setAttribute("href", download.path);
    tempDownloadLink.setAttribute("download", download.name);
    tempDownloadLink.click();
  }

  document.body.removeChild(tempDownloadLink);
}
export default download;
