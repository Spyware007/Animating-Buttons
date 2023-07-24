$(".cta").click(function(){
    $(this).addClass("active").delay(300).queue(function(next){
      $(this).removeClass("active");
      next();
    });
  });