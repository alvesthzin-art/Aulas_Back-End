const listaCidades = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false


    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            const nomeCidades = item.cidades.map(function(cidade) {
                return cidade.nome
            })
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                quantidade_cidades: item.cidades.length,
                cidades: nomeCidades
            }
        }
    })

    return dadosEncontrados
}

module.exports = { 
    listaCidades 
}

const arquivo = require('./arquivo.js')
console.log(listaCidades(arquivo.listaDeEstados.estados, "AC"))