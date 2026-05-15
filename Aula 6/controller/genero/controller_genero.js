const config_message = require('../modulo/configMessages.js')
const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirNovoGenero = async function (genero, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
    if(String(contentType).toLowerCase() == 'application/json') {
        // Validação simples: nome é obrigatório e max 40 caracteres
        if(genero.nome == "" || genero.nome == null || genero.nome.length > 40){
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await generoDAO.insertGenero(genero)
            if (result) {
                message.DEFAULT_MESSAGE.status_code = 201
                return message.DEFAULT_MESSAGE
            } else { return message.ERROR_INTERNAL_SERVER_MODEL }
        }
    } else { return message.ERROR_CONTENT_TYPE }
}

const listarGeneros = async function(){
    let message = JSON.parse(JSON.stringify(config_message))
    let result = await generoDAO.selectAllGeneros()
    if(result){
        message.DEFAULT_MESSAGE.status_code = 200
        message.DEFAULT_MESSAGE.response = { generos: result }
        return message.DEFAULT_MESSAGE
    } else { return message.ERROR_NOT_FOUND }
}

module.exports = { inserirNovoGenero, listarGeneros }