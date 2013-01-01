///<reference path='debug.ts'/>

///<reference path='Sprite.ts'/>

class TextItem extends Sprite {
    constructor (position: THREE.Vector3, canvassize: THREE.Vector2, text: string, lineheight?: number, font?: string,  colour?: any) {
        this.position = position;

        var canvas : any = document.createElement('canvas');

        canvas.width = canvassize.x;
        canvas.height = canvassize.y;

        var context = canvas.getContext('2d');
        context.textAlign = 'start';
        context.textBaseline = 'top';

        if (lineheight == null) {
            lineheight = 14;
        }

        if (font == null) {
            context.font = "12px Arial";
        } else {
            context.font = font;
        }
        
        if (colour == null) {
            context.fillStyle = "white";
        } else {
            context.fillStyle = colour;
        }

        this.multiFillText(context, text, new THREE.Vector2(0, 0), canvassize.x, lineheight, true);

        var texture : THREE.Texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        super(canvassize.x, canvassize.y, texture, position);
    }

    // http://jsfiddle.net/jeffchan/WHgaY/76/
    private multiFillText(context: any, text: string, startPosition: THREE.Vector2, linewidth: number, lineHeight: number, draw: bool) : THREE.Vector2 {
        text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
        var sections = text.split("\n");

        var i, str, wordWidth, words, currentLine = 0,
            maxHeight = 0,
            maxWidth = 0;

        var printNextLine = function(str) {
                context.fillText(str, startPosition.x, startPosition.y + (lineHeight * currentLine));

            currentLine++;
            wordWidth = context.measureText(str).width;
            if (wordWidth > maxWidth) {
                maxWidth = wordWidth;
            }
        };

        for (i = 0; i < sections.length; i++) {
            words = sections[i].split(' ');
            var index = 1;

            while (words.length > 0 && index <= words.length) {

                str = words.slice(0, index).join(' ');
                wordWidth = context.measureText(str).width;

                if (wordWidth > linewidth) {
                    if (index === 1) {
                        // Falls to this case if the first word in words[] is bigger than fitWidth
                        // so we print this word on its own line; index = 2 because slice is
                        str = words.slice(0, 1).join(' ');
                        words = words.splice(1);
                    } else {
                        str = words.slice(0, index - 1).join(' ');
                        words = words.splice(index - 1);
                    }

                    printNextLine(str);

                    index = 1;
                } else {
                    index++;
                }
            }

            // The left over words on the last line
            if (index > 0) {
                printNextLine(words.join(' '));
            }

        }

        maxHeight = lineHeight * (currentLine);

        if (Debug.DRAW_SPRITEBOXES_ENABLED) {
            context.strokeRect(startPosition.x, startPosition.y, maxWidth, maxHeight);
        }

        return new THREE.Vector2(maxWidth, maxHeight);
    }
}