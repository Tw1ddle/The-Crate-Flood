function assert(expression, msg) {
    if(!expression) {
        if(msg == null) {
            window.alert("Assertion failed.");
        } else {
            window.alert("Assertion failed: " + msg);
        }
    }
}
//@ sourceMappingURL=assert.js.map
