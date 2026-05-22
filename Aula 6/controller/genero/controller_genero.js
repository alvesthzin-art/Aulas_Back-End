/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 * manipulação de dados para o CRUD de gêneros
 * Data: 22/05/2026
 * Autor: Thiago 
 * Versão: 1.0
 ************************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do gênero no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')

// Função para validar os dados do gênero, garantindo que estejam corretos antes de irem para o model
async function validarDadosGenero(genero) {
    // Criando uma cópia do objeto de mensagens para evitar alterações acidentais no objeto original
    let message = JSON.parse(JSON.stringify(config_message))

    // VALIDA NOME DO GÊNERO
    if (genero.nome == "" || genero.nome == null || genero.nome == undefined || genero.nome.length > 40) {
        message.ERROR_BAD_REQUEST.field = "[nome] inválido ou excede 40 caracteres"
        return message.ERROR_BAD_REQUEST
    } else {
        return false // Retorna false se o dado for válido
    }
}

// Função para inserir um novo gênero
const inserirNovoGenero = async function (genero, contentType) {
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            // Chama a função interna para validar os campos obrigatórios
            let validar = await validarDadosGenero(genero)

            // Se a validação retornar um objeto, significa que há erro
            if (validar) {
                return validar
            } else {
                // Envia os dados do gênero para o DAO persistir no banco
                let result = await generoDAO.insertGenero(genero)
                
                if (result) {
                    message.DEFAULT_MESSAGE.status = true
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    return message.DEFAULT_MESSAGE // 201 Created
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no Banco
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415 formato não suportado
        }
    } catch (error) {
        console.error("Erro no Controller Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para atualizar um gênero existente
const atualizarGenero = async function(genero, id, contentType){
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toLowerCase().includes('application/json')) {
            
            // Verifica se o ID passado é válido e se o registro realmente existe no banco
            let resultBuscarID = await buscarGenero(id)

            if (resultBuscarID.status) {
                // Valida os novos dados recebidos no corpo da requisição
                let validar = await validarDadosGenero(genero)

                if (!validar) {
                    // Injeta o ID recebido por parâmetro diretamente no objeto do gênero
                    genero.id = id

                    // Encaminha os dados atualizados para o DAO
                    let result = await generoDAO.updateGenero(genero)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATED_ITEM.message
                        return message.DEFAULT_MESSAGE // 200 OK
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no Banco
                    }
                } else {
                    return validar // Retorna os erros de campos inválidos
                }
            } else {
                return resultBuscarID // Retorna o 404 caso o gênero não exista
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415 formato não suportado
        }
    } catch (error) {
        console.error("Erro no Controller Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para retornar todos os gêneros
const listarGeneros = async function(){
    // Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Chama a função do DAO para buscar os dados de todos os gêneros
        let result = await generoDAO.selectAllGeneros()
        
        // Validação para verificar se o banco retornou registros válidos
        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.generos = result

                return message.DEFAULT_MESSAGE // 200 com a lista de gêneros
            } else {
                return message.ERROR_NOT_FOUND // 404 Lista vazia
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
        }
    } catch (error) {
        console.error("Erro no Controller Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para buscar um gênero filtrando pelo ID
const buscarGenero = async function(id) {
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Validação de segurança para garantir integridade do parâmetro recebido
        if (id == "" || id == null || id == undefined || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Executa a busca no banco de dados por meio do DAO
            let result = await generoDAO.selectByIdGenero(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.genero = result
                    
                    return message.DEFAULT_MESSAGE // 200 com o objeto do gênero
                } else {
                    return message.ERROR_NOT_FOUND // 404 se não encontrar correspondência
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
            }
        }
    } catch (error) {
        console.error("Erro no Controller Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para excluir um gênero pelo ID
const excluirGenero = async function(id){
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Validação preventiva de ID
        if (id == "" || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Valida se o ID informado existe na base de dados antes de disparar o DELETE
            let dadosGenero = await buscarGenero(id)

            if (dadosGenero.status) {
                // Executa a remoção física no banco por meio do DAO
                let result = await generoDAO.deleteGenero(id)

                if (result) {
                    return message.SUCCESS_DELETED_ITEM // 200 com a mensagem de sucesso
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
                }
            } else {
                return message.ERROR_NOT_FOUND // 404 Registro inexistente
            }
        }
    } catch (error) {
        console.error("Erro no Controller Gênero:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGeneros,
    buscarGenero,
    excluirGenero,
    validarDadosGenero
}