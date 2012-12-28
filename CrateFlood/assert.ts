/* C-style assertions */
function assert(expression : bool, msg?: string) : void {  
   if (!expression) {  
      if (!msg) {
         window.alert("Assertion failed.");
      } else {
         window.alert("Assertion failed: " + msg);
      }
   }
}