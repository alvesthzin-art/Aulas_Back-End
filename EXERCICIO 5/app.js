/*****************************************************************
 * Objetivo: Calculadora de média
 * Data: 27/02/2026
 * Autor: Thiago 
 *****************************************************************/
var readline = require("readline")
const { validarDados, calcularMedia, gerarRelatorio } = require("./modulos/calculoMedia")

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question("Nome do aluno: ", function(aluno){
    entradaDeDados.question("Sexo Aluno (M/F): ", function(sexoA){
        entradaDeDados.question("Nome do professor: ", function(professor){
            entradaDeDados.question("Sexo Professor (M/F): ", function(sexoP){
                entradaDeDados.question("Curso: ", function(curso){
                    entradaDeDados.question("Disciplina: ", function(disciplina){
                        entradaDeDados.question("Nota 1: ", function(n1){
                            entradaDeDados.question("Nota 2: ", function(n2){
                                entradaDeDados.question("Nota 3: ", function(n3){
                                    entradaDeDados.question("Nota 4: ", function(n4){
                                        
                                        const dados = { aluno, sexoA, professor, sexoP, curso, disciplina, n1, n2, n3, n4 }
                                        const validacao = validarDados(dados)

                                        if (validacao !== true) {
                                            console.log(`ERRO: Verifique se preencheu tudo corretamente (Notas 0-100).`)
                                            entradaDeDados.close()
                                            return
                                        }

                                        let media = calcularMedia(n1, n2, n3, n4)
                                        
                                        if (media >= 70) {
                                            gerarRelatorio(dados, media, "APROVADO(A)")
                                            entradaDeDados.close()
                                        } else if (media < 50) {
                                            gerarRelatorio(dados, media, "REPROVADO(A)")
                                            entradaDeDados.close()
                                        } else {
                                            // LÓGICA DE EXAME
                                            console.log(`\nMédia ${media.toFixed(1)}: Aluno em EXAME.`)
                                            entradaDeDados.question("Digite a nota do exame: ", function(notaExame){
                                                
                                                // BUG CORRIGIDO: validar nota do exame
                                                let ne = Number(notaExame)
                                                if (notaExame === "" || isNaN(ne) || ne < 0 || ne > 100) {
                                                    console.log("ERRO: Nota do exame inválida! Digite um número entre 0 e 100.")
                                                    entradaDeDados.close()
                                                    return
                                                }

                                                let mediaExame = (media + ne) / 2
                                                let statusExame = mediaExame >= 60 ? "APROVADO(A) NO EXAME" : "REPROVADO(A) NO EXAME"
                                                
                                                gerarRelatorio(dados, media, statusExame, notaExame, mediaExame)
                                                entradaDeDados.close()
                                            })
                                        }
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
