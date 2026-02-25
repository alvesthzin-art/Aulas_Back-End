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
        if (v2 === 0) {
            console.log("ERRO: Divisão por zero não permitida.")
            return false
        }
        resultado = v1 / v2
    }

    return resultado
}

module.exports = {
    calcularOperacao
};