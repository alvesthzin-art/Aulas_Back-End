const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertSexo = async function (sexo){
    try {
        let sql = `insert into tbl_sexo (sigla, sexo) values ('${sexo.sigla}', '${sexo.sexo}')`
        let result = await knexConex.raw(sql)
        return result ? result[0].insertId : false
    } catch (error) { return false }
}

const selectAllSexo = async function(){
    try {
        let sql = `select * from tbl_sexo order by id desc`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error){ return false }
}

const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id = ${id}`
        let result = await knexConex.raw(sql)
        return result ? true : false
    } catch (error) { return false }
}

module.exports = { insertSexo, selectAllSexo, deleteSexo }