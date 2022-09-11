/* Copyright Notice
 * bs-darkmode v2.0.0
 * https://palcarazm.github.io/bs-darkmode
 * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)
 * @funding GitHub Sponsors
 * @see https://github.com/sponsors/palcarazm
 * @license MIT
 * @see https://github.com/palcarazm/bs-darkmode/blob/master/LICENSE
 */


'use strict';

(function() {
	class Darkmode {
        DARKMODE_CLASS  = 'bs-darkmode-dark';
        LIGHTMODE_CLASS = 'bs-darkmode-light';
        COOKIE_NAME = 'bs-darkmode-color-scheme';

		constructor(element, options) {
			const DEFAULTS = {
                state: true,
                root: ':root',
                allowsCookie: false,
                lightlabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
                darklabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>',
                lightvars:'{}',
                darkvars:'{}',
            }
			options = options || {};

			// A: Capture ref to HMTL element
			this.element = element;

			// B: Set options
            const allowsCookie = this.element.hasAttribute('allowsCookie') || options.allowsCookie || DEFAULTS.allowsCookie
            const COLORSCHEME = this.#getColorScheme(allowsCookie);
			this.options = {
				state: COLORSCHEME === null ? DEFAULTS.state : COLORSCHEME,
                root: this.element.getAttribute('data-root') || options.root || DEFAULTS.root,
                allowsCookie: allowsCookie,
                lightlabel: this.element.getAttribute('data-lightlabel') || options.lightlabel || DEFAULTS.lightlabel,
                darklabel: this.element.getAttribute('data-darklabel') || options.darklabel || DEFAULTS.darklabel,
                lightvars: this.element.getAttribute('data-lightvars') || options.lightvars || DEFAULTS.lightvars,
                darkvars: this.element.getAttribute('data-darkvars') || options.darkvars || DEFAULTS.darkvars,
			};

			// LAST: initialize
            this.#init();
		}

        #init() {
            // 1: Render darkmode
            this.#render();

            // 2: Add listener
            this.element.addEventListener('touchstart', (e)=>{this.#actionPerformed(e,this);});
            this.element.addEventListener('click', (e)=>{this.#actionPerformed(e,this);});
            if (window.matchMedia){
                window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
                    if (this.options.state != e.matches){
                        this.#actionPerformed(e,this);
                    }
                });
            }

            // 3: Keep reference to this instance for subsequent calls via `getElementById().bsDarkmode()`
			this.element._bsDarkmode = this;
        }

        #render(){
            // 1: Add label
            this.element.innerHTML = this.options.state ? this.options.lightlabel : this.options.darklabel;

            // 2: Modify css vars
            let cssvars = JSON.parse(this.options.state ? this.options.lightvars : this.options.darkvars);
            if(!(typeof cssvars === 'object' && !Array.isArray(cssvars) && cssvars !== null)){
                throw new DOMException('Vars must be in a JSON Object.','TypeMismatchError');
            }
            const target = document.querySelector(this.options.root);
            target.removeAttribute("style");
            Object.entries(cssvars).forEach(([key, value]) => {
                target.style.setProperty("--bs-"+key,value);
            });

            // 3: Add HSL theme Colors
            const THEMECOLORS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'white', 'black', 'body-color', 'body-bg'];
            let hsl, rgb;
            Object.entries(cssvars).forEach(([key, value]) => {
                if(THEMECOLORS.includes(key)){
                    rgb = this.#hexToRGB(value);
                    hsl = this.#hexToHSL(value);
                    target.style.setProperty("--bs-"+key+"-h",hsl.h+'');
                    target.style.setProperty("--bs-"+key+"-s",hsl.s+'%');
                    target.style.setProperty("--bs-"+key+"-l",hsl.l+'%');
                    target.style.setProperty("--bs-"+key+"-rgb",rgb.r+','+rgb.g+','+rgb.b);
                }
            });

            // 4: Add or remove Darkmode Class
            if (this.options.state) {
                target.classList.remove(this.DARKMODE_CLASS);
                target.classList.add(this.LIGHTMODE_CLASS);
            }else{
                target.classList.add(this.DARKMODE_CLASS);
                target.classList.remove(this.LIGHTMODE_CLASS);
            }
        }

        toggle = function (silent = false) {
            this.options.state = !this.options.state;
            this.#render();
            if (!silent) this.#trigger();
        }
    
        light = function (silent = false) {
            if (this.options.state) return;
            this.options.state = true;
            this.#render();
            if (!silent) this.#trigger();
        }
    
        dark = function (silent = false) {
            if (!this.options.state) return;
            this.options.state = false;
            this.#render();
            if (!silent) this.#trigger();
        }
    
        #trigger = function (silent) {
            if (!silent) this.element.dispatchEvent(new Event('change', { bubbles: true }));
        }

        setCookieAutorization = function (status) {
            this.options.allowsCookie = status;
        }

        /**
         * Get the color scheme to set
         * @param {Boolean} allowsCookie Cookie authorization status
         * @returns {Boolean} Color Scheme (light -> true / dark -> false)
         */
        #getColorScheme(allowsCookie){
            let state = null;

             // Cookie Preferred Scheme Dark
            if(allowsCookie){
                let cookie = this.#getCookie(this.COOKIE_NAME);
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
                if (this.element.getAttribute('data-state') === 'light') {
                    state = true;
                }else if (this.element.getAttribute('data-state') === 'dark'){
                    state =  false;
                }
            }

            return state;    
        }

        /**
         * Trigger actions
         * @param {Event} e event
         * @param {Darkmode} target Darkmode
         * @private
         */
        #actionPerformed(e, target){
            target.toggle(false);
            if(target.options.allowsCookie){
                target.#setCookie(
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
        #hexToHSL(H) {
            // Convert hex to RGB first
            let rgb = this.#hexToRGB(H);
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
        #hexToRGB(H) {
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
        #setCookie(name,value,days) {
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
        #getCookie(name) {
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
        #deleteCookie(name) {   
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
    }

	/**
	 * Add `bsDarkmode` prototype function to HTML Elements
	 * Enables execution when used with HTML - ex: `document.getElementById('toggle').bsDarkmode('light')`
	 */
	Element.prototype.bsDarkmode = function(options, args) {
		let _bsDarkmode = this._bsDarkmode || new Darkmode(this, options);

		if (options && typeof options === 'string') {
            switch (options.toLowerCase()) {
                case 'toggle':
                    _bsDarkmode.toggle(args);
                    break;
                case 'light':
                    _bsDarkmode.light(args);
                    break;
                case 'dark':
                    _bsDarkmode.dark(args);
                    break;
                case 'setCookieAutorization':
                    _bsDarkmode.setCookieAutorization(args);
                    break;
            
                default:
                    throw new DOMException("Bootstrap-Darkmode method '"+options+"' doesn't exist",'NotSupportedError');
            }
		}
	};

	/**
	 * Replace all `[data-plugin="bsdarkmode"]` inputs with "Bootstrap-Darkmode"
	 * Executes once page elements have rendered enabling script to be placed in `<head>`
	 */
	if (typeof window !== 'undefined')
		window.onload = function() {
			document.querySelectorAll('[data-plugin="bsdarkmode"]').forEach(function(ele) {
				ele.bsDarkmode();
			});
		};

	// Export library if possible
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Darkmode;
	}
})();