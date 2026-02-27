//Criando uma função para a validação dos dados do cliente
function validando(nome, altura, peso){
    

    if (nome == "" || !isNaN(nome)) {
        console.log("ERRO: DIGITE UM NOME VÁLIDO");
        return false
    }

    if(altura == "" || isNaN(altura)){
        console.log("ERRO: DIGITE UMA ALTURA VALIDA")
        return false
    }

    if(peso == "" || isNaN(peso)){
        console.log("ERRO: DIGITE UM PESO VALIDO")
        return false
    }

    return true
}


module.exports = {
    validando
}