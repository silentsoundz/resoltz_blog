// Sticky navbar
// const element = document.getElementById('navbar')
// window.addEventListener('scroll', () => {
//      element.getBoundingClientRect().top < 0 ?
//      element.classList.add('stuck') :
//      element.classList.remove('stuck');
// });

window.onscroll = function() {
  const element = document.querySelectorAll('div.navbar')
  element.forEach( element => {
    if ( window.pageYOffset > 495 ) {
      element.classList.add('stuck');
    } else {
      element.classList.remove('stuck');
    }
  })
}

// Side navigation script

 // Open the sidenav
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

 // Close/hide the sidenav
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  let slide = document.getElementsByClassName("snapshot");
  if (n > slide.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slide.length}
  for (i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
  }
  slide[slideIndex-1].style.display = "flex";
}


let slideIndexLarge = 1;
showDivsLarge(slideIndexLarge);

function plusDivsLargeScreen(n) {
  showDivsLarge(slideIndexLarge += n);
}

function showDivsLarge(n) {
  let i;
  let largeSlide = document.getElementsByClassName("snapshotLarge");
  if (n > largeSlide.length) {slideIndexLarge = 1}
  if (n < 1) {slideIndexLarge = largeSlide.length}
  for (i = 0; i < largeSlide.length; i++) {
     largeSlide[i].style.display = "none";
  }
  largeSlide[slideIndexLarge-1].style.display = "flex";
}
