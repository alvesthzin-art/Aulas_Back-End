const dadosEstado = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false

    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                capital: item.capital,
                regiao: item.regiao
            }
        }
    })

    return dadosEncontrados
}

module.exports = { 
    dadosEstado 
}

const arquivo = require('./arquivo.js')
console.log(dadosEstado(arquivo.listaDeEstados.estados, "MG"))