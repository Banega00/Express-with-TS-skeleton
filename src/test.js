const util = require('util')
const myObject = {
    "a":"a",
    "b":{
       "c":"c",
       "d":{
          "e":"e",
          "f":{
             "g":"g",
             "h":{
                "i":"i"
             },
             ".a":"hidden?"
          }
       }
    }
 };

 console.log(util.inspect(myObject, {showHidden: true, depth: 0, colors: true}))
