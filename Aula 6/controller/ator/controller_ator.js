const config_message = require('../modulo/configMessages.js')
const atorDAO = require('../../model/DAO/ator/ator.js')

const inserirNovoAtor = async function (dados, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    if(String(contentType).toLowerCase() == 'application/json') {
        // Validação de campos obrigatórios
        if(dados.nome == "" || dados.nome == undefined || dados.nome.length > 100 ||
           dados.data_nascimento == "" || dados.data_nascimento == undefined || dados.data_nascimento.length != 10 ||
           dados.id_sexo == "" || dados.id_sexo == undefined
        ){
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await atorDAO.insertAtor(dados)
            if (result) {
                message.DEFAULT_MESSAGE.status_code = 201
                return message.DEFAULT_MESSAGE
            } else { return message.ERROR_INTERNAL_SERVER_MODEL }
        }
    } else { return message.ERROR_CONTENT_TYPE }
}

const listarAtores = async function(){
    let message = JSON.parse(JSON.stringify(config_message))
    
    // Chama a função do DAO para buscar os dados
    let result = await atorDAO.selectAllAtor()
    
    if(result){
        message.DEFAULT_MESSAGE.status_code = 200
        message.DEFAULT_MESSAGE.response = { atores: result }
        return message.DEFAULT_MESSAGE
    } else {
        return message.ERROR_NOT_FOUND // 404 se não houver atores
    }
}


module.exports = {
    inserirNovoAtor,
    listarAtores
}
