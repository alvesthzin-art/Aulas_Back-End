function validarOperacao(operacao) {
    let op = operacao.toLowerCase()

    if (op !== "soma" && op !== "subtração" && op !== "multiplicação"
        && op !== "divisão" || !isNaN(op) || op == "") {
        console.log("ERRO: Operação inválida.")
        return false
    }
    
    return true
}

function validarValores(valor) {
    let valorParaVerificar = valor.replace(",", ".")

    if (valor == "" || isNaN(valorParaVerificar)) {
        console.log("ERRO: Valor numérico inválido.")
        return false
    }
    
    return true
}

module.exports = {
    validarOperacao,
    validarValores
};