/*****************************************************************
 * Objetivo: Tabuada
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
let gerarTabuada = require("./modulos/tabuada")
let validarDados = require("./modulos/tabuada")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})  

entradaDeDados.question("Digite a tabuada inicial: ", function(tabuadaInicial){
    let tInicial = tabuadaInicial

    entradaDeDados.question("Digite a tabuada final: ", function(tabuadaFinal){
        let tFinal = tabuadaFinal

        entradaDeDados.question("Digite o numero inicial: ", function(numeroInicial){
            let nI = numeroInicial

            entradaDeDados.question("Digite o numero final: ", function(numeroFinal){
                let nF = numeroFinal

                let dadosValidos = validarDados(Number(tInicial), Number(tFinal), Number(nI), Number(nF))

                if (validarDados){
                    gerarTabuada(Number(tInicial), Number(tFinal), Number(nI), Number(nF))
                }

                gerarTabuada(Number(tInicial), Number(tFinal), Number(nI), Number(nF))

                entradaDeDados.close()

            })
        })
    })
})
