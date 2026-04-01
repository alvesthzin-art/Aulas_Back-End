const getListaDeEstado = function(listaCompleta, siglaBusca) {
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

    return getListaDeEstado
}

const getDadosEstado = function(listaCompleta, siglaBusca) {
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

const getCapitalEstado = function(listaCompleta, siglaBusca) {
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
const getEstadosRegiao = function(listaCompleta, siglaBusca) {
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



const getCidades = function(listaCompleta) {
    const apenasSiglas = listaCompleta.map(function(item) {
       return item.sigla
    })

    const resultado = {
       Uf: apenasSiglas,
       quantidade: apenasSiglas.length
    }
    return resultado
 }

module.exports = { 
    getListaDeEstado, getDadosEstado, getCapitalEstado,
    getEstadosRegiao, getCapitalPais, getCidades
}
const arquivo = require('./arquivo.js')


