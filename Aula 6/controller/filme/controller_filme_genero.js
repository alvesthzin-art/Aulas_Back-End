/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 * manipulação de dados para o relacionamento entre filmes e gêneros (Tabela Intermediária)
 * Data: 22/05/2026
 * Autor: Thiago 
 * Versão: 1.0
 ************************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do relacionamento no banco de dados
const filmeGeneroDAO = require('../../model/DAO/filme/filme_genero.js')

// Função para validar os IDs antes de processar no banco de dados
async function validarRelacionamento(dados) {
    let message = JSON.parse(JSON.stringify(config_message))

    // VALIDA ID DO FILME
    if (dados.id_filme == "" || dados.id_filme == null || dados.id_filme == undefined || isNaN(dados.id_filme) || dados.id_filme <= 0) {
        message.ERROR_BAD_REQUEST.field = "[id_filme] inválido"
        return message.ERROR_BAD_REQUEST

    // VALIDA ID DO GÊNERO
    } else if (dados.id_genero == "" || dados.id_genero == null || dados.id_genero == undefined || isNaN(dados.id_genero) || dados.id_genero <= 0) {
        message.ERROR_BAD_REQUEST.field = "[id_genero] inválido"
        return message.ERROR_BAD_REQUEST
    } else {
        return false // Retorna false se os dados forem válidos
    }
}

// Função para vincular um gênero a um filme
const inserirFilmeGenero = async function (dados, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            // Chama a função interna para validar se os IDs enviados são corretos
            let validar = await validarRelacionamento(dados)

            if (validar) {
                return validar
            } else {
                // Envia os dados de vínculo para o DAO persistir na tabela intermediária
                let result = await filmeGeneroDAO.insertFilmeGenero(dados)
                
                if (result) {
                    message.DEFAULT_MESSAGE.status = true
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    return message.DEFAULT_MESSAGE // 201 
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no Banco
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415 formato não suportado
        }
    } catch (error) {
        console.error("Erro no Controller Filme Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para listar todos os gêneros vinculados a um determinado filme
const listarGenerosPorFilme = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Validação do ID do filme recebido por parâmetro
        if (idFilme == "" || idFilme == null || idFilme == undefined || isNaN(idFilme)) {
            message.ERROR_BAD_REQUEST.field = "[ID FILME] INVÁLIDO"
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Busca no banco os gêneros que pertencem àquele filme
            let result = await filmeGeneroDAO.selectGenerosByFilme(idFilme)
            
            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.count = result.length
                    message.DEFAULT_MESSAGE.response.generos = result

                    return message.DEFAULT_MESSAGE // 200 OK
                } else {
                    return message.ERROR_NOT_FOUND // 404 Nenhum dado achado
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
            }
        }
    } catch (error) {
        console.error("Erro no Controller Filme Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para buscar um vínculo específico entre um filme e um gênero
const buscarFilmeGenero = async function(idFilme, idGenero) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Validação dos IDs de entrada para garantir integridade na consulta do relacionamento
        if (idFilme == "" || idFilme == null || idFilme == undefined || isNaN(idFilme) ||
            idGenero == "" || idGenero == null || idGenero == undefined || isNaN(idGenero)) {
            message.ERROR_BAD_REQUEST.field = "[ID_FILME] ou [ID_GÊNERO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Invoca a função do DAO especializada em localizar a chave composta ou par de chaves
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(idFilme, idGenero)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result
                    
                    return message.DEFAULT_MESSAGE // 200 OK
                } else {
                    return message.ERROR_NOT_FOUND // 404 Registro não localizado
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
            }
        }
    } catch (error) {
        console.error("Erro no Controller Filme Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para desvincular um gênero de um filme (Excluir o registro intermediário)
const excluirFilmeGenero = async function(idFilme, idGenero){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Validação dos dois IDs necessários para a remoção do vínculo
        if (idFilme == "" || idFilme == null || idFilme == undefined || isNaN(idFilme) ||
            idGenero == "" || idGenero == null || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Executa a remoção do registro na tabela intermediária por meio do DAO
            let result = await filmeGeneroDAO.deleteFilmeGenero(idFilme, idGenero)

            if (result) {
                return message.SUCCESS_DELETED_ITEM // 200 Sucesso
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
            }
        }
    } catch (error) {
        console.error("Erro no Controller Filme Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

module.exports = {
    inserirFilmeGenero,
    listarGenerosPorFilme,
    buscarFilmeGenero, 
    excluirFilmeGenero,
    validarRelacionamento
}