/************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no banco de dados MySQL na tabela Gênero
 * Data: 22/05/2026
 * Autor: Thiago
 * Versão: 1.1
 ************************************************************************************************* */

const knex = require('knex')
const knexConfig = require('../../database_config-knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela de gênero
const insertGenero = async function (genero){
    try {
        let sql = `insert into tbl_genero (nome) values ('${genero.nome}')`
        let result = await knexConex.raw(sql)
        return result ? result[0].insertId : false
    } catch (error) { return false }
}

// Função para retornar todos os dados da tabela de gênero
const selectAllGeneros = async function(){
    try {
        let sql = `select * from tbl_genero order by id desc`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error){ return false }
}

// Função para atualizar um gênero existente filtrando pelo ID
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}' where id = ${genero.id};`
        let result = await knexConex.raw(sql)
        return result ? true : false
    } catch (error) { 
        return false 
    }
}

// Função para buscar um gênero específico filtrando pelo seu ID primário
const selectByIdGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id = ${id}`
        let result = await knexConex.raw(sql)
        return Array.isArray(result) ? result[0] : false
    } catch (error) { 
        return false 
    }
}

// Função para excluir um registro de gênero da base de dados pelo ID
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let result = await knexConex.raw(sql)
        return result ? true : false
    } catch (error) { 
        return false 
    }
}

module.exports = { 
    insertGenero, 
    selectAllGeneros,
    updateGenero,     
    selectByIdGenero, 
    deleteGenero      
}