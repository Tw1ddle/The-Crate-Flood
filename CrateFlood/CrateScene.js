var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CrateScene = (function (_super) {
    __extends(CrateScene, _super);
    function CrateScene(renderer) {
        _super.call(this, renderer);
        this.camera.position.z = 200;
        var geometry = new THREE.CubeGeometry(50, 50, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 16777215,
            shading: THREE.FlatShading,
            overdraw: true
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 10;
        this.scene.add(cube);
        if(Config.DEBUG) {
            this.debug.add(cube.position, 'x', -1000, 1000, 0.1).listen();
            this.debug.add(cube.position, 'y', -1000, 1000, 0.1).listen();
            this.debug.add(cube.position, 'z', -1000, 1000, 0.1).listen();
        }
    }
    CrateScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    CrateScene.prototype.update = function (dt) {
    };
    return CrateScene;
})(BaseScene);
//@ sourceMappingURL=CrateScene.js.map
