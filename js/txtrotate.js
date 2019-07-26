//Animated Typing
var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10)  || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
	this.noTimes = 0;
	this.noTimesLimit = 3;
	this.stopRotate = false;
};

TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<div>'+this.txt+'</div>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
		this.noTimes++;
		if( this.noTimes == this.noTimesLimit ) 
			this.stopRotate = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	if( !this.stopRotate ) {
		setTimeout(function() {
			that.tick();
		}, delta);
	}
};

window.onload = function() {
	var element = document.getElementById('typewriter');
	var toRotate = element.getAttribute('data-rotate');
	var period = element.getAttribute('data-period');
	if(toRotate){
		new TxtRotate(element, JSON.parse(toRotate), period);
	}
	
	jQuery('.fixedBanner').addClass('zoom');
};

// My Code

$(document).ready(function(){
	$('body').on('click','.menu-show-hide',function(){
        var body = $('body');

        if(body.hasClass('open')){
          body.removeClass('open');
        }else{
          body.addClass('open');    
        }
    });

    $('body').on('click','.login-hide-btn',function(){
        var body = $('body');
            curr = $(this);
        if(body.hasClass('open-login')){
          body.removeClass('open-login');
          $('.template-two header').css('z-index',9);
          curr.find('i').removeClass('fa-times');
          curr.find('i').addClass('fa-ellipsis-v');
        }else{
          body.addClass('open-login');    
          $('.template-two header').css('z-index',101);
          curr.find('i').removeClass('fa-ellipsis-v');
          curr.find('i').addClass('fa-times');
        }
    })
});