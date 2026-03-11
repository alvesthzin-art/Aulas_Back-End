//Criando uma função para a validação dos dados do cliente
function validando(nome, altura, peso){

    if (nome == "" || !isNaN(nome)) {
        console.log("ERRO: DIGITE UM NOME VÁLIDO")
        return false
    }

    // Normaliza vírgula para ponto antes de converter
    let alturaNum = Number(String(altura).replace(",", "."))
    let pesoNum   = Number(String(peso).replace(",", "."))

    if (altura == "" || isNaN(alturaNum)) {
        console.log("ERRO: DIGITE UMA ALTURA VÁLIDA")
        return false
    }

    if (alturaNum <= 0) {
        console.log("ERRO: A ALTURA DEVE SER MAIOR QUE ZERO")
        return false
    }

    if (peso == "" || isNaN(pesoNum)) {
        console.log("ERRO: DIGITE UM PESO VÁLIDO")
        return false
    }

    if (pesoNum <= 0) {
        console.log("ERRO: O PESO DEVE SER MAIOR QUE ZERO")
        return false
    }

    return true
}


module.exports = {
    validando
}
