 if (document.getElementById('upbutton')) {
  let timeOut;

  window.onscroll = function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 500) {
      document.getElementById('upbutton').classList.add('show');
    } else {
      document.getElementById('upbutton').classList.remove('show');
    }
  }

  document.getElementById('upbutton').addEventListener('click', function(){
    let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
      window.scrollBy(0,document.documentElement.scrollTop * -1);
    };
  })

 }


