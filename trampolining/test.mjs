import factorial from "./factorial.mjs";
import trampoline from "./trampoline.mjs";

/**---------------------------------------
 * *       INFO
 * Here we get the trampolined
 * version of factorial function
 * which will never reach max stack size
 *---------------------------------------**/
let fact = trampoline(factorial);

console.log(fact(20000000));
