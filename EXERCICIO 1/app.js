var readline = require("readline")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


entradaDeDados.question("Favor digitar seu nome: ", function(nomeUsuario){

    entradaDeDados.question("Favor digitar um valor para soma: ", function(valorEscolhido1){

        entradaDeDados.question("Favor digitar segundo valor para soma: ", function(valorEscolhido2){    


            entradaDeDados.question("Favor digitar terceiro valor para a soma: ", function(valorEscolhido3){   


                var valorDaSoma = parseInt(valorEscolhido1) + parseInt(valorEscolhido2) + parseInt(valorEscolhido3)

                console.log("O resultado da soma: " + valorDaSoma + "!!!")

                entradaDeDados.close()
        


            })
        })
    })
})


