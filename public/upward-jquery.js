(function() {
  (function($) {
    var defaults, methods, opts;
    defaults = {
      button: '.upward'
    };
    opts = {};
    methods = {
      init: function(options) {
        var button;
        opts = $.extend({}, defaults, options);
        button = $(opts.button);
        $(button).addClass('access');
        $(window).scroll(function() {
          console.log(this);
          if (!$(button).hasClass('scroll')) {
            if ($(this).scrollTop() > 400) {
              $(button).upward('show');
            }
            if ($(this).scrollTop() < 400) {
              return $(button).upward('hide');
            }
          }
        });
        return button.on('click', function() {
          var delay, elem;
          elem = $(this);
          if (!elem.hasClass('scroll')) {
            delay = $(window).scrollTop() / 4;
            methods.hide.apply(this);
            elem.addClass('scroll');
            $('body,html').animate({
              scrollTop: 0
            }, delay, 'linear');
            return setTimeout(function() {
              return elem.removeClass('scroll');
            }, delay);
          }
        });
      },
      hide: function() {
        var delay, element;
        element = $(opts.button);
        if (element.hasClass('access')) {
          element.removeClass('access');
          delay = parseFloat(element.css("transition-duration")) * 1000;
          element.addClass('hide');
          return setTimeout(function() {
            element.hide();
            return element.addClass('access');
          }, delay);
        }
      },
      show: function() {
        var button;
        button = $(opts.button);
        if (button.hasClass('access')) {
          button.removeClass('access');
          return button.show(0, function() {
            button.removeClass('hide');
            return button.addClass('access');
          });
        }
      }
    };
    return $.fn.upward = function(method) {
      if (methods[method] != null) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {

      }
    };
  })(this.jQuery);

}).call(this);
