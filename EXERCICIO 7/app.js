/*****************************************************************
 * Objetivo: Calcular fatorial
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
const { calcularFatorial } = require("./modulos/calcularFatorial")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("-----------------------------------------")
console.log("      CALCULADORA DE FATORIAL            ")
console.log("-----------------------------------------")

entradaDeDados.question("Digite um número para calcular o fatorial: ", function(numero) {
    
    // Chama a função e recebe o resultado ou a mensagem de erro
    let resultado = calcularFatorial(numero)

    console.log(resultado)

    entradaDeDados.close()
})