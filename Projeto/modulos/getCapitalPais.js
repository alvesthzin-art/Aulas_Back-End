const capitalPais = function(listaCompleta) {
    if(!listaCompleta) return false

    let listaFiltrada = []

    listaCompleta.forEach(function(item) {

        if (item.capital_pais) {

            listaFiltrada.push({

                capital_atual: item.capital_pais.capital,
                uf: item.sigla,
                descricao: item.nome,
                capital: item.capital,
                regiao: item.regiao,
                capital_pais_ano_inicio: item.capital_pais.ano_inicio,
                capital_pais_ano_fim: item.capital_pais.ano_fim
            })
        }
    })


    return listaFiltrada.length > 0 ? { capitais: listaFiltrada } : false
}

module.exports = { 
    capitalPais 
}
const arquivo = require('./arquivo.js')
console.log(capitalPais(arquivo.listaDeEstados.estados))
