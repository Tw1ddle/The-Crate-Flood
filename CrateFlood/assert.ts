/* C-style assertions */
function assert(expression : bool, msg?: string) : void {  
   if (!expression) {  
      if (msg === undefined) {
         window.alert("Assertion failed.");
      } else {
         window.alert("Assertion failed: " + msg);
      }
   }
}