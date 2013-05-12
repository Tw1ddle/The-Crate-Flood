///<reference path='three.d.ts'/>
///<reference path='dat.gui.d.ts'/>
///<reference path='assert.ts'/>

module Debug {
    export var DRAW_SPRITEBOXES_ENABLED: bool = false;

    export var GUI_ENABLED: bool = false;

    //synchronous
    var uniqueID = (function () {
        var id: number = 0;

        return function () { 
            id++;
            return id.toString();
         };
    })();

    function getFolder(gui: any, tag?: string) : any {
        if (tag != null) {
            return gui.addFolder(tag.concat(' (').concat(uniqueID().concat(')')));
        } else {
            return gui.addFolder('Item '.concat('(').concat(uniqueID().concat(')')));
        }
    }

    export function addCamera(gui: any, camera: THREE.OrthographicCamera, tag?: string): dat.gui.GUI {
        var folder: dat.gui.GUI = addItem(gui, camera, tag);

        folder.add(camera, 'frustumCulled').listen();

        return folder;
    }

    export function addText(gui: any, textitem: TextItem, tag?: string): dat.gui.GUI {
        var folder: dat.gui.GUI = addItem(gui, textitem, tag);

        return folder;
    }

    export function addItem(gui: any, object: THREE.Object3D, tag?: string): dat.gui.GUI {
        assert(GUI_ENABLED, "Debug addon called with debugging disabled");

        var folder: dat.gui.GUI = getFolder(gui, tag);
  
        folder.add(object.position, 'x', -1000.0, 1000.0, 0.1).listen();
        folder.add(object.position, 'y', -1000.0, 1000.0, 0.1).listen();
        folder.add(object.position, 'z', -1000.0, 1000.0, 0.1).listen();

        folder.add(object.rotation, 'x', 0.0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'y', 0.0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'z', 0.0, Math.PI * 2, 0.1).listen();

        folder.add(object.scale, 'x', 0.0, 10.0, 0.1).listen();
        folder.add(object.scale, 'y', 0.0, 10.0, 0.1).listen();
        folder.add(object.scale, 'z', 0.0, 10.0, 0.1).listen();

        folder.add(object, 'visible').listen();
        folder.add(object, 'id').listen();

        return folder;
    }

    export function addItems(gui: any, objects: THREE.Object3D[], tag?: string): dat.gui.GUI {
        var folder: dat.gui.GUI = getFolder(gui, "Items");

        for (var i = 0; i < objects.length; i++) {
            addItem(folder, objects[i], tag);
        }

        return folder;
    }

    export function addSceneInfo(gui: any, scene: THREE.Scene, tag?: string): dat.gui.GUI {
        var folder: dat.gui.GUI = getFolder(gui, tag);

        folder.add(scene.children, 'length').listen();

        return folder;
    }

    export function addToScene(scene: THREE.Scene) {
        //todo
    }

}