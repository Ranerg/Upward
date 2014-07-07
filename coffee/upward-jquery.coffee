do ($ = @jQuery)->
	defaults =
		button: '.upward'
	opts = {}

	methods =
		init: (options) ->
			opts = $.extend({}, defaults, options)
			button = $ (opts.button)
			$(button).addClass 'access'

			$(window).scroll ->
				if !$(button).hasClass('scroll')
					if $(this).scrollTop() > 400
						$(button).upward('show')
					if $(this).scrollTop() < 400
						$(button).upward('hide')

			button.on 'click', ->
				elem = $(this)
				if !elem.hasClass('scroll')
					delay = $(window).scrollTop() / 4
					methods.hide.apply @
					elem.addClass 'scroll'
					$('body,html').animate({scrollTop:0}, delay, 'linear')
					setTimeout ->
						elem.removeClass('scroll')
					, delay
		hide: ->
			element = $(opts.button)
			if element.hasClass 'access'
				element.removeClass 'access'
				delay = parseFloat(element.css("transition-duration")) * 1000
				element.addClass 'hide'
				setTimeout ->
					element.hide()
					element.addClass 'access'
				, delay

		show: ->
			button = $(opts.button)
			if button.hasClass 'access'
				button.removeClass 'access'
				button.show 0, ->
			
					button.removeClass 'hide'
					button.addClass 'access'
			
	$.fn.upward = (method) ->
		if methods[method]?
			return methods[method].apply @, Array.prototype.slice.call(arguments, 1)
		else if typeof method is 'object' or !method
			return methods.init.apply(this, arguments)
		else


