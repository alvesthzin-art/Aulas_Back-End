/************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela intermediária Filme_Gênero
 * Data: 22/05/2026
 * Autor: Thiago
 * Versão: 1.0
 *************************************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// Função para inserir um novo relacionamento entre filme e gênero
const insertFilmeGenero = async function (dados) {
    try {
        let sql = `insert into tbl_filme_genero (id_filme, id_genero) values (${dados.id_filme}, ${dados.id_genero})`
        
        let result = await knexConex.raw(sql)
        
        return result ? true : false
    } catch (error) { 
        return false 
    }
}

// Função para listar os gêneros de um filme específico
const selectGenerosByFilme = async function (idFilme) {
    try {
        // Query que junta a tabela intermediária com a tabela de gênero para trazer os nomes
        let sql = `select tbl_genero.id, tbl_genero.nome 
                   from tbl_filme_genero 
                   inner join tbl_genero 
                        on tbl_genero.id = tbl_filme_genero.id_genero 
                   where tbl_filme_genero.id_filme = ${idFilme}`
        
        let result = await knexConex.raw(sql)
        
        return Array.isArray(result) ? result[0] : false
    } catch (error) { 
        return false 
    }
}

// Função para buscar um vínculo específico baseado no ID do filme e ID do gênero
const selectByIdFilmeGenero = async function (idFilme, idGenero) {
    try {
        let sql = `select * from tbl_filme_genero where id_filme = ${idFilme} and id_genero = ${idGenero}`
        
        let result = await knexConex.raw(sql)
        
        return Array.isArray(result) ? result[0] : false
    } catch (error) { 
        return false 
    }
}

// Função para deletar um vínculo específico (desvincular)
const deleteFilmeGenero = async function (idFilme, idGenero) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme = ${idFilme} and id_genero = ${idGenero}`
        
        let result = await knexConex.raw(sql)
        
        return result ? true : false
    } catch (error) { 
        return false 
    }
}

module.exports = {
    insertFilmeGenero,
    selectGenerosByFilme,
    selectByIdFilmeGenero,
    deleteFilmeGenero
}