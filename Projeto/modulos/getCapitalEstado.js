const dadosCapital = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false

    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                capital: item.capital
            }
        }
    })

    return dadosEncontrados
}

module.exports = { 
    dadosCapital 
}

const arquivo = require('./arquivo.js')
console.log(dadosCapital(arquivo.listaDeEstados.estados, "RJ"))