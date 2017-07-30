var timeOnSlide = 3,
	timeBetweenSlides = 1,
	animationstring = 'animation',
	animation = true,
	keyframeprefix = '',
	domPrefixes = 'Webkit Moz O Khtml'.split(' '),
	pfx  = '',
	slidy = document.getElementById("slidy");

if (slidy.style.animationName !== undefined) {
	animation = true;
}
if ( animation === false ) {
	for ( var i = 0; i < domPrefixes.length; i++ ) {
		if ( slidy.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
			pfx = domPrefixes[ i ];
			animationstring = pfx + 'Animation';
			keyframeprefix = '-' + pfx.toLowerCase() + '-';
			animation = true;
			break;
			}
		}
	}
if ( animation === false ) {
  // animate using a JavaScript fallback, if you wish
	} else {
		var slides = slidy.querySelectorAll(".snapshot"),
			firstSlide = slides[0],
			slideWrap = firstSlide.cloneNode(true);
			slidy.appendChild(slideWrap);
		var slideCount = slides.length,
			totalTime = (timeOnSlide + timeBetweenSlides) * (slideCount - 1),
			slideRatio = (timeOnSlide / totalTime)*100,
			moveRatio = (timeBetweenSlides / totalTime)*100,
			basePercentage = 100/slideCount,
			position = 0,
			css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML += "#slidy { text-align: left; margin: 0; position: relative; width: " + (slideCount * 100) + "%;  }";
			css.innerHTML += "#slidy .snapshot { float: left; width: " + basePercentage + "%; }";
			css.innerHTML += "@"+keyframeprefix+"keyframes slidy {";
		for (i=0;i<(slideCount-1); i++) {
			position+= slideRatio;
			css.innerHTML += position+"% { left: -"+(i * 100)+"%; }";
			position += moveRatio;
			css.innerHTML += position+"% { left: -"+((i+1) * 100)+"%; }";
		}
	css.innerHTML += "}";
	css.innerHTML += "#slidy { left: 0%; "+keyframeprefix+"transform: translate3d(0,0,0); "+keyframeprefix+"animation: "+totalTime+"s slidy infinite; }";
	document.body.appendChild(css);
}
