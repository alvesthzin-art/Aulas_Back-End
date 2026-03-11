/*****************************************************************
 * Objetivo: Lógica para separar números pares e ímpares com escolha
 *****************************************************************/

const gerenciarNumeros = function(vNumInicial, vNumFinal) {
    // Validações de entrada vazia
    if (vNumInicial === '' || vNumFinal === '') return { erro: "ERRO: Entradas vazias!" }

    let nI = Number(vNumInicial)
    let nF = Number(vNumFinal)

    // Validações de Requisitos
    if (isNaN(nI) || isNaN(nF)) return { erro: "ERRO: Digite apenas números!" }
    if (nI < 0 || nI > 500) return { erro: "ERRO: Inicial entre 0 e 500!" }
    if (nF < 100 || nF > 1000) return { erro: "ERRO: Final entre 100 e 1000!" }
    if (nI >= nF) return { erro: "ERRO: O inicial deve ser menor que o final!" }

    let pares = [], impares = []

    for (let i = nI; i <= nF; i++) {
        if (i % 2 === 0) pares.push(i)
        else impares.push(i)
    }

    return { pares, impares }
}

module.exports = { gerenciarNumeros }