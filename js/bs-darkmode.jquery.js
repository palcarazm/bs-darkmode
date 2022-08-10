/* Copyright Notice
 * bs-darkmode v1.0.0
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
        lightlabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
        darklabel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>',
        lightvars:'{}',
        darkvars:'{}',
    }

    Darkmode.prototype.defaults = function() {
        let elementState = null;
        if (this.$element.attr('data-state') === 'light') {
            elementState = true;
        }else if (this.$element.attr('data-state') === 'dark'){
            elementState =  false;
        }

        return {
            state: elementState == null ? Darkmode.DEFAULTS.state : elementState,
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
        const target = $(':root');
        target.attr("style","");
        Object.entries(cssvars).forEach(([key, value]) => {
            target.css("--"+key,value);
        });


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


    /**
	 * Trigger actions
	 * @param {Event} e event
	 * @param {Darkmode} target Darkmode
	 */
    function actionPerformed(e, target){
        target.toggle(true);
        e.preventDefault();
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