const listaEstados = function(listaCompleta) {
    const apenasSiglas = listaCompleta.map(function(item) {
       return item.sigla
    })

    const resultado = {
       Uf: apenasSiglas,
       quantidade: apenasSiglas.length
    }
    return resultado
 }
module.exports = { listaEstados }

const arquivo = require('./arquivo.js')
console.log(listaEstados(arquivo.listaDeEstados.estados))