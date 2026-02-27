/*****************************************************************
 * Objetivo: Calculadora de IMC
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
let calculos = require("./modulos/calculo.js")
let tratativas = require("./modulos/tratativas.js")
let classificacao = require("./modulos/calculo")



var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})    


//Entrada do nome do cliente
entradaDeDados.question("Digite seu nome: ", function(nome) {
        let nomeCliente = nome

    //Entrada da altura do cliente
    entradaDeDados.question("Digite sua altura em metros: ", function(altura){
        let alturaCliente = Number(altura)

        //Entrada do peso do cliente
        entradaDeDados.question("Digite seu peso: ", function(peso){
            let pesoCliente = Number(peso)

            //Chamando a função validação
            let validacao = tratativas.validando(nomeCliente, alturaCliente, pesoCliente)

                if (!validacao) {
                    entradaDeDados.close()
                    return
                }

                //Chamando a função calculos e a classe do cliente
                let resultado = calculos.calcularImc(alturaCliente, pesoCliente)
                let classe = calculos.classificacao(resultado)                
            
                //Resultado final
                console.log(`*******************************         Nome: ${nome}         *******************************`)
                console.log(`*****************************         Altura: ${altura}         *****************************`)
                console.log(`**************************         Seu IMC é: ${resultado.toFixed(2)}         **************************`)
                console.log(`************************      Sua classificação: ${classe}      ****************`)

                entradaDeDados.close()
            
            

        })
    })        
})    

