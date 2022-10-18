
export default function download(Name, html, css)
{
var files = [];
files.push( { path: `Buttons/${Name}/${html}.html`, name: `${Name}.html` } );
files.push( { path: `Buttons/${Name}/${css}.css`, name: `${css}.css` } );
    
var tmpDLink = document.createElement("a");
    tmpDLink.style.display = 'none';

    document.body.appendChild( tmpDLink );

    for( var n = 0; n < files.length; n++ )
    {
        var download = files[n];
        tmpDLink.setAttribute( 'href', download.path );
        tmpDLink.setAttribute( 'download', download.name );

        tmpDLink.click();
    }

    document.body.removeChild( tmpDLink );
} 