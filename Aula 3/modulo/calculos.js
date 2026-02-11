/****************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de Calculos para este projeto
 * Autor: Thiago
 * Data: 11/02/2026
 * Versão: 1.0
******************************************************************************************************/

//Criando uma função para calcular o valor da compra parcelada
//Metodo tradicional de criar uma função
function calcularJurosCompostos(valorCompra, taxaJuros, tempoPagto){
    //Recebe os argumentos da função em variáveis locais
    //As variáveis (valor, taxa e tempo são numéricas por conta da conversão)
    //Mas os argumentos (valorCompra, taxaJuros e tempoPagto ainda será Strings)
    let valor = Number(valorCompra)
    let taxa = Number(taxaJuros)
    let tempo = Number(tempoPagto)

    //Validação para entradas vazias ou de caracteres inválidos
    if(valorCompra == "" || isNaN(valorCompra) || tempoPgato == "" || isNaN(tempoPagto)){
        console.log("ERRO: Valores de compra ou tempo de pagamente incorretos")
        return false
    }else{

    }

    //Chama a função para converter o numero em percentual
    let percentual = calcularPercentual(taxa)

    //Validação para o erro do percentual na função calcularPercentual()
    if(percentual){
        let montante = valor * ((1+percentual)**tempo)
        return Number(montante.toFixed(2))
    }else{
        console.log("ERRO: Valor da taxa está incorreto")
        return false
    }
    

}

function calcularPercentual(numero){
    let numeroPercentual = Number(numero)
    let percentual = numeroPercentual / 100

    if(numero == "" || numero <= 0 || isNaN(numero)){
        return false //Não pode processar
    }else{
        //Processamento do calculo do percentual
        let percentual = numeroPercentual / 100
        return percentual.toFixed(2)
    }

}


//Tornando as duas funções publicas para este projeto
module.exports = {
    calcularJurosCompostos,
    calcularPercentual
}
