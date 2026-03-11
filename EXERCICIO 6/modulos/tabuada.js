const validarDados = function(vTabInicial, vTabFinal, vContInicial, vContFinal) {
    let status = true

    // Requisito: Nenhuma entrada pode ficar vazia
    if (vTabInicial === '' || vTabFinal === '' || vContInicial === '' || vContFinal === '') {
        console.log("ERRO: Todas as entradas devem ser preenchidas!!")
        status = false
    } 
    // Requisito: Tabuada entre 2 e 100
    else if (vTabInicial < 2 || vTabFinal > 100 || vTabInicial > 100 || vTabFinal < 2) {
        console.log("ERRO: As tabuadas devem estar entre 2 e 100!!")
        status = false
    }
    // Requisito: Contador entre 1 e 50
    else if (vContInicial < 1 || vContFinal > 50 || vContInicial > 50 || vContFinal < 1) {
        console.log("ERRO: O cálculo da tabuada deve ser entre 1 e 50!!")
        status = false
    }
    // Requisito: Final não pode ser menor que inicial
    else if (Number(vTabFinal) < Number(vTabInicial) || Number(vContFinal) < Number(vContInicial)) {
        console.log("ERRO: O valor final não pode ser menor que o valor inicial!!")
        status = false
    }

    return status
}

const gerarTabuada = function(vTabInicial, vTabFinal, vContInicial, vContFinal) {
    let tInicial = Number(vTabInicial)
    let tFinal = Number(vTabFinal)
    let cInicial = Number(vContInicial)
    let cFinal = Number(vContFinal)

    for (let tabAtual = tInicial; tabAtual <= tFinal; tabAtual++) {
        console.log(`\nTabuada do [${tabAtual}]`)

        for (let cont = cInicial; cont <= cFinal; cont++) {
            let resultado = tabAtual * cont
            console.log(`${tabAtual} x ${cont} = ${resultado}`)
        }
    }
}
module.exports = {
    gerarTabuada,
    validarDados
}