//start yayMeetings namespace
var yayMeetings = {
	form: document.getElementById('meeting_form'),
	
	//for webkit support of dollarDrop()
	webkit: (function() {
		if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
			return true;
		} else {
			return false;
		}
	})(),
	
	timerRunning: false,
	
	could_have_bought: {
		'1.50'	: 'mtdew',
		'3.50'	: 'cheerios',
		'5.00'	: 'bonjovi',
		'8.00'	: 'movieticket',
		'15.00'	: 'pizza',
		'20.00'	: 'jackdaniels',
		'30.00'	: 'juicer',
		'40.00'	: 'toaster',
		'50.00'	: 'greygoose',
		'60.00'	: 'addidas',
		'70.00'	: 'tickets_cc',
		'80.00'	: 'roses',
		'90.00'	: 'knives',
		'100.00' : 'docmartens',
		'150.00' : 'ipod',
		'200.00' : 'espresso',
		'250.00' : 'nook',
		'300.00' : 'kitchenaid',
		'350.00' : 'chainsaw',
		'400.00' : 'puppy',
		'450.00' : 'vacuum',
		'500.00' : 'clubchair',
		'550.00' : 'diamondring',
		'600.00' : 'iphone',
		'650.00' : 'golfclubs',
		'700.00' : 'watch',
		'750.00' : 'stove',
		'800.00' : 'lespaul_doublecut',
		'850.00' : 'bike',
		'900.00' : 'fridge',
		'950.00' : 'louisvuitton',
		'1000.00' : 'flighttropical'
	},
	
	
	
	//format the dollar and cents display
	format: function(num, digits) {
		var num		= Math.round(num * Math.pow(10, digits) ) / Math.pow(10, digits),
		    decimal	= Math.round(num * Math.pow(10, digits) - Math.floor(num) * Math.pow(10, digits)),
		    decstr;

		decstr = decimal + '';

		while (decstr.length < digits) {
			decstr = '0' + decstr;
		}
		
		return (Math.floor(num) + '.' + decstr);
	},
	//end format()
	
	//validate user input
	validateInput: function(el) {
		var el,			//the form field
			el_name		= el.name,
			el_val		= el.value,
			parent_p 	= el.parentNode,
			span		= document.getElementById(el_name + '_error');
			
		el_name == 'annual_salary'
			? el_val = el_val.replace(/[^0-9]+/g, '')
			: el_val = el_val;
		
		if (!el_val || isNaN(el_val) ) {
			el.value = '';
			
			setTimeout('yayMeetings.form.' + el_name + '.focus()', 0);
			
			parent_p.className += ' error';
			
			span.className = 'error_message';
			span.style.display = 'inline-block';
		} else {
			if (el_name == 'number_of_people') {
				span.style.display = 'none';
				this.removeClass(parent_p, 'error');
			} else if (el_name == 'annual_salary') {
				span.style.display = 'none';
				this.removeClass(parent_p, 'error');
				
				this.removeClass(this.form.start, 'disabled');
				this.form.start.className += ' active';
				this.form.start.removeAttribute('disabled');
				
				this.removeClass(this.form.stop, 'disabled');
				this.form.stop.className += ' active';
				this.form.stop.removeAttribute('disabled');
	
				this.removeClass(this.form.reset, 'disabled');
				this.form.reset.className += ' active';
				this.form.reset.removeAttribute('disabled');
				
				setTimeout('yayMeetings.form.start.focus()', 0);
			}
		}//end if
			
	},
	//end validateInput()
	
	//validate input, disable appropriate form buttons, colorize page elems
	// start the $ count/drop
	startTimer: function() {
			var start_button    = this.form.start,
			    reset_button    = this.form.reset,
			    now             = new Date(),
			    timerbuttons	= document.getElementsByTagName('input');
			
			start_button.disabled = true;
			reset_button.disabled = true;
			
			this.removeClass(start_button, 'active');
			this.removeClass(reset_button, 'active');
			
			start_button.className += ' disabled';
			reset_button.className += ' disabled';
	
			this.form.startsec.value = now.getTime();
			
			document.getElementsByTagName('body')[0].className	+= ' active';
			document.getElementById('dude').className			+= ' active';
			document.getElementById('chick').className			+= ' active';
			document.getElementById('shell').className 			+= ' active';
			document.getElementById('header').className			+= ' active';
			document.getElementById('subhead').className		+= ' active';
			document.getElementById('input').className			+= ' active';
			document.getElementById('duration').className		+= ' active';
			document.getElementById('duration_time').className	+= ' active';
			document.getElementById('cost_output').className	+= ' active';
			
			for (var i=0, len=timerbuttons.length; i<len; i++) {
				if (timerbuttons[i].className === 'timerbutton') {
					timerbuttons[i].className += ' active';
				}
			}

			this.okGo();
			
			if (this.webkit) {
				this.dollarDrop();
			}
	},
	//end startTimer()
	
	//stop the $ count
	//enable form buttons
	//remove $ drop
	stopTimer: function() {
			var  start_button = this.form.start,
			     reset_button = this.form.reset;
			
			start_button.disabled = false;
			reset_button.disabled = false;
			
			this.removeClass(start_button, 'disabled');
			this.removeClass(reset_button, 'disabled');
			
			start_button.className += ' active';
			reset_button.className += ' active';
	
			if (this.timerRunning) {
				clearTimeout(id);
			}
			
			this.timerRunning = false;
			
			//perhaps use getElementsByClassName('dollar')
			var spans	= document.getElementsByTagName('span'),
				len		= spans.length;
			
			for (var i=0; i<len; i++) {
				spans[i].style.display = 'none';
			}
	},
	//end stopTimer()
	
	//removeClass utility function
	removeClass: function (el, name) {
		//console.log(el);
		var regex		= new RegExp('(^|\\b)' + name + '(\\b|$)', 'gi');
		el.className	= el.className.replace(regex, '');
	},
	//end removeClass()
	
	//reset everything and start over
	resetTimer: function() {
			var currency = '$';
	
			this.form.timer_passed.value 		= '0:00:00';
			this.form.cost.value 				= currency + '0.00';
			
			this.form.number_of_people.value	= '';
			this.form.annual_salary.value		= '';
	},
	//end resetTimer()
	
	//start everything
	//display meeting duration
	//display meeting cost
	okGo: function() {        
			var now					= new Date().getTime(),
			    runtime				= (now - this.form.startsec.value) / 1000,
			    hr					= Math.floor(runtime / 3600),
			    min					= Math.floor( (runtime - hr * 3600) / 60),   
			    sec					= Math.floor( (runtime - hr * 3600 - min * 60) ),
			    number_of_people	= this.form.number_of_people.value,
			    annual_salary		= this.form.annual_salary.value.replace(/[^0-9]+/g, ''),
			    total_hourly_rate	= number_of_people * (annual_salary / 12 / 4 / 40).toFixed(2),
			    cost				= Math.floor(100 * total_hourly_rate * runtime / 3600) / 100,
			    currency			= '$',
			    running_total,
			    output				= document.getElementById('output');
	    
			id = setTimeout('yayMeetings.okGo()', 1000);
			
			this.timerRunning = true;
	    
			this.form.timer_passed.value = hr + ( (min < 10) ? ':0' : ':' ) + min + ( (sec < 10) ? ':0' : ':' ) + sec;
			this.form.cost.value = currency + this.format(cost, 2);
			
			running_total = parseFloat(this.form.cost.value.substring(1));
			
			//***logical operator*** within switch
			//boolean as arg instead of variable/literal
			//each of the case statements then evaluate as true/false
			//documenting as when I revist later, I may wonder WTF
			//
			//cases are executed when case above themselves is true
			//mtdew is true at $1.50
			//a little funky at a glance...
			switch (true) {
				case (running_total < 1.50):
					//console.log('nothing yet');
					break;
				case (running_total < 3.50):
					output.innerHTML = '<img class="mtdew" src="images/mtdew.png">';
					//output.innerHTML = '<img class="' + this.could_have_bought[this.count] + '" src="images/' + this.could_have_bought[this.count] + '.png">';
					break;
				case (running_total < 5.00):
					output.innerHTML = '<img class="cheerios" src="images/cheerios.png">';
					break;
				case (running_total < 8.00):
					output.innerHTML = '<img class="bonjovi" src="images/bonjovi.png">';
					break;
				case (running_total < 15.00):
					output.innerHTML = '<img class="movieticket" src="images/movieticket.png">';
					break;
				case (running_total < 20.00):
					output.innerHTML = '<img class="pizza" src="images/pizza.png">';
					break;
				case (running_total < 30.00):
					output.innerHTML = '<img class="jackdaniels" src="images/jackdaniels.png">';
					break;
				case (running_total < 40.00):
					output.innerHTML = '<img class="juicer" src="images/juicer.png">';
					break;
				case (running_total < 50.00):
					output.innerHTML = '<img class="toaster" src="images/toaster.png">';
					break;
				case (running_total < 60.00):
					output.innerHTML = '<img class="greygoose" src="images/greygoose.png">';
					break;
				case (running_total < 70.00):
					output.innerHTML = '<img class="addidas" src="images/addidas.png">';
					break;
				case (running_total < 80.00):
					output.innerHTML = '<img class="tickets_cc" src="images/tickets_cc.png">';
					break;
				case (running_total < 90.00):
					output.innerHTML = '<img class="roses" src="images/roses.png">';
					break;
				case (running_total < 100.00):
					output.innerHTML = '<img class="knives" src="images/knives.png">';
					break;
				case (running_total < 150.00):
					output.innerHTML = '<img class="docmartens" src="images/docmartens.png">';
					break;
				case (running_total < 200.00):
					output.innerHTML = '<img class="ipod" src="images/ipod.png">';
					break;
				case (running_total < 250.00):
					output.innerHTML = '<img class="espresso" src="images/espresso.png">';
					break;
				case (running_total < 300.00):
					output.innerHTML = '<img class="nook" src="images/nook.png">';
					break;
				case (running_total < 350.00):
					output.innerHTML = '<img class="kitchenaid" src="images/kitchenaid.png">';
					break;
				case (running_total < 400.00):
					output.innerHTML = '<img class="chainsaw" src="images/chainsaw.png">';
					break;
				case (running_total < 450.00):
					output.innerHTML = '<img class="puppy" src="images/puppy.png">';
					break;
				case (running_total < 500.00):
					output.innerHTML = '<img class="vacuum" src="images/vacuum.png">';
					break;
				case (running_total < 550.00):
					output.innerHTML = '<img class="clubchair" src="images/clubchair.png">';
					break;
				case (running_total < 600.00):
					output.innerHTML = '<img class="diamondring" src="images/diamondring.png">';
					break;
				case (running_total < 650.00):
					output.innerHTML = '<img class="iphone" src="images/iphone.png">';
					break;
				case (running_total < 700.00):
					output.innerHTML = '<img class="golfclubs" src="images/golfclubs.png">';
					break;
				case (running_total < 750.00):
					output.innerHTML = '<img class="watch" src="images/watch.png">';
					break;
				case (running_total < 800.00):
					output.innerHTML = '<img class="stove" src="images/stove.png">';
					break;
				case (running_total < 850.00):
					output.innerHTML = '<img class="lespaul_doublecut" src="images/lespaul_doublecut.png">';
					break;
				case (running_total < 900.00):
					output.innerHTML = '<img class="bike" src="images/bike.png">';
					break;
				case (running_total < 950.00):
					output.innerHTML = '<img class="fridge" src="images/fridge.png">';
					break;
				case (running_total < 1000.00):
					output.innerHTML = '<img class="louisvuitton" src="images/louisvuitton.png">';
					break;
				case (running_total < 1050.00):
					output.innerHTML = '<img class="flighttropical" src="images/flighttropical.png">';
					break;
			}
			
	},
	//end okGo()
	
	//drop $ from top of browser window
	//webkit only
	dollarDrop: function() {
		var first = true;
		
		for (var i=0; i<15; i++) { //number of falling $
			document.body.appendChild(fallingDollar(first));
			first = false;
		}
		
		function randomInteger(low, high) {
			return low + Math.floor(Math.random() * (high - low));
		}
		
		function randomFloat(low, high) {
			return low + Math.random() * (high - low);
		}
		
		function randomItem(items) {
			return items[randomInteger(0, items.length - 1)];
		}
		
		function durationValue(value) {
			return value + 's';
		}
		
		function fallingDollar(is_first) {
			var sizes		= [
								'tiny','tiny','tiny',
								'small','small','small','small',
								'medium','medium','medium','medium','medium',
								'large','large','large',
								'massive','massive'
								],
				dollar_wrap	= document.createElement('div'),
				dollar		= document.createElement('span');
			
			dollar.innerHTML		= '$';
			dollar_wrap.className	= 'dollar ' + randomItem(sizes);
			dollar_wrap.appendChild(dollar);
		
			var spinAnimationName	= (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpin',
				anchorSide			= (Math.random() < 0.5) ? 'left' : 'right',
				fadeAndDropDuration	= durationValue(randomFloat(5, 11)),
				spinDuration		= durationValue(randomFloat(4, 8)),
				flakeDelay			= is_first ? 0 : durationValue(randomFloat(0, 10));
		
			dollar_wrap.style.webkitAnimationName		= 'fade, drop';
			dollar_wrap.style.webkitAnimationDuration	= fadeAndDropDuration + ', ' + fadeAndDropDuration;
			dollar_wrap.style.webkitAnimationDelay		= flakeDelay;
			dollar_wrap.style[anchorSide]				= randomInteger(0, 60) + '%';
			
			dollar.style.webkitAnimationName			= spinAnimationName;
			dollar.style.webkitAnimationDuration		= spinDuration;
		
			return dollar_wrap;
		}
	},
	//end dollarDrop()
	
	
	//displays all the "you could have bought" items for testing
	displayCouldHaveBoughtItems: function() {
		var p,
			span,
			img;
			
		/*
		could_have_bought: {
			'1.50'	: 'mtdew',
			'3.50'	: 'cheerios',
			'5.00'	: 'bonjovi',
			'8.00'	: 'movieticket',
			'15.00'	: 'pizza',
			'20.00'	: 'jackdaniels'
			etc.
		},
		*/
		
		for (var price in yayMeetings.could_have_bought) {
			p 		= document.createElement('p');
			span	= document.createElement('span');
			img		= document.createElement('img');
			
			//console.log(price + ' : ' + this.could_have_bought[price]);
			
			p.className = 'test_p';
			
			span.appendChild(document.createTextNode('$' + price));
			span.className = 'test_span';
			
			img.setAttribute('class', yayMeetings.could_have_bought[price]);
			img.setAttribute('src', 'images/' + yayMeetings.could_have_bought[price] + '.png');
			
			p.appendChild(span);
			p.appendChild(img);
			
			document.body.appendChild(p);
		}
	},
	//end displayCouldHaveBoughtItems()
	
	
	
	//initialize
	init: function() {
		yayMeetings.form.start.onclick = function() { yayMeetings.startTimer(); }
		yayMeetings.form.stop.onclick = function() { yayMeetings.stopTimer(); }
		yayMeetings.form.reset.onclick = function() { yayMeetings.resetTimer(); }
		
		yayMeetings.form.number_of_people.onchange = function() { yayMeetings.validateInput(this); }
		yayMeetings.form.annual_salary.onchange = function() { yayMeetings.validateInput(this); }
		
		//display all "you could have bought" items for testing
		document.getElementById('shhh').onclick = yayMeetings.displayCouldHaveBoughtItems;
	}
	//end init()
};
//end yayMeetings namespace

window.onload = yayMeetings.init;
