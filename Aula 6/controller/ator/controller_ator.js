/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 * manipulação de dados para o CRUD de atores
 * Data: 20/05/2026
 * Autor: Thiago 
 * Versão: 1.0
 ************************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do ator no banco de dados
const atorDAO = require('../../model/DAO/ator/ator.js')

// Função para validar os dados do ator, garantindo que estejam corretos antes de irem para o model
async function validarDadosAtor(ator) {
    // Criando uma cópia do objeto de mensagens para evitar alterações acidentais no objeto original
    let message = JSON.parse(JSON.stringify(config_message))

    // VALIDA NOME
    if (ator.nome == "" || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        message.ERROR_BAD_REQUEST.field = "[nome] inválido ou excede 100 caracteres"
        return message.ERROR_BAD_REQUEST

    // VALIDA DATA DE NASCIMENTO
    } else if (ator.data_nascimento == "" || ator.data_nascimento == null || ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {
        message.ERROR_BAD_REQUEST.field = "[data_nascimento] inválida (deve conter 10 caracteres)"
        return message.ERROR_BAD_REQUEST

    // VALIDA ID DO SEXO
    } else if (ator.id_sexo == "" || ator.id_sexo == null || ator.id_sexo == undefined || isNaN(ator.id_sexo) || ator.id_sexo <= 0) {
        message.ERROR_BAD_REQUEST.field = "[id_sexo] inválido"
        return message.ERROR_BAD_REQUEST

    // VALIDA BIOGRAFIA (Campo opcional, mas se for enviado, valida o tamanho)
    } else if (ator.biografia && ator.biografia.length > 65535) {
        message.ERROR_BAD_REQUEST.field = "[biografia] excede o limite de caracteres"
        return message.ERROR_BAD_REQUEST

    // VALIDA IMAGEM_PERFIL (Campo opcional, mas se for enviado, valida o tamanho)
    } else if (ator.imagem_perfil && ator.imagem_perfil.length > 255) {
        message.ERROR_BAD_REQUEST.field = "[imagem_perfil] excede 255 caracteres"
        return message.ERROR_BAD_REQUEST

    } else {
        return false // Retorna false se todos os dados forem válidos
    }
}

// Função para inserir um novo ator
const inserirNovoAtor = async function (dados, contentType) {
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            // Chama a função interna para validar os campos obrigatórios
            let validar = await validarDadosAtor(dados)

            // Se a validação retornar um objeto, significa que há erro
            if (validar) {
                return validar
            } else {
                // Envia os dados do ator para o DAO persistir no banco
                let result = await atorDAO.insertAtor(dados)
                
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
        console.error("Erro no Controller Ator:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para atualizar um ator existente
const atualizarAtor = async function(dados, id, contentType){
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toLowerCase().includes('application/json')) {
            
            // Verifica se o ID passado é válido e se o registro realmente existe no banco
            let resultBuscarID = await buscarAtor(id)

            if (resultBuscarID.status) {
                // Valida os novos dados recebidos no corpo da requisição
                let validar = await validarDadosAtor(dados)

                if (!validar) {
                    // Injeta o ID recebido por parâmetro diretamente no objeto do ator
                    dados.id = id

                    // Encaminha os dados atualizados para o DAO
                    let result = await atorDAO.updateAtor(dados)

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
                return resultBuscarID // Retorna o 404 caso o ator não exista
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415 formato não suportado
        }
    } catch (error) {
        console.error("Erro no Controller Ator:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para retornar todos os atores
const listarAtores = async function(){
    // Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Chama a função do DAO para buscar os dados de todos os atores
        let result = await atorDAO.selectAllAtor()
        
        // Validação para verificar se o banco retornou registros válidos
        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.atores = result

                return message.DEFAULT_MESSAGE // 200 com a lista de atores
            } else {
                return message.ERROR_NOT_FOUND // 404 Lista vazia
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
        }
    } catch (error) {
        console.error("Erro no Controller Ator:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para buscar um ator filtrando pelo ID
const buscarAtor = async function(id) {
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Validação de segurança para garantir integridade do parâmetro recebido
        if (id == "" || id == null || id == undefined || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Executa a busca no banco de dados por meio do DAO
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.ator = result
                    
                    return message.DEFAULT_MESSAGE // 200 com o objeto do ator
                } else {
                    return message.ERROR_NOT_FOUND // 404 se não encontrar correspondência
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 Erro no banco
            }
        }
    } catch (error) {
        console.error("Erro no Controller Ator:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

// Função para excluir um ator pelo ID
const excluirAtor = async function(id){
    // Criando clone do objeto JSON para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        // Validação preventiva de ID
        if (id == "" || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_BAD_REQUEST // 400
        } else {
            // Valida se o ID informado existe na base de dados antes de disparar o DELETE
            let dadosAtor = await buscarAtor(id)

            if (dadosAtor.status) {
                // Executa a remoção física no banco por meio do DAO
                let result = await atorDAO.deleteAtor(id)

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
        console.error("Erro no Controller Ator:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 Erro de lógica
    }
}

module.exports = {
    inserirNovoAtor,
    atualizarAtor,
    listarAtores,
    buscarAtor,
    excluirAtor,
    validarDadosAtor
}