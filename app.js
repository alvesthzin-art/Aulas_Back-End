/*****************************************************************
 * Objetivo: Calcular juros compostos com entrada de dados
 * Data: 04/02/2026
 * Autor: Thiago
 * Versão: 1.0
 *****************************************************************/

// IMPORTAÇÃO DE MÓDULOS
// O módulo 'readline' permite interagir com o usuário via terminal (entrada e saída)
var readline = require("readline");

// CONFIGURAÇÃO DA INTERFACE
// Definimos de onde o dado vem (teclado/stdin) e para onde ele vai (tela/stdout)
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// INÍCIO DA COLETA DE DADOS (CALLBACKS ANINHADOS)
// Cada pergunta só acontece depois que a anterior é respondida
entradaDeDados.question("Digite seu nome: ", function(nome) {
    let nomeCliente = nome;

    // Validação: Verifica se o nome é um número ou está vazio
    if (!isNaN(nomeCliente) || nomeCliente == "") {
        console.log("ERRO: Por favor digite um nome válido!");
        return entradaDeDados.close(); // Encerra o programa se houver erro
    }

    entradaDeDados.question("Digite o nome do produto: ", function(produto) {
        let nomeProduto = produto;

        if (!isNaN(nomeProduto) || nomeProduto == "") {
            console.log("ERRO: Por favor digite um produto válido!");
            return entradaDeDados.close();
        }

        entradaDeDados.question("Digite o valor da compra (Capital Inicial): ", function(preco) {
            // Conversão: Transforma o texto digitado em número decimal (float)
            let capitalInicial = parseFloat(preco);

            if (isNaN(capitalInicial) || capitalInicial <= 0) {
                console.log("ERRO: Por favor digite um valor monetário válido!");
                return entradaDeDados.close();
            }

            entradaDeDados.question("Digite a taxa de juros (ex: 5 para 5%): ", function(taxa) {
                // Ajuste Matemático: Divide por 100 para usar na fórmula (ex: 5 vira 0.05)
                let taxaJuros = parseFloat(taxa) / 100;

                if (isNaN(taxaJuros) || taxaJuros < 0) {
                    console.log("ERRO: Por favor digite uma taxa válida!");
                    return entradaDeDados.close();
                }

                entradaDeDados.question("O tempo será em [1] Ano ou [2] Mes? : ", function(opcaoTempo) {
                    
                    // Validação da escolha entre 1 ou 2
                    if (opcaoTempo !== "1" && opcaoTempo !== "2") {
                        console.log("ERRO: Digite apenas 1 ou 2!");
                        return entradaDeDados.close();
                    }

                    entradaDeDados.question("Digite a quantidade de tempo (valor numérico): ", function(quantidade) {
                        let n = parseInt(quantidade); // Quantidade digitada
                        let unidadeOriginal = "";

                        // LÓGICA DE CONVERSÃO DE TEMPO
                        // Se o usuário escolheu Ano (1), multiplicamos por 12 para calcular em meses
                        if (opcaoTempo == "1") {
                            n = n * 12; 
                            unidadeOriginal = "anos";
                        } else {
                            unidadeOriginal = "meses";
                        }

                        // CÁLCULO DE JUROS COMPOSTOS
                        // Fórmula: M = C * (1 + i) ^ n
                        // Math.pow realiza a exponenciação
                        let montanteFinal = capitalInicial * Math.pow((1 + taxaJuros), n);
                        let valorAcrescimo = montanteFinal - capitalInicial;

                        // EXIBIÇÃO DO RELATÓRIO FINAL
                        console.log("\n******************* VIVA MODA **************************************");
                        console.log(`Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeCliente}.`);
                        console.log(`Produto: ${nomeProduto}`);
                        console.log(`Valor Original: R$ ${capitalInicial.toFixed(2)}`);
                        console.log(`Total de Parcelas: ${n} meses`);
                        console.log(`Valor Total com Juros: R$ ${montanteFinal.toFixed(2)}`);
                        console.log(`Total de Juros (Acréscimo): R$ ${valorAcrescimo.toFixed(2)}`);
                        console.log("\nMuito obrigado por escolher a VIVA MODA.");
                        console.log("***********************************************************************");

                        // ENCERRAMENTO
                        // Fecha a interface
                        entradaDeDados.close();
                    });
                });
            });
        });
    });
});