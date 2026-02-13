function validarOperacao(operacao){
    
    let operacaoEscolhida = operacao
    
    operacao = operacao.toLowerCase()

    if(operacao !== "soma" && operacao !== "subtração" && operacao !== "multiplicação"
         && operacao !== "divisão" || !isNaN(operacao) || operacao == "") {

        console.log("ERRO: Digite uma operação válida: ")
        process.exit() 
    }

}    

function validarValores(valor) { 

    let valorParaVerificar = valor.replace(",", ".")

    if (valor == "" || isNaN(valorParaVerificar)) {
        console.log("ERRO: Digite um número válido.")
        process.exit()
    }
    
    if (valor == 0) {
        console.log("ERRO: Não é possível dividir por zero.")
        process.exit()
    }
    
}
    
    
module.exports = {
    validarOperacao,
    validarValores
}