/*****************************************************************
 * Objetivo: Tabuada
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
const { gerarTabuada, validarDados } = require("./modulos/tabuada")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})  

entradaDeDados.question("Digite a tabuada inicial: ", function(tabuadaInicial){
    entradaDeDados.question("Digite a tabuada final: ", function(tabuadaFinal){
        entradaDeDados.question("Digite o numero inicial: ", function(numeroInicial){
            entradaDeDados.question("Digite o numero final: ", function(numeroFinal){
                
                // Chamada da função de validação
                // Passamos os valores para validar se estão vazios primeiro
                let dadosValidos = validarDados(tabuadaInicial, tabuadaFinal, numeroInicial, numeroFinal)

                if (dadosValidos) {
                    gerarTabuada(tabuadaInicial, tabuadaFinal, numeroInicial, numeroFinal)
                }

                entradaDeDados.close()
            })
        })
    })
})