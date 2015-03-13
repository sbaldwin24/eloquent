function MultiplcatorUnitFailure() {};
function primitiveMultiply(a, b) {
    if (Math.random() < 0.5) {
        return a * b;
    } else {
        throw new MultiplcatorUnitFailure();
    }
}
function reliableMultiply(a, b) {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        } catch(e) {
            if (!(e instanceof MultiplcatorUnitFailure)) {
                throw e;
            }
        }
    }
};
console.log(reliableMultiply(8, 8)); // Returns 64
