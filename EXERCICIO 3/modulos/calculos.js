function calcularOperacao(operacao, v1, v2) {

    let resultado
    let op = operacao.toLowerCase()
    v1 = Number(v1.replace(",", "."))
    v2 = Number(v2.replace(",", "."))

    if (op === "soma") {
        resultado = v1 + v2
    } else if (op === "subtração") {
        resultado = v1 - v2
    } else if (op === "multiplicação") {
        resultado = v1 * v2
    } else if (op === "divisão") {
        resultado = v1 / v2
    }

    console.log(`O resultado da ${op} é: ${resultado.toFixed(2)}`)
}

module.exports = {
    calcularOperacao
}