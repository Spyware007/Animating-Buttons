function flipCover (css, options) {
    var options = options || {}
    if (typeof css === "object") {
      options = css
    } else {
      options.css = css
    }
  
    var css = options.css
    var url = options.url
    var text = options.text || css
    var width = options.width
    var height = options.height
  
    var $section = $(".flip-cover-" + css).addClass(css + "-section")
    var $button = $("<div>").addClass(css + "-button")
    var $cover = $("<div>").addClass(css + "-cover")
    var $outer = $("<div>").addClass(css + "-outer")
    var $inner = $("<div>").addClass(css + "-inner")
  
    if (width) {
      $section.css("width", width)
    }
  
    if (height) {
      $section.css("height", height)
  
      var lineHeight = ':after{ line-height: ' + height + ';}'
      var $outerStyle = $('<style>').text('.' + css + '-outer' + lineHeight)
      $outerStyle.appendTo($outer)
      var $innerStyle = $('<style>').text('.' + css + '-inner' + lineHeight)
      $innerStyle.appendTo($inner)
    }
  
    $cover.html($outer)
    $inner.insertAfter($outer)
  
    $button.html($("<a>").text(text).attr("href", url))
  
    $section.html($button)
    $cover.insertAfter($button)
   }
  
  
  
  flipCover({
    css: "dribbble",
    url: "https://dribbble.com/vveleva",
    text: "vveleva",
    width: "80px"
  })
  
  flipCover("twiter", {
    url: "https://twitter.com/vveleva",
    text: "vveleva",
    width: "80px"
  })
  
  flipCover("linkedin", {
    url: "https://linkedin.com/in/vveleva",
    text: "vveleva",
    width: "80px"
  })
  
  flipCover("email", {
    text: "vvveleva @gmail",
    width: "80px",
    height: "50px"
  })