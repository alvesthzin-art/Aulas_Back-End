const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertAtor = async function (dados){
    try {
        let sql = `insert into tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, foto, id_sexo) 
                   values (
                    '${dados.nome}', 
                    '${dados.nome_artistico}', 
                    '${dados.data_nascimento}', 
                    ${dados.data_falecimento ? "'" + dados.data_falecimento + "'" : null}, 
                    '${dados.biografia}', 
                    '${dados.foto}', 
                    ${dados.id_sexo}
                   )`
        
        let result = await knexConex.raw(sql)
        return result ? result[0].insertId : false
    } catch (error) { 
        console.log(error) // Deixe o log aqui para debugarmos se der erro 500
        return false 
    }
}

const selectAllAtor = async function(){
    try {
        let sql = `select * from tbl_ator order by id desc`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error){ return false }
}

module.exports = { insertAtor, selectAllAtor }