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
const listaDeNomes  =   ["José", "Maria", "João", "André", "Alex"]
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
}

//exibirDados()
manipularDados()