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

// IMPORT ADICIONADO: Controller da tabela intermediária filme_genero
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



//ENDPOINTS
// Rota para inserir um novo filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let conteType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados,conteType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function(request, response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/filme/:id", async function(request, response){
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

// Rota para listar todos os sexos
app.get('/v1/senai/locadora/sexo', async function(request, response){
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code).json(result)
})

// Rota para inserir um novo sexo
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    response.status(result.status_code).json(result)
})

// GET Gênero
app.get('/v1/senai/locadora/genero', async function(request, response){
    let result = await controllerGenero.listarGeneros()
    response.status(result.status_code).json(result)
})

// POST Gênero (CORRIGIDO: Agora chamando inserirNovoGenero)
app.post('/v1/senai/locadora/genero', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code).json(result)
})

// ENDPOINT: POST para fazer o vínculo na tabela intermediária filme_genero
app.post('/v1/senai/locadora/filme-genero', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFilmeGenero.inserirFilmeGenero(dados, contentType)
    response.status(result.status_code).json(result)
})

// GET Classificação
app.get('/v1/senai/locadora/classificacao', async function(request, response){
    let result = await controllerClassificacao.listarClassificacoes()
    response.status(result.status_code).json(result)
})

// BUSCAR PELO ID
app.get('/v1/senai/locadora/classificacao/:id', async function(request, response) {
    let idClassificacao = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(idClassificacao)
    
    response.status(result.status_code).json(result)
})

// POST Classificação
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    response.status(result.status_code).json(result)
})

// GET ator
app.get('/v1/senai/locadora/ator', async function(request, response){
    let result = await controllerAtor.listarAtores()
    
    response.status(result.status_code)
    response.json(result)
})

// POST ator
app.post('/v1/senai/locadora/ator', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerAtor.inserirNovoAtor(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

//Serve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições ...")
})