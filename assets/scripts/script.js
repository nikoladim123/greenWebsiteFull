$(window).ready(function(){

	var imgNo = 1;
	var offset = 0;
	var viewportHeight, viewportWidth;
	var noOfImages;

	function setHeightsAndWidths(){
		$(".slide img").css("margin-top","0");
		noOfImages = $(".slideshow-container .slide").length;
		viewportWidth = $(".primary-container").width();
		viewportHeight = $(".primary-container").height();

		var noOfCompletedSlides = $(".completed").length;
		if(noOfCompletedSlides!=0){
			offset = viewportWidth * noOfCompletedSlides;
		}

		$(".slide").css("width",viewportWidth);
		$(".slide").css("height",viewportHeight);

		$("img").css("max-height",viewportHeight);
		$("img").css("max-width",viewportWidth);

		$(".slideshow-container").css('margin-left',"-"+offset+'px');

		for(var pos=1;pos<=noOfImages;pos++){
			var imageWidth = $(".slide:nth-child("+pos+") img").width();
			var imageHeight = $(".slide:nth-child("+pos+") img").height();
			
			var marginTop = (viewportHeight - imageHeight)/2;
			if(marginTop > 0){
				$(".slide:nth-child("+pos+") img").css('margin-top',marginTop);
			}
		}
	}
	setHeightsAndWidths();

	for(var pos=1;pos<=noOfImages;pos++){
		var imageWidth = $(".slide:nth-child("+pos+") img").width();

		if(pos!=1){
			$(".slide:nth-child("+pos+") img").css("left",imageWidth+"px");
		}
	}

	//slideshow
	$(window).on('resize',function(){
		setHeightsAndWidths();
	});

	function transitionImage(imgNo , direction){
		var slide = $(".slide:nth-child("+imgNo+")");

		if(direction == "right"){
			offset += viewportWidth;
			slide.addClass("completed");

			var slideHTML = slide.html();
			$(".slideshow-container").append('<div class="slide new" style="width: '+ viewportWidth +'px; height: '+ viewportHeight + 'px;">'+slideHTML+'</div>');
		}

		if(direction == "left"){
			offset -= viewportWidth;
			slide.removeClass("completed");

			$(".new:last-of-type").remove();
		}

		$(".slideshow-container").css('margin-left',"-"+offset+'px');

		setTimeout(function(){
			$(".slide:nth-child("+(imgNo+1)+") img").css("left","0");
			toggleMouseEvent();
		},1000);
	}

	function toggleMouseEvent(){
		$(".slideshow-container").on('mousewheel',function(event){
			$(".slideshow-container").off('mousewheel');
			event.preventDefault();
			if(event.originalEvent.wheelDelta < 0){
				transitionImage(imgNo , 'right');
				imgNo++;
			} else{
				if(imgNo!=1){
					imgNo--;
					transitionImage(imgNo , 'left');
				} else{
					toggleMouseEvent();
				}
			}
		});
	}

	toggleMouseEvent();

});