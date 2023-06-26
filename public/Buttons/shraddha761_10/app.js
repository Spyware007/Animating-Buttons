document.getElementById( "btn-top" ).addEventListener( "click", function(){
    
    var tl = gsap.timeline();
  
 
    tl.to("#phone",{y: 20, ease: "expo.out", duration: 0.4},"<");
    tl.to("#phone",{y: -20, ease: "expo.out", duration: 0.4}, 0.3);
  
    tl.to("#like", {y: -200, ease: "expo.out", duration: 0.4},"<");
    tl.to("#like", {css:{opacity: 1},duration: 0.1}, "<");
   
    tl.to("#like", {y: 200, ease: "expo.out", duration: 0.4}, 1.3);
    tl.to("#like", {css:{opacity: 0},duration: 0.1}, "<");
  
  
} );