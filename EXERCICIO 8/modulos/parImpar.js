const gerenciarNumeros = function(vNumInicial, vNumFinal) {
    // Validação de entrada vazia
    if (vNumInicial === '' || vNumFinal === '') {
        return { erro: "ERRO: Nenhuma entrada pode ficar vazia!" }
    }

    let nI = Number(vNumInicial)
    let nF = Number(vNumFinal)

    // Validações de Requisitos
    if (isNaN(nI) || isNaN(nF)) {
        return { erro: "ERRO: Digite apenas números válidos!" }
    }
    if (nI < 0 || nI > 500) {
        return { erro: "ERRO: O número inicial deve estar entre 0 e 500!" }
    }
    if (nF < 100 || nF > 1000) {
        return { erro: "ERRO: O número final deve estar entre 100 e 1000!" }
    }
    if (nI > nF) {
        return { erro: "ERRO: O número inicial não pode ser maior que o final!" }
    }
    if (nI === nF) {
        return { erro: "ERRO: Os números inicial e final não podem ser iguais!" }
    }

    // Listas e Contadores
    let listaPares = []
    let listaImpares = []
    let qtdePares = 0
    let qtdeImpares = 0

    // Processamento dos números
    for (let i = nI; i <= nF; i++) {
        if (i % 2 === 0) {
            listaPares.push(i)
            qtdePares++
        } else {
            listaImpares.push(i)
            qtdeImpares++
        }
    }

    return {
        pares: listaPares,
        impares: listaImpares,
        totalPares: qtdePares,
        totalImpares: qtdeImpares
    }
}

module.exports = { gerenciarNumeros }