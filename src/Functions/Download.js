function download(name) {
  var fileToDownload = [
    {
      path: `Buttons/${name}/index.html`,
      name: `index.html`,
    },
    {
      path: `Buttons/${name}/style.css`,
      name: `style.css`,
    },
    {
      path: `Buttons/${name}/app.js`,
      name: `app.js`,
    },
  ];

  console.log(fileToDownload);
  var tempDownloadLink = document.createElement("a");
  tempDownloadLink.style.display = "none";
  document.body.appendChild(tempDownloadLink);
  for (var n = 0; n < 3; n++) {
    var download = fileToDownload[n];
    tempDownloadLink.setAttribute("href", download.path);
    tempDownloadLink.setAttribute("download", download.name);
    tempDownloadLink.click();
  }

  document.body.removeChild(tempDownloadLink);
}
export default download;
