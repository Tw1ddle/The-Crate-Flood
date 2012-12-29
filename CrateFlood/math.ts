interface Math {
    clamp(num: number, min: number, max: number): number;
}

Math.clamp = function clamp(num: number, min: number, max: number): number {
    return Math.max(min, Math.min(num, max));
}