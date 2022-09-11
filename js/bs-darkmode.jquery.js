/* Copyright Notice
 * bs-darkmode v2.0.0
 * https://palcarazm.github.io/bs-darkmode
 * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)
 * @funding GitHub Sponsors
 * @see https://github.com/sponsors/palcarazm
 * @license MIT
 * @see https://github.com/palcarazm/bs-darkmode/blob/master/LICENSE
 */


+function ($) {
    'use strict';

    let Darkmode = function (element, options) {
        // A: Capture ref to HTML element
        this.$element = $(element);
        // B: Set options
        this.options = $.extend({}, this.defaults(), options);
        // LAST: initialize
        this.init();
    }

    Darkmode.DEFAULTS = {
        state: true,
        root: ':root',
        allowsCookie: false,
        lightlabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
        darklabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>',
        lightvars:'{}',
        darkvars:'{}',
    }

    Darkmode.prototype.DARKMODE_CLASS  = 'bs-darkmode-dark';
    Darkmode.prototype.LIGHTMODE_CLASS = 'bs-darkmode-light';
    Darkmode.prototype.COOKIE_NAME = 'bs-darkmode-color-scheme';

    Darkmode.prototype.defaults = function() {
        const allowsCookie = this.$element.is('[allowsCookie]') || Darkmode.DEFAULTS.allowsCookie;
        const COLORSCHEME = getColorScheme(this, allowsCookie);
        return {
            state: COLORSCHEME === null ? Darkmode.DEFAULTS.state : COLORSCHEME,
            root: this.$element.attr('data-root') || Darkmode.DEFAULTS.root,
            allowsCookie: allowsCookie,
            lightlabel: this.$element.attr('data-lightlabel') || Darkmode.DEFAULTS.lightlabel,
            darklabel: this.$element.attr('data-darklabel') || Darkmode.DEFAULTS.darklabel,
            lightvars: this.$element.attr('data-lightvars') || Darkmode.DEFAULTS.lightvars,
            darkvars: this.$element.attr('data-darkvars') || Darkmode.DEFAULTS.darkvars,
        }
    }

    Darkmode.prototype.init = function() {
        // 1: Render darkmode
        this.render();

        // 2: Add listener
        this.$element.on('touchstart', (e)=>{actionPerformed(e,this);});
        this.$element.on('click', (e)=>{actionPerformed(e,this);});
        if (window.matchMedia){
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
                if (this.options.state != e.matches){
                    actionPerformed(e,this);
                }
            });
        }
    }

    /**
     * Update Darkmode render
     */
    Darkmode.prototype.render = function(){
        // 1: Add label
        this.$element.html(this.options.state ? this.options.lightlabel : this.options.darklabel);

        // 2: Modify css vars
        let cssvars = JSON.parse(this.options.state ? this.options.lightvars : this.options.darkvars);
        if(!(typeof cssvars === 'object' && !Array.isArray(cssvars) && cssvars !== null)){
            throw new DOMException('Vars must be in a JSON Object.','TypeMismatchError');
        }
        const target = $(this.options.root);
        target.attr("style","");
        Object.entries(cssvars).forEach(([key, value]) => {
            target.css("--bs-"+key,value);
        });

        // 3: Add HSL theme Colors
        const THEMECOLORS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'white', 'black', 'body-color', 'body-bg'];
        let hsl, rgb;
        Object.entries(cssvars).forEach(([key, value]) => {
            if(THEMECOLORS.includes(key)){
                rgb = hexToRGB(value);
                hsl = hexToHSL(value);
                target.css("--bs-"+key+"-h",hsl.h+'');
                target.css("--bs-"+key+"-s",hsl.s+'%');
                target.css("--bs-"+key+"-l",hsl.l+'%');
                target.css("--bs-"+key+"-rgb",rgb.r+','+rgb.g+','+rgb.b);
            }
        });

        // 4: Add or remove Darkmode Class
        if (this.options.state) {
            target.removeClass(this.DARKMODE_CLASS);
            target.addClass(this.LIGHTMODE_CLASS);
        }else{
            target.addClass(this.DARKMODE_CLASS);
            target.removeClass(this.LIGHTMODE_CLASS);
        }
    }

    Darkmode.prototype.toggle = function (silent = false) {
		this.options.state = !this.options.state;
        this.render();
		if (!silent) this.trigger();
	}

	Darkmode.prototype.light = function (silent = false) {
        if (this.options.state) return;
		this.options.state = true;
		this.render();
		if (!silent) this.trigger();
	}

	Darkmode.prototype.dark = function (silent = false) {
        if (!this.options.state) return;
		this.options.state = false;
		this.render();
		if (!silent) this.trigger();
	}

    Darkmode.prototype.trigger = function (silent) {
		if (!silent) this.$element.trigger("change");
	}

    Darkmode.prototype.setCookieAutorization = function (status) {
		this.options.allowsCookie = status;
	}

    /**
     * Get the color scheme to set
     * @param {Darkmode} target Darkmode toggle element
     * @param {Boolean} allowsCookie Cookie authorization status
     * @returns {Boolean} Color Scheme (light -> true / dark -> false)
     */
    function getColorScheme(target, allowsCookie){
        let state = null;

        // Cookie Preferred Scheme Dark
        if(allowsCookie){
            let cookie = getCookie(target.COOKIE_NAME);
            if(cookie != null){
                if (cookie === 'light') {
                    state = true;
                }else if (cookie === 'dark'){
                    state =  false;
                }
            }
        }

        // User Preferred Scheme Dark
        if(state === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
                state = false;
            }
        }

        // Element Data
        if(state === null){
            if (target.$element.attr('data-state') === 'light') {
                state = true;
            }else if (target.$element.attr('data-state') === 'dark'){
                state =  false;
            }
        }
    
        return state;    
    }


    /**
	 * Trigger actions
	 * @param {Event} e event
	 * @param {Darkmode} target Darkmode
	 */
    function actionPerformed(e, target){
        target.toggle(false);
        if(target.options.allowsCookie){
            setCookie(
                target.COOKIE_NAME,
                target.options.state ? "light" : "dark",
                0.25
            );
        }
        e.preventDefault();
    }

    /**
     * Convert Hex to HSL color space
     * @param {String} H Hex value '#rgb' or '#rrggbb'
     * @returns {Array} HSL value [h,s,l]
     */
    function hexToHSL(H) {
        // Convert hex to RGB first
        let rgb = hexToRGB(H);
        let r = rgb.r;
        let g = rgb.g;
        let b = rgb.b;

        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        
        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;
        
        h = Math.round(h * 60);
        
        if (h < 0)
            h += 360;
        
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        
        return {h:h,s:s,l:l};
    }
    /**
     * Convert Hex to RGB color space
     * @param {String} H Hex value '#rgb' or '#rrggbb'
     * @returns {Array} RGB value [r,g,b]
     */
    function hexToRGB(H) {
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = parseInt("0x" + H[1] + H[1]);
            g = parseInt("0x" + H[2] + H[2]);
            b = parseInt("0x" + H[3] + H[3]);
        } else if (H.length == 7) {
            r = parseInt("0x" + H[1] + H[2]);
            g = parseInt("0x" + H[3] + H[4]);
            b = parseInt("0x" + H[5] + H[6]);
        }
        return {r:r,g:g,b:b};    
    }

    /**
     * Set a Cookie
     * @param {String} name Cookie Name
     * @param {String} value Cookie Value
     * @param {Number} days Days to expiration
     * @author Mandeep Janjua and Fakhruddin Ujjainwala
     * @see https://stackoverflow.com/a/24103596/17594569
     * @license CC BY-SA 4.0
     */
    function setCookie(name,value,days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    /**
     * Get a Cookie
     * @param {String} name Cookie Name
     * @returns {String | null} Cookie Value
     * @author Srinivas Sabbani and Mohit Kumar Gupta
     * @see https://stackoverflow.com/a/4825695/17594569
     * @license CC BY-SA 4.0
     */
    function getCookie(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                let end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.substring(start, end));
            }
        }
        return null;
    }

    /**
     * Delete a Cookie
     * @param {String} name Cookie Name
     * @author Mandeep Janjua and Fakhruddin Ujjainwala
     * @see https://stackoverflow.com/a/24103596/17594569
     * @license CC BY-SA 4.0
     */
    function deleteCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }

    function Plugin(option) {
		let optArg = Array.prototype.slice.call( arguments, 1 )[0]

		return this.each(function () {
			let $this   = $(this)
			let data    = $this.data('bs.darkmode')
			let options = typeof option == 'object' && option

			if (!data) {
				data = new Darkmode(this, options)
				$this.data('bs.darkmode', data)
			}
			if (typeof option === 'string' && data[option] && typeof optArg === 'boolean') data[option](optArg)
			else if (typeof option === 'string' && data[option]) data[option]()
			else if (option && !data[option]) throw new DOMException("Bootstrap-Darkmode method '"+option+"' doesn't exist",'NotSupportedError');
		})
	}

    let old = $.fn.bsDarkmode
	$.fn.bsDarkmode             = Plugin
	$.fn.bsDarkmode.Constructor = Darkmode
    $.fn.toggle.noConflict = function () {
		$.fn.bsDarkmode = old
		return this
	}

    /**
	 * Replace all `[data-plugin="bsdarkmode"]` inputs with "Bootstrap-Darkmode"
	 * Executes once page elements have rendered enabling script to be placed in `<head>`
	 */
	$(function() {
		$('[data-plugin^=bsdarkmode]').bsDarkmode()
	})
}(jQuery);