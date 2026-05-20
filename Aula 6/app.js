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
    origin: "*", //A origem da requisição, podendo ser um IP ou *(Todos)
    methods: "GET, POST, PUT, DELETE, OPTIONS", //São os verbos que serão liberados na API
    allowedHeaders: ["Content-type", "Authorization"] //São permissões de cabeçalho do CORS
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))



//ENDPOINTS
// Rota para inserir um novo filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async (request, response) => {
    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']// linha adicionada para receber o content-type do header da requisição

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
    //Recebe o id via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    //Recebe o contenty type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados enviados no corpo da requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminha os dados, id e content-type
    //obedecendo a ordem de criação na função da controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para deletar um filme pelo ID
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

// POST Gênero
app.post('/v1/senai/locadora/genero', bodyParserJSON, async (request, response) => {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
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
    response.status(result.status_code).json(result)
})



//Serve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições ...")
})