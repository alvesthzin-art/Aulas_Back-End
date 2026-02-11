/*********************************************************************************************
 * Objetivo: Criar um sistema que permite o calculo de juros
 * utilizando boas práticas com funções
 * Autor: Thiago
 * Data: 11/02/2026
 * Versão: 1.0 
 **********************************************************************************************/
//Import da biblioteca do readline
const readline = require("readline")

//Cria o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada do nome do cliente
entradaDeDados.question("Digite o nome do cliente: ", function(nome){
    let nomeCliente = nome

    //Entrada do nome do produto
    entradaDeDados.question("Digite o nome do Produto: ", function(produto){
        let nomeProduto = produto

        //Entrada do valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function(capital){
            let capitalProduto = capital

            //Entrada da taxa de juros
            entradaDeDados.question("Digite a taxa de juros a ser aplicada na compra: ", function(taxa){
                let taxaCompra = taxa

                //Entrada do tempo de pagamento
                entradaDeDados.question("Digite o tempo para realizar o pagamento: ", function(tempo){
                    let tempoPagamento = tempo

                    //Import da biblioteca que realiza calculos financeiros
                    let calculos = require("./modulo/calculos.js")

                    let percentual = Number(taxaCompra) / 100
                    let montante = Number(capitalProduto) * ((1+Number(percentual)) ** Number(tempoPagamento))

                    console.log("O montante final é: " + montante.toFixed(2))
                    
                    

                })
            })
        })
    })
})



