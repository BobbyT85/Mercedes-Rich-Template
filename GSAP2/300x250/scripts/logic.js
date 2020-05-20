/*************************************************************************************************/
/* Custom variables - divs are automatically made into vars in vars.min.js ***********************/
/*************************************************************************************************/

var tl = new TimelineMax(), tlAnim = new TimelineMax(),
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
			TweenLite.delayedCall(1, function() { tl.play(); });
		});
	} else {
		TweenLite.delayedCall(1, function() { tl.play(); });
	}
}

function addEventListeners() {
	console.log(":: adding event listeners ::");
	buttonArray = [
		contentContainer,
		bigPlayButton, soundOffButton, soundOnButton, playButton, pauseButton, replayButton
	];
	for (i = 0; i < buttonArray.length; i++) {
		button = buttonArray[i];
		button.style.cursor = "pointer";
		button.addEventListener("mouseover", buttonHandler, false);
		button.addEventListener("mouseout", buttonHandler, false);
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

	tl		.set([text2, text3, text4, termsText, ctaButton, soundOffButton, soundOnButton, playButton, pauseButton, replayButton], {autoAlpha:0})
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
			})

			.addLabel("start")
			.call(displayFrame, [0], this, "start")
			.to(preloadShape, 0.5, {autoAlpha:0, rotationZ:0.01}, "start")
			.call(function() { if (isAutoplay === "true") tlAnim.play(); }, this, "start+=0.5")
			.pause();


	
	tlAnim 	.addLabel("start")

			.addLabel("frame1", 0)
			.call(function() {
				// ftVideo.play();
				TweenMax.to([bigPlayButton, replayButton], 0, {autoAlpha:0});
				(ftVideo.muted) ? TweenMax.to([soundOffButton, pauseButton], 0.5, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}) : TweenMax.to([soundOnButton, pauseButton], 0.5, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
			}, this, "frame1")
			.to(background, 0, {autoAlpha:0, rotationZ:0.01}, "frame1")
			
			.addLabel("frame2", 3)
			.to(text1, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false}, "frame2")
			.to(text2, 0.3, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}, "frame2+=0.3")
			
			.addLabel("frame3", 6)
			.to(text2, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false}, "frame3")
			.to(text3, 0.3, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}, "frame3+=0.3")
			
			.addLabel("frame4", 9.25)
			.to(text3, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false}, "frame4")
			.to(text4, 0.3, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}, "frame4+=0.3")
			
			.addLabel("frame5", 13.5)
			.to(text4, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false}, "frame5")
			.set(text4, {y:"-=137"}, "frame5+=0.3")
			.to([text4, ctaButton, termsText], 0.3, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}, "frame5+=0.3")
				
			.to(ctaButton, 0.2, {alpha:0.8, ease:Linear.easeOut}, "frame5+=1.5")		
			.to(ctaButton, 0.2, {alpha:1, ease:Linear.easeOut}, "frame5+=1.8")	

			.call(function() {
				if (loops > 0) {
					// console.log(loops + "loops left");
					loops--;
					TweenLite.delayedCall(endframePause, function() { tlAnim.play("start"); });
				}
			})

			.addLabel("end", 20)

			.pause();
}

function displayFrame($frame) { ($frame === 0) ? console.log(":: TIMELINE - banner start ::") : console.log(":: TIMELINE - frame " + $frame + " ::"); }





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
												TweenMax.to(bigPlayButton, 0, {autoAlpha:0});
												tlAnim.play("end");
												ftVideo.pause();
												TweenMax.set([ftVideo, ".icon"], {autoAlpha:0});
												TweenMax.set(replayButton, {autoAlpha:1});
											}
			break;
		case bigPlayButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(button, 0, {autoAlpha:0});
												tlAnim.play("start");
												ftVideo.play(); 
											}
			break;
		case soundOffButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(soundOffButton, 0, {autoAlpha:0});
												TweenMax.to(soundOnButton, 0, {autoAlpha:1});
												ftVideo.muted = false;
											}
			break;
		case soundOnButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(soundOffButton, 0, {autoAlpha:1});
												TweenMax.to(soundOnButton, 0, {autoAlpha:0});
												ftVideo.muted = true;
											}
			break;
		case playButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(playButton, 0, {autoAlpha:0});
												TweenMax.to(pauseButton, 0, {autoAlpha:1});
												ftVideo.play();
												tlAnim.resume(); 
											}
			break;
		case pauseButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(playButton, 0, {autoAlpha:1});
												TweenMax.to(pauseButton, 0, {autoAlpha:0});
												ftVideo.pause();
												tlAnim.pause(); 
											}
			break;
		case replayButton:
			if 		(type === "mouseover") 	{  }
			else if (type === "mouseout") 	{  }
			else if (type === "click") 		{ 
												TweenMax.to(button, 0, {autoAlpha:0});
												ftVideo.muted = false;
												tlAnim.play("start");
												ftVideo.currentTime = 0;
												ftVideo.play();
												TweenMax.set(ftVideo, {autoAlpha:1});
											}
			break;
	}
}

function videoEndHandler($e) {
	TweenMax.to([soundOffButton, soundOnButton, playButton, pauseButton], 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false})
	TweenMax.to(replayButton, 0.3, {delay:0.3, autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
}





/*************************************************************************************************/
/* Check page has been loaded and initialised ****************************************************/
/*************************************************************************************************/

domready(function() {
	console.log(":: dom ready ::");
	if (elementScrape()) init();
});