const config_message = require('../modulo/configMessages.js')
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (dados, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    if(String(contentType).toLowerCase() == 'application/json') {
        // Validação de campos obrigatórios e tamanhos
        if(dados.nome == "" || dados.nome == undefined || dados.nome.length > 45 ||
           dados.sigla == "" || dados.sigla == undefined || dados.sigla.length > 2 ||
           dados.caracteristicas == "" || dados.caracteristicas == undefined || dados.caracteristicas.length > 150
        ){
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await classificacaoDAO.insertClassificacao(dados)
            if (result) {
                message.DEFAULT_MESSAGE.status_code = 201
                return message.DEFAULT_MESSAGE
            } else { return message.ERROR_INTERNAL_SERVER_MODEL } // 500
        }
    } else { return message.ERROR_CONTENT_TYPE }
}

const listarClassificacoes = async function(){
    let message = JSON.parse(JSON.stringify(config_message))
    let result = await classificacaoDAO.selectAllClassificacao()
    
    if(result){
        message.DEFAULT_MESSAGE.status_code = 200
        message.DEFAULT_MESSAGE.response = { classificacoes: result }
        return message.DEFAULT_MESSAGE
    } else { return message.ERROR_NOT_FOUND }
}

const buscarClassificacao = async function(id) {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if (id == "" || id == undefined || isNaN(id)) {
        return message.ERROR_BAD_REQUEST // 400
    } else {
        let result = await classificacaoDAO.selectByIdClassificacao(id) 
        
        if (result) {            
            message.DEFAULT_MESSAGE.status = true 
            message.DEFAULT_MESSAGE.status_code = 200
            message.DEFAULT_MESSAGE.response = { classificacao: result } 
            
            return message.DEFAULT_MESSAGE
        } else {
            return message.ERROR_NOT_FOUND // 404
        }
    }
}

module.exports = { inserirNovaClassificacao, listarClassificacoes, buscarClassificacao }