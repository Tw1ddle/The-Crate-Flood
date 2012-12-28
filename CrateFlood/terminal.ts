///<reference path='jquery-1.8.d.ts'/>

///<reference path='assert.ts'/>

module Debug {
    export var TERMINAL_ENABLED: bool = true;

    //generic
    var Command: any = {
        Help: "help",
        Run: "run",
        RendererInfo: "renderer",
    }

    //game-specific
    var CVar: any = {
        TogglePaused: "togglepaused",
    }

    export class Terminal {
        constructor () {
            assert(TERMINAL_ENABLED, 'terminal initialized with console disabled');

            jQuery(document).ready(function ($) {
                $('#tilda').tilda(function (command: string, terminal: any): void {

                    var keyword: string = command.split(" ")[0];

                    //todo args
                    //var args: string = "";
                    

                    if (keyword == Command.Help) {
                        terminal.echo("Commands: " + Utility.getKeys(Command));
                        terminal.echo("CVars: " + Utility.getPropertyValuePairs(Command));
                    }
                    else if (keyword == Command.Run) {
                        
                    }
                    else if (keyword == Command.Pause) {
                    }
                    else if (keyword == Command.Resume) {
                    }


                });
            });

        }

        private executeFunctionByName(name: string, context: any, ...args: any[]): any {
            var args = Array.prototype.slice.call(arguments).splice(2);
            var namespaces = name.split(".");
            var func = namespaces.pop();

            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }

            return context[func].apply(this, args);
        }
    }

}