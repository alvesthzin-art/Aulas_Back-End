/*****************************************************************
 * Objetivo: Calculadora com lógica de retornos
 * Data: 13/02/2026
 * Autor: Thiago 
 *****************************************************************/

// Importação das bibliotecas e módulos necessários
const readline = require("readline");
let tratativas = require("./modulos/tratativas");
let calculos = require("./modulos/calculos");

// Configuração da interface de entrada (terminal)
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//  Início: Pergunta qual a operação
entradaDeDados.question("Digite a operação (soma, subtração, multiplicação, divisão): ", function(operacao) {
    
    /** * Validação da Operação:
     * Chamamos a função que retorna TRUE (se ok) ou FALSE (se erro).
     * O '!' inverte o valor: se for false, entra no IF e encerra.
     */
    if (!tratativas.validarOperacao(operacao)) {
        entradaDeDados.close(); // Fecha o terminal
        return; // Para a execução desta função
    }

    // Pergunta o primeiro valor
    entradaDeDados.question("Digite o primeiro valor: ", function(valor1) {
        
        // Validação booleana: encerra se o retorno for false
        if (!tratativas.validarValores(valor1)) {
            entradaDeDados.close();
            return;
        }

        //  Pergunta o segundo valor
        entradaDeDados.question("Digite o segundo valor: ", function(valor2) {
            
            // Validação booleana do segundo valor
            if (!tratativas.validarValores(valor2)) {
                entradaDeDados.close();
                return;
            }

            /**
             * Processamento do Cálculo:
             * A função calcularOperacao retorna o valor numérico calculado.
             */
            let resultado = calculos.calcularOperacao(operacao, valor1, valor2);
            
            /**
             * Verificação do resultado:
             * Como a função de cálculo pode retornar false (ex: divisão por zero),
             * verificamos se o tipo do retorno é diferente de false antes de exibir.
             */
            if (resultado !== false) {
                console.log(`\n=========================================`);
                console.log(`> O resultado da ${operacao.toLowerCase()} é: ${resultado.toFixed(2)}`);
                console.log(`=========================================`);
            }

            // Encerra a interface após exibir o resultado com sucesso
            entradaDeDados.close();
        });
    });
});