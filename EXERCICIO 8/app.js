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

entradaDeDados.question("Digite o número inicial (0 a 500): ", function(numI) {
    entradaDeDados.question("Digite o número final (100 a 1000): ", function(numF) {
        
        let resultado = gerenciarNumeros(numI, numF)

        if (resultado.erro) {
            console.log(resultado.erro)
        } else {
            // Exibição dos Pares
            console.log("\nLista de números Pares")
            resultado.pares.forEach(num => console.log(num))
            console.log(`Qtde de números encontrados: ${resultado.totalPares}`)

            // Exibição dos Ímpares
            console.log("\nLista de números Impares")
            resultado.impares.forEach(num => console.log(num))
            console.log(`Qtde de números encontrados: ${resultado.totalImpares}`)
        }

        entradaDeDados.close()
    })
})