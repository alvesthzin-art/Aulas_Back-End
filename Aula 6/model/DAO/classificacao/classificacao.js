const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertClassificacao = async function (dados){
    try {
        let sql = `insert into tbl_classificacao (nome, sigla, caracteristicas) 
                   values ('${dados.nome}', '${dados.sigla}', '${dados.caracteristicas}')`
        
        let result = await knexConex.raw(sql)
        return result ? result[0].insertId : false
    } catch (error) {
        return false;
    }
}    

const selectAllClassificacao = async function(){
    try {
        let sql = `select * from tbl_classificacao order by id desc`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error){ return false }
}

module.exports = { insertClassificacao, selectAllClassificacao }