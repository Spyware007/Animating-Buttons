function download(name) {
  var filesToDownload = [
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

  filesToDownload.forEach((file) => {
    var tempDownloadLink = document.createElement("a");
    tempDownloadLink.style.display = "none";
    tempDownloadLink.href = file.path;
    tempDownloadLink.download = file.name;
    document.body.appendChild(tempDownloadLink);
    tempDownloadLink.click();
    document.body.removeChild(tempDownloadLink);
  });
}

export default download;
