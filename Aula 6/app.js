//Import das dependencias para criar a API
const express       = require("express")
const cors          = require("cors")
const bodyParser    = require('body-parser')

//Import das CONTROLLERS do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//Import da tabela de sexo
const controllerSexo = require('./controller/sexo/controller_sexo.js')

//Import da tabela de genero
const controllerGenero = require("./controller/genero/controller_genero.js")

//Import da tabela intermediária filme_genero
const controllerFilmeGenero = require('./controller/filme/controller_filme_genero.js')

//Import da tabela de classificação
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')

//Import da tabela de ator
const controllerAtor = require('./controller/ator/controller_ator.js')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

//Criando um objeto para manipular o express
const app = express()

//Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: ["Content-type", "Authorization"]
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))



/****************************************** FILME ******************************************/

// Inserir um novo filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let conteType = request.headers['content-type']
    let result = await controllerFilme.inserirNovoFilme(dados, conteType)
    response.status(result.status_code).json(result)
})

// Listar todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response){
    let result = await controllerFilme.listarFilme()
    response.status(result.status_code).json(result)
})

// Buscar filme pelo ID
app.get("/v1/senai/locadora/filme/:id", async function(request, response){
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)
    response.status(result.status_code).json(result)
})

// Atualizar filme pelo ID
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)
    response.status(result.status_code).json(result)
})

// Excluir filme pelo ID
app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)
    response.status(result.status_code).json(result)
})



/****************************************** SEXO ******************************************/

// Listar todos os sexos
app.get('/v1/senai/locadora/sexo', async function(request, response){
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code).json(result)
})

// Inserir um novo sexo
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    response.status(result.status_code).json(result)
})

// Excluir sexo pelo ID
app.delete('/v1/senai/locadora/sexo/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerSexo.excluirSexo(id)
    response.status(result.status_code).json(result)
})



/****************************************** GÊNERO ******************************************/

// Listar todos os gêneros
app.get('/v1/senai/locadora/genero', async function(request, response){
    let result = await controllerGenero.listarGeneros()
    response.status(result.status_code).json(result)
})

// Buscar gênero pelo ID
app.get('/v1/senai/locadora/genero/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code).json(result)
})

// Inserir um novo gênero
app.post('/v1/senai/locadora/genero', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code).json(result)
})

// Atualizar gênero pelo ID
app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)
    response.status(result.status_code).json(result)
})

// Excluir gênero pelo ID
app.delete('/v1/senai/locadora/genero/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code).json(result)
})



/****************************************** FILME-GÊNERO ******************************************/

// Vincular um gênero a um filme
app.post('/v1/senai/locadora/filme-genero', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFilmeGenero.inserirFilmeGenero(dados, contentType)
    response.status(result.status_code).json(result)
})

// Listar os gêneros de um filme específico
app.get('/v1/senai/locadora/filme-genero/:id_filme', async function(request, response){
    let idFilme = request.params.id_filme
    let result = await controllerFilmeGenero.listarGenerosPorFilme(idFilme)
    response.status(result.status_code).json(result)
})

// Deletar um gênero de um filme
app.delete('/v1/senai/locadora/filme-genero/:id_filme/:id_genero', async function(request, response){
    let idFilme = request.params.id_filme
    let idGenero = request.params.id_genero
    let result = await controllerFilmeGenero.excluirFilmeGenero(idFilme, idGenero)
    response.status(result.status_code).json(result)
})



/****************************************** CLASSIFICAÇÃO ******************************************/

// Listar todas as classificações
app.get('/v1/senai/locadora/classificacao', async function(request, response){
    let result = await controllerClassificacao.listarClassificacoes()
    response.status(result.status_code).json(result)
})

// Buscar classificação pelo ID
app.get('/v1/senai/locadora/classificacao/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code).json(result)
})

// Inserir uma nova classificação
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    response.status(result.status_code).json(result)
})



/****************************************** ATOR ******************************************/

// Listar todos os atores
app.get('/v1/senai/locadora/ator', async function(request, response){
    let result = await controllerAtor.listarAtores()
    response.status(result.status_code).json(result)
})

// Buscar ator pelo ID
app.get('/v1/senai/locadora/ator/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerAtor.buscarAtor(id)
    response.status(result.status_code).json(result)
})

// Inserir um novo ator
app.post('/v1/senai/locadora/ator', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerAtor.inserirNovoAtor(dados, contentType)
    response.status(result.status_code).json(result)
})



// Para inicializar a API
app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições ...")
})