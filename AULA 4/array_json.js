/***************************************************************************************** 
 * Objetivo: Manipular dados utilizando Array e JSON
 * Data: 05/03/2026
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************/

/*
    [ ] -> Representa um objeto do tipo ARRAY
    { } -> Representa um objeto do tipo JSON 

    Array -> É um objeto na memória que permite trabalhar com vários valores
        em um único objeto

        let nome     =      "José"
        let nome2   =     "Maria"
        let nome3    =     "João"
        
                indice      0        1        2   
        let nome    =    ["José", "Maria", "João"]        

    JSON -> É um objeto na memória que permite trabalhar com CHAVE E VALOR
    
        let nome        = "José"
        let telefone    = "123456789"
        let email       = "jose@gmail.com"

        let cliente = { "nome": "José",
                        "telefone": "123456789",
                        "email": "jose@gmail.com"
                        }

*/

//Formas de criar um ARRAY
const listaDeNomes  =   ["José", "Maria", "João", "André", "Alex", "Carlos", "Ana", "Bruna", "Jake", "José", "José da Silva"]
const listaDeClientes =  []
const listaDeFornecedores = []

const exibirDados = function(){
    //Exibe o objeto array e seu conteudo
    console.log(listaDeNomes)

    //Exibe um objeto ARRAY em formato de tabela com seus indices
    console.table(listaDeNomes)
    //
    console.log(listaDeNomes[1])
    //
    console.log(typeof(listaDeNomes[4]))




    //Estruturas de Repetição
    //While
    console.log("********** WHILE **********")
    let cont = 0
    while(cont < listaDeNomes.length){
        console.log(`O nome do cliente é: ${listaDeNomes[cont]}`)
        cont+=1
    }

    console.log("********** FOR **********")
    for(let contador = 0; contador < listaDeNomes.length; contador++){
        console.log(`O nome do cliente é: ${listaDeNomes[contador]}`)
    }

    //Retorna o conteúdo de cada elemento através de uma CALL BACK
    console.log("********** FOR EACH **********")
    listaDeNomes.forEach(function(cliente){
        console.log(`O nome do cliente é: ${cliente}`)
    })

    //Retorna o indice do elemento, e sera preciso colocar dentro do objeto do ARRAY
    //Ex: listaDeNomes[item]
    //Praticamente igual ao FOR e WHILE
    console.log("********** FOR IN **********")
    for(item in listaDeNomes){
        console.log(`O nome do cliente é: ${listaDeNomes[item]}`)
    }

    //Percorre o ARRAY e retorna somente o conteúdo de cada indice, sendo muito parecido
    //com o ForEach
    console.log("********** FOR OF **********")
    for (cliente of listaDeNomes){
        console.log(`O nome do cliente é: ${cliente}`)
    }


    console.log(listaDeNomes.length)

}

const manipularDados = function(){
    //Adicionando valores novos no ARRAY através de indices 
    listaDeClientes[0] = "José da Silva"
    listaDeClientes[1] = "Maria da Silva"
    listaDeClientes[2] = "João da Silva"

    console.log(listaDeClientes)

    //Permite adicionar novos valores no ARRAY, sempre no final da lista
    listaDeFornecedores.push("Luiz da Silva")
    listaDeFornecedores.push("Zezinho da Silva")
    listaDeFornecedores.push("Huguinho da Silva")
    listaDeFornecedores.push("Luizinho da Silva", "André da Silva", "Carlos da Silva")
    

    console.log(listaDeFornecedores)

    //Permite adicionar novos elementos no array sempre no INICIO da lista
    listaDeFornecedores.unshift("Ana Carolina")
    console.table(listaDeFornecedores)

    //Permite remover elementos do FINAL da lista
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover elementos do INICIO da lista
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)

    //Permite remover um elemento baseado no indice da lista
                        // splice(indice, qtde de elementos)
    listaDeFornecedores.splice(2,1)
    console.table(listaDeFornecedores)

    //Splice() -> Permite adicionar um novo elemento em um determinadp lugar do array (indice)
                            //Indice, 0 -> Significa que não sera removido ninguem, Novo conteudo
    listaDeFornecedores.splice(2,0, "Carlos da Silva")
    console.table(listaDeFornecedores)

    //Substitui o indice informado e adiciona outro conteudo
    listaDeFornecedores[1] = "novo conteudo"
    console.table(listaDeFornecedores)
}   

const removerItem = function(nome){

    //Retorna o indice de um elemento fazendo a busca pelo valor
    let indice = listaDeNomes.indexOf(nome)
    if(indice != 1){
        listaDeNomes.splice(indice,1)
        return true
    }else{
        return false
    }

    // for(indice in listaDeNomes){
    //     if(listaDeNomes[indice] == nome){
    //         listaDeNomes.splice(indice,1)
    //     }
    // }

}

const verificarItem = function(nome){
    //Verifica a exixtencia de um conteudo dentro de uma lista (true/false)
    return listaDeNomes.includes(nome)
}

const quantidadeItens = function(nome){
    let cont = 0
    listaDeNomes.forEach(function(item){
        if(String(item).toUpperCase() == String(nome).toUpperCase())
            cont +=1
    })
    return cont
}
//JSON é baseado em chave e valor
const criandoDadosJSON = function(){
    let aluno = {   "nome": "josé", 
                    "ra": 123456, 
                    "telefone": "9757574414", 
                    "email": "jose@gmail.com"
                }

                //Exibindo o objeto JSON completo
                console.log(aluno)
                console.table(aluno)

                //Exibindo apenas um atributo do JSON
                console.log(aluno.nome)
                console.log(aluno.email)

                //Adicionando um novo atributo no JSON
                aluno.sexo = "Masculino"
                console.log(aluno)

                //Remove um atributo do JSON
                delete aluno.telefoneconsole
                console.log(aluno)
}

const cadastroDeProdutos = function(){
    let cores = [
        {"id": 1, "cor": "Branco"}, //indice 0
        {"id": 2, "cor":"Preto"}, //indice 1
        {"id": 3, "cor":"Azul"}, //indice 2
        {"id": 4, "cor":"Rosa"}, //indice 3
        {"id": 5, "cor":"Cinza"} //indice 4

    ]

    let marcas = [
        {"id": 1, "marca": "LG", "telefone": "123456789", "email": "lg@lg.com.br"},
        {"id": 2, "marca": "Dell", "telefone": "123463789", "email": "contato@lg.com.br"},
        {"id": 3, "marca": "Lenovo", "telefone": "128556789", "email": "contato@lg.com.br"},
        {"id": 4, "marca": "Apple", "telefone": "123453289", "email": "contato@lg.com.br"},
        {"id": 5, "marca": "Razer", "telefone": "123456149", "email": "contato@lg.com.br"},
        {"id": 6, "marca": "Logitech", "telefone": "123786789", "email": "contato@lg.com.br"},
        {"id": 7, "marca": "Multilaser", "telefone": "123226789", "email": "contato@lg.com.br"}
    ]

    let produtos = [
        {
            "id": 1,
            "nome": "Monitor",
            "descricao": "27 polegadas",
            "marca": [marcas[1].marca], 
            "qtde": 20,
            "cor": [cores[4], cores[1]],
            "valor": 800.50
        }, 
        {
            "id": 2,
            "nome": "Teclado",
            "descricao": "teclado mecanico RGB",
            "marca": [marcas[5].marca],
            "qtde": 200,
            "cor": [cores[1]], // CORREÇÃO 1: Adicionado []
            "valor": 150   
        },
        {
            "id": 3,
            "nome": "Mouse",
            "descricao": "Mouseu sem fio",
            "marca": [
                marcas[0].marca,
                marcas[1].marca,
                marcas[5].marca
            ],
            "qtde": 500,
            "cor": [
                cores[0],
                cores[1],
                cores[4], // CORREÇÃO 2: Mudado de 5 para 4
            ],
            "valor": 80
        } 
    ]
    
   


    // console.log(cores)
    // console.table(cores)

    // console.log(cores[2])

    // console.log(produtos)
    // console.log(produtos[0].cor)
    // console.log(produtos[0].cor[1].cor)

    console.table(produtos)

    // produtos[0].cor.forEach(function(nomeCor){
    //     console.log("A cor do produto é " + nomeCor.cor)
    // })

    //Percorre o objeto de produto para trazer os dados de cada produto
    produtos.forEach(function(itemProduto){
        console.log(`Produto: ${itemProduto.nome}`)
    
    //Percorre o objeto de marca dentro de cada produto, para trazer as marcas    
    itemProduto.marca.forEach(function(itemMarca){
        console.log(`Marca: ${itemMarca}`)

    //Percorre o objeto de cor dentro de cada produto, para trazer as cores    
    itemProduto.cor.forEach(function(itemCor){
        console.log(`Cor: ${itemCor.cor}`)
    })

    })

    })


    //Pesquisando um produto pelo NOME
    console.log("Pesquisando produtos pelo nome")
    let nome = "Mouse"
    

    produtos.forEach(function(itemProduto){
        if(String(itemProduto.nome).toUpperCase() == String(nome).toUpperCase()){
            console.log(itemProduto)
        }
    })


    //Pesquisando um produto pela COR
    console.log("Pesquisando produtos pela cor")
    let cor = "verde"
    let status = false

    produtos.forEach(function(itemProduto){
        itemProduto.cor.forEach(function(itemCor){
            if(String(itemCor.cor).toUpperCase() == String(cor).toUpperCase()){
                console.log(itemProduto)
                status = true
            }
        })
    })

    if(!status)
        console.log("Item pesquisado não foi encontrado....")



    
}

cadastroDeProdutos()


    
//exibirDados()
//manipularDados()
// console.table(listaDeNomes)

// let resposta = removerItem("Alex")
// if(resposta)
//     console.log("Item removido com sucesso!")
// else
//     console.log("Não encontrado!")
// console.table(listaDeNomes)

// console.log(verificarItem("Maria"))

// console.log(quantidadeItens("José"))

// manipularDados()

// criandoDadosJSON()