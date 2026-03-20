const dadosRegiao = function(listaCompleta, buscaRegiao) {
    if (!listaCompleta || !buscaRegiao) return false

    let estruturaRegiao = {
        regiao: buscaRegiao.toUpperCase(),
        estados: [] 
    }

    let status = false

    listaCompleta.forEach(function(item) {
        if (String(item.regiao).toUpperCase() === String(buscaRegiao).toUpperCase()) {
            
            estruturaRegiao.estados.push({
                uf: item.sigla,
                descricao: item.nome
            })
            
            status = true
        }
    })

    return status ? estruturaRegiao : false
}

module.exports = {
    dadosRegiao
}

const arquivo = require('./arquivo.js')
console.log(dadosRegiao(arquivo.listaDeEstados.estados, "Nordeste"))