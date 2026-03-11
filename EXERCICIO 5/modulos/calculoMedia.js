const validarDados = function(dados) {
    // Verifica campos vazios
    for (let chave in dados) {
        if (dados[chave] === "") return "vazio"
    }

    // Validação das notas (devem ser números entre 0 e 100)
    const notas = [dados.n1, dados.n2, dados.n3, dados.n4]
    for (let nota of notas) {
        let n = Number(nota)
        if (isNaN(n)) return "nao_numero"
        if (n < 0 || n > 100) return "intervalo"
    }

    return true
}

const calcularMedia = (n1, n2, n3, n4) => (Number(n1) + Number(n2) + Number(n3) + Number(n4)) / 4

const gerarRelatorio = function(dados, media, status, notaExame = null, mediaExame = null) {
    // Define os artigos conforme o sexo
    const artA = dados.sexoA.toUpperCase() === 'F' ? 'A aluna' : 'O aluno'
    const artP = dados.sexoP.toUpperCase() === 'F' ? 'Professora' : 'Professor'
    
    console.log(`\n================ RELATÓRIO DO ALUNO ================`)
    console.log(`${artA} [ ${dados.aluno} ] foi [ ${status} ] na disciplina [ ${dados.disciplina} ].`)
    console.log(`Curso: ${dados.curso}`)
    console.log(`${artP}: ${dados.professor}`)
    console.log(`Notas: ${dados.n1}, ${dados.n2}, ${dados.n3}, ${dados.n4}${notaExame ? ', Exame: ' + notaExame : ''}`)
    console.log(`Média Final: ${media.toFixed(1)}`)
    
    if (mediaExame) {
        console.log(`Média Final do Exame: ${mediaExame.toFixed(1)}`)
    }
    console.log(`====================================================`)
}

module.exports = { validarDados, calcularMedia, gerarRelatorio }