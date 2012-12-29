/* C-style assertions */
function assert(expression : bool, msg?: string) : void {  
   if (!expression) {  
      if (msg == null) {
         window.alert("Assertion failed.");
      } else {
         window.alert("Assertion failed: " + msg);
      }
   }
}