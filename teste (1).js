/*****************************************************************
 * Arquivo: teste.js
 * Objetivo: Testes automatizados dos Exercícios 4 ao 8
 * Autor: Thiago
 *****************************************************************/

const calculo      = require("./EXERCICIO 4/modulos/calculo")
const tratativas   = require("./EXERCICIO 4/modulos/tratativas")
const calculoMedia = require("./EXERCICIO 5/modulos/calculoMedia")
const tabuada      = require("./EXERCICIO 6/modulos/tabuada")
const fatorial     = require("./EXERCICIO 7/modulos/calcularFatorial")
const parImpar     = require("./EXERCICIO 8/modulos/parImpar")

// ─── Utilitários de teste ────────────────────────────────────────────────────

let totalTestes = 0
let totalPassou  = 0
let totalFalhou  = 0

function teste(descricao, valorRecebido, valorEsperado) {
    totalTestes++
    const passou = JSON.stringify(valorRecebido) === JSON.stringify(valorEsperado)
    if (passou) {
        totalPassou++
        console.log(`  ✅ ${descricao}`)
    } else {
        totalFalhou++
        console.log(`  ❌ ${descricao}`)
        console.log(`       Esperado : ${JSON.stringify(valorEsperado)}`)
        console.log(`       Recebido : ${JSON.stringify(valorRecebido)}`)
    }
}

function secao(titulo) {
    console.log(`\n${"═".repeat(60)}`)
    console.log(`  ${titulo}`)
    console.log("═".repeat(60))
}

// ─── EXERCÍCIO 4 — IMC ───────────────────────────────────────────────────────

secao("EXERCÍCIO 4 — calculo.js: calcularImc()")

teste(
    "IMC normal (80kg / 1.75m) → 26.12",
    parseFloat(calculo.calcularImc("1.75", "80").toFixed(2)),
    26.12
)
teste(
    "IMC com vírgula (80kg / 1,75m) → 26.12",
    parseFloat(calculo.calcularImc("1,75", "80").toFixed(2)),
    26.12
)
teste(
    "IMC abaixo do peso (50kg / 1.75m) → 16.33",
    parseFloat(calculo.calcularImc("1.75", "50").toFixed(2)),
    16.33
)

secao("EXERCÍCIO 4 — calculo.js: classificacao()")

teste("IMC 16   → Abaixo do peso",               calculo.classificacao(16),   "Abaixo do peso")
teste("IMC 18.5 → Peso normal",                  calculo.classificacao(18.5), "Peso normal")
teste("IMC 22   → Peso normal",                  calculo.classificacao(22),   "Peso normal")
teste("IMC 24.9 → Peso normal",                  calculo.classificacao(24.9), "Peso normal")
teste("IMC 27   → Acima do peso (Sobrepeso)",    calculo.classificacao(27),   "Acima do peso (Sobrepeso)")
teste("IMC 32   → Obesidade 1",                  calculo.classificacao(32),   "Obesidade 1")
teste("IMC 37   → Obesidade 2",                  calculo.classificacao(37),   "Obesidade 2")
teste("IMC 42   → Obesidade 3",                  calculo.classificacao(42),   "Obesidade 3")

secao("EXERCÍCIO 4 — tratativas.js: validando()")

teste("Nome válido, altura e peso OK        → true",  tratativas.validando("Thiago", "1.75", "80"),  true)
teste("Nome com vírgula na altura           → true",  tratativas.validando("Thiago", "1,75", "80"),  true)
teste("Nome vazio                           → false", tratativas.validando("", "1.75", "80"),         false)
teste("Nome numérico                        → false", tratativas.validando("123", "1.75", "80"),      false)
teste("Altura vazia                         → false", tratativas.validando("Thiago", "", "80"),       false)
teste("Altura com texto                     → false", tratativas.validando("Thiago", "abc", "80"),    false)
teste("Altura negativa                      → false", tratativas.validando("Thiago", "-1.75", "80"),  false)
teste("Altura zero                          → false", tratativas.validando("Thiago", "0", "80"),      false)
teste("Peso vazio                           → false", tratativas.validando("Thiago", "1.75", ""),     false)
teste("Peso com texto                       → false", tratativas.validando("Thiago", "1.75", "abc"),  false)
teste("Peso negativo                        → false", tratativas.validando("Thiago", "1.75", "-5"),   false)
teste("Peso zero                            → false", tratativas.validando("Thiago", "1.75", "0"),    false)

// ─── EXERCÍCIO 5 — MÉDIA ─────────────────────────────────────────────────────

secao("EXERCÍCIO 5 — calculoMedia.js: validarDados()")

const dadosValidos = { aluno:"Ana", sexoA:"F", professor:"Carlos", sexoP:"M", curso:"Info", disciplina:"Mat", n1:"80", n2:"70", n3:"90", n4:"60" }

teste("Dados válidos                        → true",  calculoMedia.validarDados(dadosValidos), true)
teste("Campo vazio (aluno)                  → erro",  calculoMedia.validarDados({...dadosValidos, aluno: ""}), "vazio")
teste("Nota com texto                       → erro",  calculoMedia.validarDados({...dadosValidos, n1: "abc"}), "nao_numero")
teste("Nota acima de 100                    → erro",  calculoMedia.validarDados({...dadosValidos, n2: "150"}), "intervalo")
teste("Nota negativa                        → erro",  calculoMedia.validarDados({...dadosValidos, n3: "-1"}), "intervalo")

secao("EXERCÍCIO 5 — calculoMedia.js: calcularMedia()")

teste("Média de 80, 70, 90, 60             → 75",    calculoMedia.calcularMedia("80","70","90","60"), 75)
teste("Média de 30, 40, 20, 50             → 35",    calculoMedia.calcularMedia("30","40","20","50"), 35)
teste("Média de 55, 60, 50, 65             → 57.5",  calculoMedia.calcularMedia("55","60","50","65"), 57.5)
teste("Média de 100, 100, 100, 100         → 100",   calculoMedia.calcularMedia("100","100","100","100"), 100)
teste("Média de 0, 0, 0, 0                 → 0",     calculoMedia.calcularMedia("0","0","0","0"), 0)

// ─── EXERCÍCIO 6 — TABUADA ───────────────────────────────────────────────────

secao("EXERCÍCIO 6 — tabuada.js: validarDados()")

// Suprime os console.log de erro durante os testes de validação
const logOriginal = console.log
const silenciar = () => { console.log = () => {} }
const restaurar = () => { console.log = logOriginal }

silenciar()
teste("Dados válidos (2,4,1,5)             → true",  tabuada.validarDados("2","4","1","5"),     true)
teste("Campo vazio                          → false", tabuada.validarDados("","4","1","5"),       false)
teste("Entrada com texto                    → false", tabuada.validarDados("abc","4","1","5"),    false)
teste("Tabuada abaixo de 2                  → false", tabuada.validarDados("1","4","1","5"),      false)
teste("Tabuada acima de 100                 → false", tabuada.validarDados("2","101","1","5"),    false)
teste("Contador abaixo de 1                 → false", tabuada.validarDados("2","4","0","5"),      false)
teste("Contador acima de 50                 → false", tabuada.validarDados("2","4","1","51"),     false)
teste("Tabuada final < inicial              → false", tabuada.validarDados("5","2","1","5"),      false)
teste("Contador final < inicial             → false", tabuada.validarDados("2","4","5","1"),      false)
restaurar()

secao("EXERCÍCIO 6 — tabuada.js: gerarTabuada() (verificação de saída)")

// Captura o output de gerarTabuada para verificar
let outputCapturado = []
console.log = (...args) => outputCapturado.push(args.join(" "))

tabuada.gerarTabuada("2", "2", "1", "3")
console.log = logOriginal

teste("Tabuada do 2 x 1 = 2",  outputCapturado.includes("2 x 1 = 2"),   true)
teste("Tabuada do 2 x 2 = 4",  outputCapturado.includes("2 x 2 = 4"),   true)
teste("Tabuada do 2 x 3 = 6",  outputCapturado.includes("2 x 3 = 6"),   true)
teste("Não gera 2 x 4",         outputCapturado.includes("2 x 4 = 8"),   false)

// ─── EXERCÍCIO 7 — FATORIAL ──────────────────────────────────────────────────

secao("EXERCÍCIO 7 — calcularFatorial.js: calcularFatorial()")

const { calcularFatorial } = fatorial

teste("Fatorial de 1  → 1x = 1",            calcularFatorial("1"),   "Fatorial de 1 é 1 = 1")
teste("Fatorial de 5  → 5x4x3x2x1 = 120",  calcularFatorial("5"),   "Fatorial de 5 é 5x4x3x2x1 = 120")
teste("Fatorial de 3  → 3x2x1 = 6",        calcularFatorial("3"),   "Fatorial de 3 é 3x2x1 = 6")
teste("Fatorial de 10 → resultado correto", calcularFatorial("10"),  "Fatorial de 10 é 10x9x8x7x6x5x4x3x2x1 = 3628800")
teste("Entrada vazia                → ERRO", calcularFatorial("").startsWith("ERRO"),   true)
teste("Texto 'abc'                  → ERRO", calcularFatorial("abc").startsWith("ERRO"), true)
teste("Número negativo (-3)         → ERRO", calcularFatorial("-3").startsWith("ERRO"),  true)
teste("Fatorial de 0                → ERRO", calcularFatorial("0").startsWith("ERRO"),   true)
teste("Decimal (3.5)                → ERRO", calcularFatorial("3.5").startsWith("ERRO"), true)
teste("Número muito grande (1000)   → ERRO", calcularFatorial("1000").startsWith("ERRO"),true)
teste("Limite máximo (170)          → OK",   calcularFatorial("170").startsWith("Fatorial de 170"), true)

// ─── EXERCÍCIO 8 — PAR/ÍMPAR ─────────────────────────────────────────────────

secao("EXERCÍCIO 8 — parImpar.js: gerenciarNumeros()")

const { gerenciarNumeros } = parImpar

const res1 = gerenciarNumeros("0", "100")
teste("Intervalo 0–100: primeiro par é 0",         res1.pares[0],    0)
teste("Intervalo 0–100: último par é 100",          res1.pares[res1.pares.length - 1], 100)
teste("Intervalo 0–100: quantidade de pares → 51",  res1.pares.length, 51)
teste("Intervalo 0–100: primeiro ímpar é 1",        res1.impares[0],  1)
teste("Intervalo 0–100: último ímpar é 99",         res1.impares[res1.impares.length - 1], 99)
teste("Intervalo 0–100: quantidade de ímpares → 50",res1.impares.length, 50)

teste("Entrada vazia                    → erro",  gerenciarNumeros("","100").erro !== undefined,   true)
teste("Texto na entrada                 → erro",  gerenciarNumeros("abc","100").erro !== undefined, true)
teste("Inicial > 500                    → erro",  gerenciarNumeros("501","600").erro !== undefined, true)
teste("Final < 100                      → erro",  gerenciarNumeros("0","50").erro !== undefined,    true)
teste("Final > 1000                     → erro",  gerenciarNumeros("0","1001").erro !== undefined,  true)
teste("Inicial >= Final                 → erro",  gerenciarNumeros("200","150").erro !== undefined, true)
teste("Inicial igual ao final           → erro",  gerenciarNumeros("100","100").erro !== undefined, true)

// ─── RESULTADO FINAL ─────────────────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`)
console.log(`  RESULTADO FINAL`)
console.log("═".repeat(60))
console.log(`  Total de testes : ${totalTestes}`)
console.log(`  ✅ Passaram      : ${totalPassou}`)
console.log(`  ❌ Falharam      : ${totalFalhou}`)
console.log("═".repeat(60))

if (totalFalhou === 0) {
    console.log("\n  🎉 Todos os testes passaram!\n")
} else {
    console.log(`\n  ⚠️  ${totalFalhou} teste(s) falharam. Revise os módulos indicados.\n`)
    process.exit(1)
}
