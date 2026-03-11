/*****************************************************************
 * Objetivo: Calculadora de IMC
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
let calculos = require("./modulos/calculo.js")
let tratativas = require("./modulos/tratativas.js")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})    

//Entrada do nome do cliente
entradaDeDados.question("Digite seu nome: ", function(nome) {
    let nomeCliente = nome

    //Entrada da altura do cliente
    entradaDeDados.question("Digite sua altura em metros: ", function(altura){

        //Entrada do peso do cliente
        entradaDeDados.question("Digite seu peso: ", function(peso){

            //Chamando a função validação (strings brutas para tratar vírgula e negativos)
            let validacao = tratativas.validando(nomeCliente, altura, peso)

            if (!validacao) {
                entradaDeDados.close()
                return
            }

            //Chamando a função calculos e a classe do cliente (módulo já trata vírgula)
            let resultado = calculos.calcularImc(altura, peso)
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
