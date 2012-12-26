var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rain = (function (_super) {
    __extends(Rain, _super);
    function Rain(position) {
        _super.call(this);
        this.counter = new SPARKS.SteadyCounter(500);
        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = Layer.rain;
        this.emitter = new SPARKS.Emitter(this.counter);
        this.emitter.addInitializer(new SPARKS.LineZone(new THREE.Vector3(0, 0.2, -10), new THREE.Vector3(0, 0.8, 10)));
        this.emitter.addInitializer(new SPARKS.Lifetime(3, 5));
        this.emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))));
        this.emitter.addAction(new SPARKS.Age());
        this.emitter.addAction(new SPARKS.Move());
        this.emitter.addCallback("created", this.onParticleCreated);
        this.emitter.addCallback("dead", this.onParticleDeath);
        this.emitter.start();
    }
    Rain.prototype.onParticleCreated = function (particle) {
        particle.target.position = particle.position.clone();
    };
    Rain.prototype.onParticleDeath = function (particle) {
        this.remove(particle.target);
    };
    return Rain;
})(THREE.Object3D);
//@ sourceMappingURL=Rain.js.map
