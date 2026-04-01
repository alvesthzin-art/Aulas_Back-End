/*****************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Thiago
 * Versão: 1.0
 * 
 * Instalação do EXPRESS - npm intall express --save
 *      Dependencia responsavel pela utilização do protocolo HTTP para
 *      criar uma API     
 * 
 * Instalação do CORS    - npm install cors --save
 *      Dependencia responsavel pelas configurações a serem realizadas
 *      para a permissão de acesso da API
 * 
 *****************************************************************************************************/

//Import das dependencias para criar a API
const express = require("express")
const cors    = require("cors")

//Criando um objeto para manipular o express
const app = express()

//Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: "*", //A origem da requisição, podendo ser um IP ou *(Todos)
    methods: ["GET", "POST", "PUT", "DELETE"], //São os verbos que serão liberados na API
    allowedHeaders: ["Content-type", "Authorization"] //São permissões de cabeçalho do CORS
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))

//Response -> Retornos da API
//Request  -> São chegadas de dados na API    

//Import das funções
const estadosCidades = require("./modulo/funcoes.js")

//Import do arquivo de dados
const arquivo = require("./modulo/arquivo.js")

//Criando EndPoints para a API
app.get("/v1/senai/estados", function(request, response){
    
    //Chama a função que retorna a lista de estados passando o arquivo de dados
    let estados = estadosCidades.listaEstados(arquivo.listaDeEstados.estados)
    response.status(200).json(estados)
})

app.get("/v1/senai/dados/estado/:uf", function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(arquivo.listaDeEstados.estados,sigla)

    response.json(estado)
    response.status(200)
})

app.get("/cidades", function(request, response){
    response.status(200).json({"message": "Testando minha API de Cidades"})
})

//Serve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições ...")
})