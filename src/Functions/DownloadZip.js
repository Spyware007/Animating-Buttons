import JSZip from 'jszip';

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

  var zip = new JSZip();

  var promises = filesToDownload.map((file) => {
    return fetch(file.path)
      .then((response) => response.blob())
      .then((blob) => {
        zip.file(file.name, blob);
      });
  });

  Promise.all(promises)
    .then(() => zip.generateAsync({ type: 'blob' }))
    .then((content) => {
      var tempDownloadLink = document.createElement('a');
      tempDownloadLink.style.display = 'none';
      var zipFileName = `${name}_files.zip`;
      tempDownloadLink.href = URL.createObjectURL(content);
      tempDownloadLink.download = zipFileName;
      document.body.appendChild(tempDownloadLink);
      tempDownloadLink.click();
      document.body.removeChild(tempDownloadLink);
    });
}

export default download;
