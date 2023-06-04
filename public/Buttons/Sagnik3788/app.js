document.getElementById('button').addEventListener('click', function() {
    // Change the button text when clicked
    this.innerText = 'Clicked!';

    // Change the background color after 1 second
    setTimeout(function() {
      document.getElementById('button').style.backgroundColor = '#373737';
    }, 1000);
    
    setTimeout(function() {
      document.getElementById('button').classList.add('spin');
    }, 3000);

    setTimeout(function() {
      document.getElementById('button').classList.remove('spin');
    }, 4000);

  });
  