/*****************************************************************
 * Objetivo: Calculadora de média
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})  


entradaDeDados.question("Digite o nome do aluno: ", function(aluno){
    let nomeAluno = aluno

    entradaDeDados.question("Digite o sexo do aluno: (M para masculino e F para feminino)", function(generoAluno){
        let sexoAluno = generoAluno

        entradaDeDados.question("Digite o nome do(a) professor(a): ", function(professor){
            let nomeProfessor = professor

            entradaDeDados.question("Digite o sexo do(a) professor(a) (M para masculino e F para feminino): ", function(generoProfessor){
                let sexoProfessor = generoProfessor

                entradaDeDados.question("Digite o nome do curso: ", function(curso){
                    let nomeCurso = curso

                    entradaDeDados.question("Digite o nome da disciplina: ", function(disciplina){
                        let nomeDisciplina = disciplina

                        entradaDeDados.question("Digite a primeira nota de 0 a 100: ", function(nota1){
                            let primeiraNota = nota1

                            entradaDeDados.question("Digite a segunda nota de 0 a 100: ", function(nota2){
                                let segundaNota = nota2

                                entradaDeDados.question("Digite a terceira nota de 0 a 100: ", function(nota3){
                                    let terceiraNota = nota3

                                    entradaDeDados.question("Digite a quarta nota de 0 a 100: ", function(){
                                        let quartaNota = nota4
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})    