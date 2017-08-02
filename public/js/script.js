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
  document.getElementById("mySidenav").style.width = "100vw";
}

 // Close/hide the sidenav
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


let currentIndex = 0;
const slides = document.getElementsByClassName( "snapshot" );

function initSlides() {
  slides[ currentIndex ].style = "display: block; left: 0vw;";
}

function slideManager( n ) {
  let prevSlideIndex, nextSlideIndex

  if( currentIndex === 0 && n === -1 ) {
    currentIndex = slides.length - 1;
    nextSlideIndex = 0;
    prevSlideIndex = currentIndex - 1;
  } else if ( currentIndex === slides.length - 1 && n === 1) {
    currentIndex = 0;
    nextSlideIndex = currentIndex + 1;
    prevSlideIndex = slides.length - 1;
  } else {
    currentIndex += n;
    nextSlideIndex = currentIndex + 1;
    prevSlideIndex = currentIndex - 1;
  }
  console.log( "currentIndex:", currentIndex )
  console.log( "nextSlideIndex:", nextSlideIndex )
  console.log( "prevSlideIndex:", prevSlideIndex )

  if( n < 0 ) {
    slides[ nextSlideIndex ].style = "display: none;";
  } else {
    slides[ prevSlideIndex ].style = "display: none;";
  }
  slides[ currentIndex ].style = "display: block; left: 0vw .slide-show-right; ";


// function transitionSlide(currentIndex) {
//   let slide = document.getElementsByClassName("snapshot");
//
//   if ( currentIndex >= slide.length - 1 ) { slideIndex = 0 }
//   if ( currentIndex < 1 ) { slideIndex = slide.length - 1 }
//   let prevSlide = slideIndex < 0
//     ? slide.length - 1
//     : slideIndex - 1
//   let nextSlide = slideIndex === slide.length - 1
//     ? 0
//     : slideIndex + 1
//
//   console.log( "prevSlide:", prevSlide )
//   console.log( "slide:", slide )
//
//   slide[nextSlide].style = "left: 100vw; z-index: 6;";
//
//   slide[slideIndex].style = "left: 0; z-index: 10;";
//
//   slide[prevSlide].style = "left: -999em; z-index: 5;";
// }


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

document.body.onload = initSlides();
