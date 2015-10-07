/* C-style assertions */
function assert(expression : boolean, msg?: string) : void {  
   if (!expression) {  
      if (msg == null) {
         window.alert("Assertion failed.");
      } else {
         window.alert("Assertion failed: " + msg);
      }
   }
}