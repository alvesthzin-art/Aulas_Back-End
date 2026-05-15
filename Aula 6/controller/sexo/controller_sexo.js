const config_message = require('../modulo/configMessages.js')
const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const listarSexo = async function(){
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let result = await sexoDAO.selectAllSexo()
        if(result){
            message.DEFAULT_MESSAGE.status = true
            message.DEFAULT_MESSAGE.status_code = 200
            message.DEFAULT_MESSAGE.response = { sexo: result }
            return message.DEFAULT_MESSAGE
        } else { return message.ERROR_NOT_FOUND }
    } catch (error) { return message.ERROR_INTERNAL_SERVER_CONTROLLER }
}

const inserirNovoSexo = async function (sexo, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if(sexo.sexo == "" || sexo.sexo == null || sexo.sexo.length > 15 || sexo.sigla == "" || sexo.sigla.length > 3){
                return message.ERROR_BAD_REQUEST
            } else {
                let result = await sexoDAO.insertSexo(sexo)
                if (result) {
                    message.DEFAULT_MESSAGE.status_code = 201
                    return message.DEFAULT_MESSAGE
                } else { return message.ERROR_INTERNAL_SERVER_MODEL }
            }
        } else { return message.ERROR_CONTENT_TYPE }
    } catch (error) { return message.ERROR_INTERNAL_SERVER_CONTROLLER }
}

module.exports = { listarSexo, inserirNovoSexo }