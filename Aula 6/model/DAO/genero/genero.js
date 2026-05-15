const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertGenero = async function (genero){
    try {
        let sql = `insert into tbl_genero (nome) values ('${genero.nome}')`
        let result = await knexConex.raw(sql)
        return result ? result[0].insertId : false
    } catch (error) { return false }
}

const selectAllGeneros = async function(){
    try {
        let sql = `select * from tbl_genero order by id desc`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error){ return false }
}

module.exports = { insertGenero, selectAllGeneros }