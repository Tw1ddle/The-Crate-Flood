///<reference path='jquery-1.8.d.ts'/>

///<reference path='assert.ts'/>

module Debug {
    export var TERMINAL_ENABLED: bool = true;

    //generic
    var Commands: any = {
        Help: { id: "help", description: "lists your options" },
        Context: { id: "context", description: "returns the current execution context" },
        Dump: { id: "dump", description: "dumps the supplied object" },
        Execute: { id: "run", description: "executes the named function living in the window context" },
    }

    //game-specific
    var CVars: any = {
        TogglePaused: "togglepaused",
        RendererInfo: "renderer",
    }

    var Contexts: any = {
        Game: "window.main.game",
        Main: "window.main",
    }

    var currentContext: string = Contexts.Game;

    export class Terminal {
        constructor () {
            assert(TERMINAL_ENABLED, 'terminal initialized with terminal disabled');

            jQuery(document).ready(function ($) {
                $('#tilda').tilda(function (input: string, terminal: any): void {

                    var args = input.split(" ");

                    var keyword: string = args[0];
                    var options: string[] = args.slice(1, args.length);

                    if (keyword == Commands.Help.id) {
                        terminal.echo("Commands: \n\n" + Utility.dumpObjectIndented(Commands, " ") + "\n");
                        terminal.echo("CVars: " + Utility.dumpObjectIndented(CVars, " ") + "\n");
                    }

                    else if (keyword == Commands.Context.id) {
                        if (options[0] != null) {
                            currentContext = options[0];
                            terminal.echo("Current context set to: " + currentContext);
                        }
                        else {
                            terminal.echo("Current context: " + currentContext);
                        }
                    }

                    else if (keyword == Commands.Execute.id) {
                        terminal.echo("Executing: " + options[0]);
                        Utility.executeFunctionByName(options[0], currentContext, options.slice(1, options.length));
                    }

                    else if (keyword == Commands.Dump.id) {
                        if (options[0] != null) {
                            terminal.echo("Dumping: " + options[0]);
                            terminal.echo(Utility.dumpObjectIndented(options[0]));
                        }
                        else {
                            terminal.echo("No object specified");
                        }
                    }

                    else if (keyword == Commands.RendererInfo.id) {
                        terminal.echo("Renderer: \n" + Utility.dumpObjectIndented(Utility.getObjectByName("renderer", Contexts.Game)) + "\n");
                    }

                    else {
                        terminal.echo("Unrecognized keyword: " + "[" + keyword + "]");
                        terminal.echo("Arguments: \n" + Utility.dumpObjectIndented(options) + "\n");
                    }

                });
            });
        }
    }

}