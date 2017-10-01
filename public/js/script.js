// window.onscroll = function() {
//   const element = document.querySelectorAll('div.navbar')
//   element.forEach( element => {
//     if ( window.pageYOffset > 495 ) {
//       element.classList.add('stuck');
//     } else {
//       element.classList.remove('stuck');
//     }
//
//   })
// }

// // Get the navbar
// var navbar = document.querySelectorAll( 'div.navbar' );
//
// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;
//
// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if ( window.scrollY >= sticky ) {
//     navbar.classList.add( "sticky" )
//   } else {
//     navbar.classList.remove( "sticky" );
//   }
// }
//
// Side navigation script
const openNavBtn = document.querySelector( '.open-nav' )
const closeNavBtn = document.querySelector( '.close-nav' )
const sideNav = document.querySelector( "#mySidenav" )

openNavBtn.addEventListener( 'click', openNav )
closeNavBtn.addEventListener( 'click', closeNav )
 // Open the sidenav
function openNav() {
  console.log("open nav")
  sideNav.classList.add( "openNav" );
  // document.querySelector( "#mySidenav" ).style.width = "100vw";
}

 // Close/hide the sidenav
function closeNav() {
  sideNav.classList.remove( "openNav" );
}


let currentIndex = 0;
const slides = document.querySelectorAll( ".snapshot" );
const slidesLarge = document.querySelectorAll( ".snapshotLarge" );
const arrowLeft = document.querySelector( ".arrow-left" );
const arrowRight = document.querySelector( ".arrow-right" );
const arrowLeftLarge = document.querySelector( ".arrow-left-large" );
const arrowRightLarge = document.querySelector( ".arrow-right-large" );
const mobileView = document.querySelector( ".mobileScreen" );
const largeView = document.querySelector( ".largeScreen" );


arrowLeft.addEventListener( 'click', function() {
  return slideManager(-1)
})

arrowRight.addEventListener( 'click', function() {
  return slideManager(1)
})

arrowLeftLarge.addEventListener( 'click', function() {
  return slideManagerLarge(-1)
})

arrowRightLarge.addEventListener( 'click', function() {
  return slideManagerLarge(1)
})





function initSlides() {
  slides[ currentIndex ].classList.add( "initializeSlide")
  slidesLarge[ currentIndex ].classList.add( "initializeSlide")
  console.log( "======> slides are initialized!" )
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
    slides[ nextSlideIndex ].classList.remove( "initializeSlide" );
  } else {
    slides[ prevSlideIndex ].classList.remove( "initializeSlide" );
  }
  slides[ currentIndex ].classList.add( "initializeSlide" );
}

function slideManagerLarge( n ) {
  let prevSlideIndex, nextSlideIndex

  if( currentIndex === 0 && n === -1 ) {
    currentIndex = slidesLarge.length - 1;
    nextSlideIndex = 0;
    prevSlideIndex = currentIndex - 1;
  } else if ( currentIndex === slidesLarge.length - 1 && n === 1) {
    currentIndex = 0;
    nextSlideIndex = currentIndex + 1;
    prevSlideIndex = slidesLarge.length - 1;
  } else {
    currentIndex += n;
    nextSlideIndex = currentIndex + 1;
    prevSlideIndex = currentIndex - 1;
  }
  console.log( "currentIndex:", currentIndex )
  console.log( "nextSlideIndex:", nextSlideIndex )
  console.log( "prevSlideIndex:", prevSlideIndex )

  if( n < 0 ) {
    slidesLarge[ nextSlideIndex ].classList.remove( "initializeSlide" );
  } else {
    slidesLarge[ prevSlideIndex ].classList.remove( "initializeSlide" );
  }
  slidesLarge[ currentIndex ].classList.add( "initializeSlide" );
}



document.body.onload = initSlides();
