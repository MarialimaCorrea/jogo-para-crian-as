
const perguntas = [
    {
        pergunta: "Quanto é 125 + 75?",
        alternativas: ["180", "200", "210", "190"],
        correta: 1,
        assunto: "Adição"
    },
    {
        pergunta: "Qual é o resultado de 9 × 8?",
        alternativas: ["63", "81", "72", "64"],
        correta: 2,
        assunto: "Multiplicação"
    },
    {
        pergunta: "Quanto é 144 ÷ 12?",
        alternativas: ["10", "12", "14", "16"],
        correta: 1,
        assunto: "Divisão"
    },
    {
        pergunta: "Qual é o resultado de 250 - 85?",
        alternativas: ["165", "175", "155", "185"],
        correta: 0,
        assunto: "Subtração"
    },
    {
        pergunta: "Qual fração representa a metade de um inteiro?",
        alternativas: ["1/3", "1/4", "2/3", "1/2"],
        correta: 3,
        assunto: "Frações"
    },
    {
        pergunta: "Qual é o resultado de 2,5 + 1,5?",
        alternativas: ["3", "4", "4,5", "5"],
        correta: 1,
        assunto: "Números decimais"
    },
    {
        pergunta: "Quantos lados possui um hexágono?",
        alternativas: ["5", "6", "7", "8"],
        correta: 1,
        assunto: "Geometria"
    },
    {
        pergunta: "Quantos centímetros existem em 2 metros?",
        alternativas: ["20 cm", "200 cm", "100 cm", "2000 cm"],
        correta: 1,
        assunto: "Medidas"
    },
    {
        pergunta: "Qual é o perímetro de um quadrado com lados de 5 cm?",
        alternativas: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correta: 2,
        assunto: "Geometria"
    },
    {
        pergunta: "Quanto é 3/4 de 20?",
        alternativas: ["10", "12", "15", "18"],
        correta: 2,
        assunto: "Frações"
    }
];

// Elementos das telas
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

// Elementos do jogo
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const pontuacaoElemento = document.getElementById("pontuacao");
const numeroPergunta = document.getElementById("numero-pergunta");
const nivelElemento = document.getElementById("nivel");
const feedbackElemento = document.getElementById("feedback");
const barraProgresso = document.getElementById("barra-progresso");
const botaoProxima = document.getElementById("botao-proxima");

// Variáveis do jogo
let perguntaAtual = 0;
let pontuacao = 0;
let respondida = false;

// Iniciar o jogo
document.getElementById("botao-iniciar").addEventListener("click", iniciarJogo);

function iniciarJogo() {
    perguntaAtual = 0;
    pontuacao = 0;

    telaInicial.classList.add("escondido");
    telaFinal.classList.add("escondido");
    telaJogo.classList.remove("escondido");

    mostrarPergunta();
}

// Mostrar perguntas
function mostrarPergunta() {

    respondida = false;

    const questao = perguntas[perguntaAtual];

    perguntaElemento.textContent = questao.pergunta;

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pontuacaoElemento.textContent = `⭐ ${pontuacao} pontos`;

    // Cada nível possui aproximadamente 4 perguntas
    const nivel = Math.floor(perguntaAtual / 4) + 1;
    nivelElemento.textContent = `Nível ${nivel}`;

    // Atualizar barra de progresso
    const progresso =
        (perguntaAtual / perguntas.length) * 100;

    barraProgresso.style.width = `${progresso}%`;

    // Limpar alternativas anteriores
    alternativasElemento.innerHTML = "";

    feedbackElemento.textContent = "";

    botaoProxima.classList.add("escondido");

    // Criar os botões das alternativas
    questao.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);

    });
}

// Verificar resposta
function verificarResposta(indice, botaoSelecionado) {

    if (respondida) return;

    respondida = true;

    const questao = perguntas[perguntaAtual];

    const botoes = document.querySelectorAll(".alternativa");

    // Desabilitar todas as alternativas
    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === questao.correta) {

        pontuacao += 10;

        botaoSelecionado.classList.add("correta");

        feedbackElemento.textContent =
            "🎉 Parabéns! Você acertou! +10 pontos";

        feedbackElemento.style.color = "#32b879";

    } else {

        botaoSelecionado.classList.add("errada");

        // Mostrar qual era a alternativa correta
        botoes[questao.correta].classList.add("correta");

        feedbackElemento.textContent =
            `❌ Não foi dessa vez! A resposta correta era ${questao.alternativas[questao.correta]}.`;

        feedbackElemento.style.color = "#ed6464";
    }

    pontuacaoElemento.textContent = `⭐ ${pontuacao} pontos`;

    botaoProxima.classList.remove("escondido");

    if (perguntaAtual === perguntas.length - 1) {
        botaoProxima.textContent = "Ver resultado";
    } else {
        botaoProxima.textContent = "Próxima pergunta";
    }

}

// Avançar para próxima pergunta
botaoProxima.addEventListener("click", () => {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }

});

// Mostrar resultado final
function finalizarJogo() {

    telaJogo.classList.add("escondido");
    telaFinal.classList.remove("escondido");

    const resultado = document.getElementById("resultado");
    const mensagem = document.getElementById("mensagem-final");

    resultado.textContent =
        `Você conquistou ${pontuacao} de 100 pontos!`;

    if (pontuacao === 100) {

        mensagem.textContent =
            "🏆 Incrível! Você acertou todas as questões!";

    } else if (pontuacao >= 70) {

        mensagem.textContent =
            "🌟 Muito bem! Você tem ótimos conhecimentos matemáticos!";

    } else if (pontuacao >= 40) {

        mensagem.textContent =
            "👏 Bom trabalho! Continue praticando para melhorar!";

    } else {

        mensagem.textContent =
            "💪 Não desista! Estude e tente novamente!";

    }

    barraProgresso.style.width = "100%";

}

// Reiniciar o jogo
document.getElementById("botao-reiniciar").addEventListener("click", iniciarJogo);
