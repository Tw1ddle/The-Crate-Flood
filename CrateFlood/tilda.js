(function ($) {
    $.fn.tilda = function (eval, options) {

        if ($('body').data('tilda')) {
            return $('body').data('tilda').terminal;
        }

        this.addClass('tilda');
        options = options || {};
        eval = eval || function (command, term) {
            term.echo("you don't set eval for tilda");
        };

        var settings = {
            prompt: '>',
            name: 'tilda',
            height: 450,
            enabled: false,
            greetings: 'console'
        };

        if (options) {
            $.extend(settings, options);
        }

        this.append('<div class="td"></div>');

        var self = this;

        self.terminal = this.find('.td').terminal(eval,
                                               settings);

        var focus = false;

        $(document.documentElement).keypress(function (e) {
            if (e.charCode == 96) {
                self.slideToggle('fast');
                self.terminal.set_command('');
                self.terminal.command_line.set('');
                self.terminal.focus(focus = !focus);
            }
        });

        $('body').data('tilda', this);

        return self;
    };
})(jQuery);