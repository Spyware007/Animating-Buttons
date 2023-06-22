  $(document).ready(function() {
    $('button').click(function() {
      $(this).toggleClass('clicked');
      $('button p').text(function(i, text) {
        return text === "Sent!" ? "Send" : "Sent!";
      });
    });
  });