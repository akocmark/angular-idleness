/*-------------------------------
 * Angular Idleness
 * Observes the idleness of a user
 *-------------------------------*/
angular.module('angular-idleness').service("idleness", function($window) {
    
	this.idle = undefined;

    this.stateKey = null;
	this.eventKey = undefined;
	this.keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };

    this.crossBrowserize = function() {
	    for (this.stateKey in this.keys) {
	        if (this.stateKey in document) {
	            this.eventKey = this.keys[this.stateKey];
	            break;
	        }
	    }
    };
 
	/**
	 * main visibility API function
	 * check if current tab is active or not
	 * @param  {function} c callback function
	 * @return {boolean}   returns true if tab is active
	 */
	this.visible = function(c) {
		this.crossBrowserize();
        if (c) document.addEventListener(this.eventKey, c);
        return !document[this.stateKey];
	};

	this.observe = function() {
		var self = this;

		// check if current tab is active or not
		self.visible(function(){
							
		    if(self.visible()){	
		        
		        // the setTimeout() is used due to a delay 
		        // before the tab gains focus again, very important!
			  	setTimeout(function(){ 
		          
		          	self.idlize(false);
		          
		        },300);		
														
		    } else {
			
		      	self.idlize(true);
		    }
		});


		// check if browser window has focus		
		var isChromium = $window.chrome;
		var notIE      = (document.documentMode === undefined);
		      
		if (notIE && !isChromium) {

		    // checks for Firefox and other  NON IE Chrome versions
		    $($window).on("focusin", function () { 
		        
		        setTimeout(function(){      
		            
		   			self.idlize(false);
		          
		        },300);

		    }).on("focusout", function () {
		      	self.idlize(true);
		    });

		} else {
		    
		    // checks for IE and Chromium versions
		    if ($window.addEventListener) {

		        // bind focus event
		        $window.addEventListener("focus", function (event) {
		          
		            setTimeout(function(){
		      			self.idlize(false);
		            },300);

		        }, false);

		        // bind blur event
		        $window.addEventListener("blur", function (event) {
		      		self.idlize(true);
		        }, false);

		    } else {

		        // bind focus event
		        $window.attachEvent("focus", function (event) {

		            setTimeout(function(){
		      			self.idlize(false);
		            },300);

		        });

		        // bind focus event
		        $window.attachEvent("blur", function (event) {
		      		self.idlize(true);
		        });
		    }
		}
	};

	this.idlize = function(bool) {
		if (this.idle === bool) {
			return;
		}

		this.idle = bool;

		if (bool) {
			this.onIdleFn();
		} else {
			this.onNotIdleFn();
		}
	};

	this.onIdle = function(onIdleFn, onNotIdleFn) {
		this.onIdleFn = onIdleFn;
		this.onNotIdleFn = onNotIdleFn;
	};

	this.onIdleFn = function() {};
	this.onNotIdleFn = function() {};
});