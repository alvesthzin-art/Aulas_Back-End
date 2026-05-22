/********************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagens
 *      da API
 * Data: 17/04/2026
 * Autor: Thiago
 * Versão: 1.0
 ********************************************************************************/

//Padronização de cabeçalho para retorn dos endpoint da API
const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de Filmes',
    development: 'Thiago Costa Alves',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagem de erro para requisição com dados incorretos ou incompletos, para manter o código mais organizado e facilitar a manutenção
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Os dados enviados na requisição estão incorretos ou incompletos. Verifique os dados e tente novamente.'
}

//Mensagem de sucesso para insert, para manter o código mais organizado e facilitar a manutenção
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso.'
}
//Mensagem de sucesso para insert, para manter o código mais organizado e facilitar a manutenção
const SUCCESS_CREATED_ITEM_WARNING = {
    status: true,
    status_code: 201,
    message: 'Os dados principais foram inseridos com sucesso, porém alguns dados apresentaram problema.'
}

const SUCCESS_RESPONSE = {
    status: true,
    status_code: 200
}

//Retornos para PUT 200
const SUCCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Registro atualizado com sucesso'
}

const SUCCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Excluido com sucesso'
}


//Mensagem de erro para falha na modelagem de dados, para manter o código mais organizado e facilitar a manutenção
const ERROR_INTERNAL_SERVER_MODEL ={
    status:             false,
    status_code:        500,
    message:            "Não foi possivel processar a requisicao por conta de erro na api[erro na modelagem de dados ] "
}

//Mensagem de erro para falha na controller, para manter o código mais organizado e facilitar a manutenção
const ERROR_INTERNAL_SERVER_CONTROLLER ={
    status:             false,
    status_code:        500,
    message:            "Não foi possivel processar a requisicao por conta de erro na api[ERRO NA CONTROLLER ] "
}

//Mensagem de erro para tipo de conteúdo não aceito, para manter o código mais organizado e facilitar a manutenção
const ERROR_CONTENT_TYPE ={
    status:             false,
    status_code:        415,
    message:            "Não foi possivel processar a requisicao pois o tipo de dado aceito pela api é so json"
}

const ERROR_NOT_FOUND = {
    status:             false,
    status_code:        404,
    message:            "Não foi encontrado nenhum dado para retorno!"
}



module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_RESPONSE,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_CREATED_ITEM_WARNING
}
