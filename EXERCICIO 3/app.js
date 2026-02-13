/*****************************************************************
 * Objetivo: Calculadora
 * Data: 13/02/2026
 * Autor: Thiago
 * Versão: 1.0
 *****************************************************************/

// Importação das bibliotecas e módulos necessários
const readline = require("readline")
let tratativas = require("./modulos/tratativas")
let calculos = require("./modulos/calculos")

// Configuração da interface para entrada e saída de dados via terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// Entrada da operação matemática desejada
entradaDeDados.question("Digite qual operação matemática deseja utilizar: ", function(operacao){
    let operacaoEscolhida = operacao
    
    // Chamando a função do módulo para validar se a operação é permitida
    tratativas.validarOperacao(operacao)
    
    // Entrada do primeiro valor numérico
    entradaDeDados.question("Digite o primeiro valor para o cálculo: ", function (valor1){
        let valor1Escolhido = valor1
        
        // Chamando a função do módulo para validar se o primeiro dado é um número
        tratativas.validarValores(valor1)
    
        // Entrada do segundo valor numérico
        entradaDeDados.question("Digite o segundo valor para o cálculo: ", function(valor2){
            let valor2Escolhido = valor2
            
            // Chamando a função do módulo para validar se o segundo dado é um número
            tratativas.validarValores(valor2)

            // Encaminha os dados validados para o módulo de processamento matemático
            calculos.calcularOperacao(operacao, valor1, valor2)
            
            // Encerra a interface de entrada de dados para finalizar o programa
            entradaDeDados.close()
        })
    })         
})