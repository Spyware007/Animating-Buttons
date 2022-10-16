function download(name) 
{
  var filesDownload = [];
  filesDownload.push( { path: `Buttons/${name}/index.html`, name: `${name}.html` } );
  filesDownload.push( { path: "/path/file2.jpg", name: `style.css` } );
  var tempDownloadLink = document.createElement("a");
    tempDownloadLink.style.display = 'none';
    document.body.appendChild( tempDownloadLink );
    for( var n = 0; n < filesDownload.length; n++ )
    {
        var download = filesDownload[n];
        tempDownloadLink.setAttribute( 'href', download.path );
        tempDownloadLink.setAttribute( 'download', download.name );
        tempDownloadLink.click();
    }

    document.body.removeChild( tempDownloadLink );
};
export default download