String.prototype.strip = function(char) {
    return this.replace(new RegExp("^" + char + "*"), '').
        replace(new RegExp(char + "*$"), '');
}


$.extend_if_has = function(desc, source, array) {
    for (var i=array.length;i--;) {
        if (typeof source[array[i]] != 'undefined') {
            desc[array[i]] = source[array[i]];
        }
    }
    return desc;
};


(function ($) {

    $.fn.tilda = function(eval, options) {
        if ($('body').data('tilda')) {
            return $('body').data('tilda').terminal;
        }

        this.addClass('tilda');
        options = options || {};
        eval = eval || function(command, term) {
            term.echo("you don't set eval for tilda");
        };

        var settings = {
            prompt: '>',
            name: 'tilda',
            height: 500,
            enabled: true,
            greetings: 'Console'
        };

        if (options) {
            $.extend(settings, options);
        }
        this.append('<div class="td"></div>');

        var self = this;

        self.terminal = this.find('.td').terminal(eval, settings);

        var focus = false;

        $(document.documentElement).keypress(function(e) {
            if (e.which == 96) {
                self.slideToggle('fast');
                self.terminal.set_command('');
                self.terminal.focus(focus = !focus);
                self.terminal.attr({
                    scrollTop: self.terminal.attr("scrollHeight")
                });
            }
        });

        $('body').data('tilda', this);

        this.show();

        return self;
    };
})(jQuery);