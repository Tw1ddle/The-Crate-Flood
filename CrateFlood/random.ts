///<reference path='assert.ts'/>

class Random {
    private static seed: number = 42;
    private static initialized: boolean = false;

    public static nextInt() : number {
        return this.generate();
    }

    public static nextDouble(): number {
        return (this.generate() / 2147483647);
    }

    public static nextIntRange(min: number, max: number): number {
        return Math.round(min + ((max - min) * this.nextDouble()));
    }

    public static nextDoubleRange(min: number, max: number): number {
        return min + ((max - min) * this.nextDouble());
    }

    public static nextboolean(): boolean {
        return (this.generate() % 2) === 0;
    }

    public static setSeed(seed: number): void {
        this.initialized = true;

        this.seed = seed;
    }

    private static generate() : number {
        assert(this.initialized == true, 'Random number generator has not been seeded');

        return this.seed = (this.seed * 16807) % 2147483647;
    }
}