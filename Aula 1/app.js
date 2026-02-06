
//IMPRIME NO TERMINAL UM CONTEÚDO
console.log("Testando print do console")

//PERMITE CRIAR UMA VARIAVEL
var nome = "Thiago"

console.log(nome)

//FORMAS DE CONCATENAR VARIAVEIS E TEXTO
console.log("O nome do usúario é: " + nome)
console.log(`O nome do usúario é: ${nome}`)


//IMPORT DA BIBLIOTECA PARA CAPTAR ENTRADA DE DADOS VIA TERMINAL
var readline = require("readline")


//CRIA UMA INTERFACE PARA ENTRADA E SAÍDA DE DADOS PELO TERMINAL
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


//FUNÇÃO PARA RETORNAR O NOME DIGITADO NO TERMINAL
    //O MÉTODO QUESTION APÓS A DIGITAÇÃO CHAMA A SUA FUNÇÃO "CALL BACK"
    //PARA ENTREGAR O QUE FOI DIGITADO NO TERMINAL, ATRAVÉS DO ARGUMENTO
    //nomeUsuario
entradaDeDados.question("Favor digitar seu nome: ", function(nomeUsuario){
    //ENTRADA DE DADOS PARA O EMAIL
    entradaDeDados.question("Favor digitar seu email: ", function(emailUsuario){
        console.log("O nome do usuario é: " + nomeUsuario)
        console.log(`O email informado é ${emailUsuario}`)

    })
})