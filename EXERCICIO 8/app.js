/*****************************************************************
 * Objetivo:  Criar um sistema que gerencie números pares e ímpares 
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
const { gerenciarNumeros } = require("./modulos/parImpar")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Número inicial (0-500): ", function(numI) {
    entradaDeDados.question("Número final (100-1000): ", function(numF) {
        
        console.log("\nEscolha uma opção:")
        console.log("1 - Somente Pares")
        console.log("2 - Somente Ímpares")
        console.log("3 - Ambos (Pares e Ímpares)")
        
        entradaDeDados.question("\nDigite sua opção: ", function(opcao) {
            
            let resultado = gerenciarNumeros(numI, numF)

            if (resultado.erro) {
                console.log(resultado.erro)
            } else {
                // Lógica de exibição baseada na escolha
                if (opcao == "1" || opcao == "3") {
                    console.log("\n--- LISTA DE PARES ---")
                    resultado.pares.forEach(n => console.log(n))
                    console.log(`Qtde: ${resultado.pares.length}`)
                }

                if (opcao == "2" || opcao == "3") {
                    console.log("\n--- LISTA DE ÍMPARES ---")
                    resultado.impares.forEach(n => console.log(n))
                    console.log(`Qtde: ${resultado.impares.length}`)
                }

                if (opcao !== "1" && opcao !== "2" && opcao !== "3") {
                    console.log("ERRO: Opção de escolha inválida!")
                }
            }

            entradaDeDados.close()
        })
    })
})