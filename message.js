const clc = require("cli-color")

function outputMessage(message){
    console.log(clc.yellow(`The message is: ${message}`))
}

outputMessage('Ciao ciao!')