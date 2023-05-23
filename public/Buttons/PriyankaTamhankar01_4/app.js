const sharebtn = 
    document.querySelector('.sharebtn')
  
// Creating a bool variable for changing
// the image of share button 
var bool = 0
  
// Adding an event listener
sharebtn.addEventListener('click', () => {
  
    // As we clicked the mouse over
    // the share button the bool value.
    //  get flipped and then working of
    // if-else loop get starts
    bool = !bool
      
    if (bool == 0) {
        sharebtn.innerHTML =
            '<i class="far fa-share-square"></i>'
    } else {
        sharebtn.innerHTML =
            '<i class="fas fa-times"></i>'
    }
})