//Criando a função para calcular IMC
function calcularImc(altura, peso) {
    let alturaCliente = Number(String(altura).replace(",", "."))
    let pesoCliente = Number(String(peso).replace(",", "."))
    let resultado = pesoCliente / (alturaCliente * alturaCliente)
    return resultado
}

//Criando uma função para classificação
function classificacao(resultado) {
    if (resultado < 18.5) {
        return "Abaixo do peso"
    } else if (resultado >= 18.5 && resultado <= 24.9) {
        return "Peso normal"
    } else if (resultado >= 25 && resultado <= 29.9) {
        return "Acima do peso (Sobrepeso)"
    } else if (resultado >= 30 && resultado <= 34.9) {
        return "Obesidade 1"
    } else if (resultado >= 35 && resultado <= 39.9) {
        return "Obesidade 2"
    } else { // resultado >= 40
        return "Obesidade 3"
    }
}

module.exports = {
    calcularImc,
    classificacao
}