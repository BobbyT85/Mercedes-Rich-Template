/*************************************************************************************************/
/* Custom variables - divs are automatically made into vars in vars.min.js ***********************/
/*************************************************************************************************/

gsap.registerPlugin(SplitText);

var tl = new gsap.timeline(), tlAnim = new gsap.timeline(), split,
	loadArray, buttonArray, button, disabledArray, disabledButton, type,
	i, j;

var ftVideo, isAutoplay, loops, remainingLoops, endframePause;
	
	
	


/*************************************************************************************************/
/* Banner initialisation, loading, event listening etc *******************************************/
/*************************************************************************************************/

function init() {
	createTimeline();
	addEventListeners();

	loadArray = [
		// {url:"images/background.jpg", div:"background"}
	]

	if (Array.isArray(loadArray) && loadArray.length) {
		politeLoad(loadArray,
		function() {
			console.log(":: all loads complete ::");
			gsap.delayedCall(1, function() { tl.play(); });
		});
	} else {
		gsap.delayedCall(1, function() { tl.play(); });
	}
}

function addEventListeners() {
	console.log(":: adding event listeners ::");
	buttonArray = [
		contentContainer,
		bigPlayButton, soundOffButton, soundOnButton, playButton, pauseButton, replayButton,
		dynamicTerms, closeButton
	];
	for (i = 0; i < buttonArray.length; i++) {
		button = buttonArray[i];
		button.style.cursor = "pointer";
		button.addEventListener("mouseover", buttonHandler, false);
		button.addEventListener("mouseout", buttonHandler, false);
		button.addEventListener("mouseenter", buttonHandler, false);
		button.addEventListener("mouseleave", buttonHandler, false);
		button.addEventListener("click", buttonHandler, false);
	}

	disabledArray = [];
	for (i = 0; i < disabledArray.length; i++) {
		disabledButton = disabledArray[i];
		disabledButton.style.pointerEvents = "none";
	}
}





/*************************************************************************************************/
/* Timeline & any other animation & logic ********************************************************/
/*************************************************************************************************/

function createTimeline() {
	console.log(":: creating timeline ::");

	var ua 		= window.navigator.userAgent,
		msie 	= ua.indexOf("MSIE ");
		
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) CSSPlugin.defaultForce3D = false;

	tl		.set([text2, text3, text4, dynamicTerms, soundOffButton, soundOnButton, playButton, pauseButton, replayButton], {autoAlpha:0})
			.call(function() {
				ftVideo 		= myFT.$("#video")[0];
				ftVideo.muted 	= (myFT.instantAds.muted === "true");
				isAutoplay 		= (myFT.instantAds.autoplay === "true");
				loops 			= parseInt(myFT.instantAds.loops);
				remainingLoops 	= loops;
				endframePause 	= parseInt(myFT.instantAds.endframePause);

				ftVideo.addEventListener("ended", videoEndHandler); 
				// console.log("isMuted: ", ftVideo.muted);
				// console.log("isAutoplay: ", isAutoplay);
				// console.log("loops: ", loops);
				// console.log("endframePause: ", endframePause);
			}, [])

			.addLabel("start")
			.call(displayFrame, [0], "start")
			.to(preloadShape, {duration:0.5, autoAlpha:0, rotationZ:0.01}, "start")
			.call(function() { if (isAutoplay === "true") tlAnim.play(); }, [], "start+=0.5")
			.pause();


	
	tlAnim 	.addLabel("start")
			.set(ctaButton, {x:-133})

			.addLabel("frame1", 0)
			
			.call(function() {
				if (dynamicTermsActive.textContent === "false") dynamicTerms.style.display = "none";

				split = new SplitText(dynamicCtaText, {type:"words"});
				split.words = split.words.reverse();
				// console.log(split.words);
			})
			
			.call(function() {
				// ftVideo.play();
				gsap.set([bigPlayButton, replayButton], {autoAlpha:0});
				(ftVideo.muted) ? gsap.to([soundOffButton, pauseButton], {duration:0.5, autoAlpha:1, ease:"quad.inOut", overwrite:false}) : gsap.to([soundOnButton, pauseButton], {duration:0.5, autoAlpha:1, ease:"quad.inOut", overwrite:false});
			}, [], "frame1")
			.set(background, {autoAlpha:0, rotationZ:0.01}, "frame1")
			
			.addLabel("frame2", 3)
			.to(text1, {duration:0.5, x:20, autoAlpha:0, ease:"quad.inOut", overwrite:false}, "frame2")
			.fromTo(text2, {x:-20}, {duration:0.5, x:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame2+=0.3")
			
			.addLabel("frame3", 6)
			.to(text2, {duration:0.5, x:10, autoAlpha:0, ease:"quad.inOut", overwrite:false}, "frame3")
			.fromTo(text3, {x:-10}, {duration:0.5, x:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame3+=0.3")
			
			.addLabel("frame4", 9)
			.to(text3, {duration:0.5, x:10, autoAlpha:0, ease:"quad.inOut", overwrite:false}, "frame4")
			.fromTo(text4, {x:-10}, {duration:0.5, x:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame4+=0.3")
			
			.addLabel("frame5", 12.2)
			.to(text4, {duration:0.5, autoAlpha:0, ease:"quad.inOut", overwrite:false}, "frame5")
			.to(text4, {duration:1, y:"-=300", ease:"quad.inOut", overwrite:false}, "frame5")

			.fromTo(text5, {y:"+=100"}, {duration:0.75, y:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame5+=0.5")
			.fromTo(text6, {y:"+=100"}, {duration:0.75, y:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame5+=0.55")
			.fromTo(dynamicTerms, {y:"+=100"}, {duration:0.75, y:0, autoAlpha:1, ease:"quad.inOut", overwrite:false}, "frame5+=0.6")
			.call(showCTA, ["-=133"], "frame5+=1.5")
				
			// .to(ctaButtonContainer, {duration:0.3, autoAlpha:1, ease:"quad.inOut", overwrite:false},"frame5+=1")
			// .call(flashCTA, [], "frame5+=2")

			.call(function() {
				if (loops > 0) {
					// console.log(loops + "loops left");
					loops--;
					gsap.delayedCall(endframePause, function() { tlAnim.play("start"); });
				}
			}, [])

			.addLabel("end", 20)

			.pause();
}

function displayFrame($frame) { 
	frame = $frame;
	($frame === 0) ? console.log(":: TIMELINE - banner start ::") : console.log(":: TIMELINE - frame " + $frame + " ::");
}

function showCTA($xPos) {
	gsap.set(ctaButtonContainer, {autoAlpha:1, force3D:false, rotationZ:0.01, overwrite:false});
	gsap.to(ctaButton, {duration:0.3, x:0, force3D:false, rotationZ:0.01, ease:"quad.inOut", overwrite:false});

	gsap.from(split.words, {duration:0.5, x:$xPos, force3D:false, rotationZ:0.01, ease:"quad.inOut", stagger:0.1, overwrite:false, onComplete:function() {
		animateCTA();
	}});
}

function animateCTA() {
	gsap.to(shine, {duration:0.1, autoAlpha:0.2, force3D:false, rotationZ:0.01, ease:"quad.inOut", overwrite:false});

	gsap.to(shine, {duration:0.4, delay:0.1, scale:8, force3D:false, rotationZ:0.01, ease:"quad.inOut", overwrite:false});
	gsap.to(shine, {duration:0.4, autoAlpha:0.5, force3D:false, rotationZ:0.01, ease:"quad.inOut", overwrite:false});
	gsap.to(shine, {duration:0.2, delay:0.5, autoAlpha:0, force3D:false, rotationZ:0.01, ease:"quad.inOut", overwrite:false, onComplete:function() {
		gsap.set(shine, {force3D:false, rotationZ:0.01, scale:1});
	}});
}

function flashCTA() {
	gsap.to(ctaButtonContainer, {duration:0.3, autoAlpha:0.75, ease:"quad.inOut", yoyo:true, repeat:1, overwrite:false});
}





/*************************************************************************************************/
/* Event handlers ********************************************************************************/
/*************************************************************************************************/
function buttonHandler($e) {
	button 	= $e.currentTarget;
	type	= $e.type;

	switch (button) {
		case contentContainer:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{
												gsap.set(bigPlayButton, {autoAlpha:0});
												tlAnim.play("end");
												ftVideo.pause();
												gsap.set([ftVideo, ".icon"], {autoAlpha:0});
												gsap.set(replayButton, {autoAlpha:1});
											}
			break;

		case bigPlayButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(bigPlayButton, {autoAlpha:0});
												tlAnim.play("start");
												ftVideo.play(); 
											}
			break;

		case soundOffButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(soundOffButton, {autoAlpha:0});
												gsap.set(soundOnButton, {autoAlpha:1});
												ftVideo.muted = false;
											}
			break;

		case soundOnButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(soundOffButton, {autoAlpha:1});
												gsap.set(soundOnButton, {autoAlpha:0});
												ftVideo.muted = true;
											}
			break;

		case playButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(playButton, {autoAlpha:0});
												gsap.set(pauseButton, {autoAlpha:1});
												ftVideo.play();
												tlAnim.resume(); 
											}
			break;

		case pauseButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(playButton, {autoAlpha:1});
												gsap.set(pauseButton, {autoAlpha:0});
												ftVideo.pause();
												tlAnim.pause(); 
											}
			break;

		case replayButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												gsap.set(button, {autoAlpha:0});
												ftVideo.muted = false;
												tlAnim.play("start");
												ftVideo.currentTime = 0;
												ftVideo.play();
												gsap.set(ftVideo, {autoAlpha:1});
											}
			break;

		case dynamicTerms:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "mouseenter") {  }
			else if (type === "mouseleave") {  }
			else if (type === "click") 		{ 
												$e.stopPropagation();
												gsap.to(termsContainer, {duration:0.5, top:0, ease:"power2.inOut"});
												// gsap.set(dynamicTerms, {autoAlpha:0, delay:0.5});
											}
			break;

		case termsContainer:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "mouseenter") {  } 
			else if (type === "mouseleave") {
												$e.stopPropagation();
												gsap.to(termsContainer, {duration:0.5, top:250, ease:"power2.inOut", onComplete:function() {
													// gsap.to(dynamicTerms, {duration:0.2, autoAlpha:1, ease:"quad.inOut", overwrite:false});
												}});
											}
			else if (type === "click") 		{  }
			break;

		case closeButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "mouseenter") {  } 
			else if (type === "mouseleave") {  }
			else if (type === "click") 		{ 
												$e.stopPropagation();
												gsap.to(termsContainer, {duration:0.5, top:250, ease:"power2.inOut", onComplete:function() {
													// gsap.to(dynamicTerms, {duration:0.2, autoAlpha:1, ease:"quad.inOut", overwrite:false});
												}});
											}
			break;
	}
}

function videoEndHandler($e) {
	gsap.to([soundOffButton, soundOnButton, playButton, pauseButton], {duration:0.3, autoAlpha:0, ease:"quad.inOut", overwrite:false});
	gsap.to(replayButton, {duration:0.3, delay:0.3, autoAlpha:1, ease:"quad.inOut", overwrite:false});
}





/*************************************************************************************************/
/* Check page has been loaded and initialised ****************************************************/
/*************************************************************************************************/

domready(function() {
	console.log(":: dom ready ::");
	if (elementScrape()) init();
});