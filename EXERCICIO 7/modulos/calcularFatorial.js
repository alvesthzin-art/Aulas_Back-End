const calcularFatorial = function(numero) {
    let valor = Number(numero)
    let resultado = 1
    let expressao = ""

    // Validações
    if (numero === "") return "ERRO: A entrada não pode estar vazia!"
    if (isNaN(valor)) return "ERRO: Caractere inválido! Digite apenas números."
    if (valor < 0) return "ERRO: Não existe fatorial de número negativo!"
    if (valor === 0) return "ERRO: Não existe fatorial de 0!"

    
    if (!Number.isInteger(valor)) return "ERRO: Digite apenas números inteiros!"

    
    if (valor > 170) return "ERRO: Número muito grande! Digite um valor até 170."

    // Cálculo do Fatorial e montagem da expressão (ex: 5x4x3x2x1)
    for (let i = valor; i >= 1; i--) {
        resultado *= i
        expressao += (i > 1) ? `${i}x` : `${i}`
    }

    return `Fatorial de ${valor} é ${expressao} = ${resultado}`
}

module.exports = { calcularFatorial }
