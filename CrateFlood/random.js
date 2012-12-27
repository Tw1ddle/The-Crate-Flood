var Random = (function () {
    function Random() { }
    Random.seed = 42;
    Random.initialized = false;
    Random.nextInt = function nextInt() {
        return this.generate();
    }
    Random.nextDouble = function nextDouble() {
        return (this.generate() / 2147483647);
    }
    Random.nextIntRange = function nextIntRange(min, max) {
        return Math.round(min + ((max - min) * this.nextDouble()));
    }
    Random.nextDoubleRange = function nextDoubleRange(min, max) {
        return min + ((max - min) * this.nextDouble());
    }
    Random.nextBoolean = function nextBoolean() {
        return (this.generate() % 2) === 0;
    }
    Random.setSeed = function setSeed(seed) {
        this.initialized = true;
        this.seed = seed;
    }
    Random.generate = function generate() {
        assert(this.initialized == true, 'Random number generator has not been seeded');
        return this.seed = (this.seed * 16807) % 2147483647;
    }
    return Random;
})();
//@ sourceMappingURL=Random.js.map
