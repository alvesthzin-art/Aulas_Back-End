/************************************************************************************************************
 * Objetico: Arquivo responsavel pela validação, tratamento e
 *      manipulação de dados para o CRUD de filmes
 * Data: 17/04/2026
 * Autor: Thiago 
 * Versão: 1.0
 ************************************************************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Função para validar os dados do filme, garantindo que os dados estejam corretos antes de serem processados pelo model
async function validarDados(filme) {
    //Criando uma cópia do objeto de mensagens para evitar alterações acidentais no objeto original
    let message = JSON.parse(JSON.stringify(config_message))

    //VALIDA NOME
    if(filme.nome == ""  || filme.nome == null || filme.nome == undefined || filme.nome.length >  80){
       message.ERROR_BAD_REQUEST.field = "[nome] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DATA    
    }else if(filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10 ){
       message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMEMTO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA DURACAO
    }else if (filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length  < 5  ){
       message.ERROR_BAD_REQUEST.field = "[DURACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA SINOPSE
    }else if (filme.sinopse == ""       || filme.sinopse == null || filme.sinopse == undefined ){
       message.ERROR_BAD_REQUEST.field = "[SINOPSE] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA AVALIACAO
    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){
       message.ERROR_BAD_REQUEST.field = "[AVALIACAO] invalido"
       return message.ERROR_BAD_REQUEST

   //VALIDA VALOR
    }else if (filme.valor == "" || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN( filme.valor) ){
       message.ERROR_BAD_REQUEST.field = "[VALOR] invalido"
       return message.ERROR_BAD_REQUEST
       
   //VALIDA CAPA
    } else if (filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = "[CAPA] invalido"
        return message.ERROR_BAD_REQUEST


    }else{   
        return false 
    } 
}

//Função para inserir um novo filme
async function inserirNovoFilme(filme,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))    

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
        
            let validar = await validarDados(filme)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os filmes para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if (result) {
                    message.DEFAULT_MESSAGE.status = true
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                  
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//erro 500
                    
                }
                return message.DEFAULT_MESSAGE
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }//415
            
    }catch (error) {
        console.error("Erro no Controller:", error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar um filme
const atualizarFilme = async function(){

}

//Função para retornar todos os filmes
const listarFilme = async function(){
    
    //Criando um clone do objeto JSON para manipular a sua estrutura local sem
    //modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        //Chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeDAO.selectAllFilme()
        //Validação para verificar se existe conteúdo do array
        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme = result

                return message.DEFAULT_MESSAGE //200 (Dados do filme)
            }
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (model)
    }
}

//Função para buscar um filme pelo ID
const buscarFilme = async function(id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (id == "" || id == null || id == undefined || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeDAO.selectByIdFilme(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme = result
                    
                    return message.DEFAULT_MESSAGE // 200
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
    
    // Função para excluir um filme
    const excluirFilme = async function(id){
    }
    
    module.exports = {
        inserirNovoFilme, 
        validarDados, 
        listarFilme, 
        buscarFilme,
        excluirFilme
    }