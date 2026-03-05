const gerarTabuada = function(vTabuadaInicial, vTabuadaFinal, vContadorInicial, vContadorFinal) {
    
    
    let tInicial = Number(vTabuadaInicial)
    let tFinal = Number(vTabuadaFinal)
    let cInicial = Number(vContadorInicial)
    let cFinal = Number(vContadorFinal)

    
    for (let tabAtual = tInicial; tabAtual <= tFinal; tabAtual++) {
        console.log(`\n=== TABUADA DO ${tabAtual} ===`)

        
        for (let cont = cInicial; cont <= cFinal; cont++) {
            let resultado = tabAtual * cont
            console.log(`${tabAtual} x ${cont} = ${resultado}`)
        }
    }
}
const validarDados = function(vTabInicial, vTabFinal, vContInicial, vContFinal) {
    let status = true

    if (vTabInicial < 2 || vTabFinal > 100) {
        console.log("ERRO: As tabuadas devem estar entre 2 e 100!!")
        status = false
    }
    
    if (vContInicial < 1 || vContFinal > 50) {
        console.log("ERRO: O cálculo da tabuada deve ser entre 1 e 50!!")
        status = false
    }

    if (vTabFinal < vTabInicial || vContFinal < vContInicial) {
        console.log("ERRO: O valor final não pode ser menor que o valor inicial!!")
        status = false
    }

    return status
}

module.exports = {
    gerarTabuada,
    validarDados
}
