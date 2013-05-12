module dat {
    export module gui {
            export var HIDE_KEY_CODE: number;

            export class GUI {
                constructor ();

                add(object: any, property: string, ...params : any[]);
                addFolder(name: string): dat.gui;
                addColor(object: any, property: string);
                open(): void;
                close(): void;
            }
    }
    //export var GUI : any;
}

// todo