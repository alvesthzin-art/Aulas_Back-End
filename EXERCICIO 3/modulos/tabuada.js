/***************************************************************
 * Objetivo: Arquivo responsável por gerar a tabuada de um número
 * Data 25/02/2026
 * Autor: Thiago
 * Versão: 1.0
 ****************************************************************/
//Import da biblioteca 
const calculosMatematicos = require("./calculos.js")


// Função para imprimir a tabuada usando while
const gerarTabuada = function(tabuada){

    //Recebe a tabuada a ser gerada
    let tab = Number(tabuada)

    let cont = 0 
    let resultado

    //Repetição para gerar a tabuada até 10
    for(let cont = 0; cont <= 10; cont++){
        // Chama a função de multiplicar para realizar a operação
        resultado = calculosMatematicos.calcularOperacao("multiplicação", tab, cont)
        console.log(`${tab} x ${cont} = ${resultado}`)
    }
}

gerarTabuada(7)