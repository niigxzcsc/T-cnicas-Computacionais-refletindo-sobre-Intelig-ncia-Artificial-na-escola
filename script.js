function analisarResposta() {
  const campo = document.getElementById("respostaIA");
  const resultado = document.getElementById("resultado");

  if (!campo || !resultado) return;

  if (!campo.value.trim()) {
    resultado.classList.remove("escondido");
    resultado.textContent = "Escreva uma resposta para começar a análise.";
    return;
  }

  resultado.classList.remove("escondido");
  resultado.replaceChildren();

  const titulo = document.createElement("h3");
  titulo.textContent = "🔎 Investigue esta resposta!";
  resultado.appendChild(titulo);

  const perguntas = [
    "Consigo confirmar a informação em fontes confiáveis?",
    "A resposta apresenta evidências?",
    "Existem possíveis erros ou informações inventadas?",
    "Consigo explicar o conteúdo com minhas próprias palavras?"
  ];

  const lista = document.createElement("ul");

  perguntas.forEach((pergunta) => {
    const item = document.createElement("li");
    item.textContent = pergunta;
    lista.appendChild(item);
  });

  resultado.appendChild(lista);

  const aviso = document.createElement("p");
  aviso.textContent =
    "Importante: esta atividade ajuda você a refletir, mas não verifica automaticamente a veracidade do texto.";
  resultado.appendChild(aviso);
}

const perguntasQuiz = [
  {
    pergunta: "A inteligência artificial pode cometer erros?",
    opcoes: [
      "Não, ela sempre acerta.",
      "Sim, suas respostas precisam ser verificadas.",
      "Não, porque ela é um computador."
    ],
    correta: 1,
    explicacao: "A IA pode produzir informações incorretas ou incompletas."
  },
  {
    pergunta: "Qual é a atitude mais responsável ao usar IA?",
    opcoes: [
      "Copiar tudo sem ler.",
      "Compartilhar senhas com a ferramenta.",
      "Conferir as informações e compreender o conteúdo."
    ],
    correta: 2,
    explicacao: "O uso responsável envolve verificação, compreensão e privacidade."
  },
  {
    pergunta: "O que devemos fazer com dados pessoais?",
    opcoes: [
      "Evitar compartilhá-los sem necessidade.",
      "Publicá-los em qualquer ferramenta.",
      "Enviar nossas senhas para facilitar as pesquisas."
    ],
    correta: 0,
    explicacao: "Proteger os dados pessoais é essencial na internet."
  },
  {
    pergunta: "A IA deve substituir nosso pensamento crítico?",
    opcoes: [
      "Sim, devemos aceitar tudo.",
      "Sim, ela sempre sabe mais.",
      "Não, devemos analisar e questionar as respostas."
    ],
    correta: 2,
    explicacao: "A IA pode ajudar, mas precisamos pensar e tomar decisões conscientes."
  }
];

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const area = document.getElementById("quiz");
  if (!area) return;

  area.replaceChildren();

  if (perguntaAtual >= perguntasQuiz.length) {
    const titulo = document.createElement("h3");
    titulo.textContent = "🎉 Quiz concluído!";
    area.appendChild(titulo);

    const texto = document.createElement("p");
    texto.textContent =
      `Você acertou ${pontuacao} de ${perguntasQuiz.length} perguntas.`;
    area.appendChild(texto);

    const mensagem = document.createElement("p");
    mensagem.textContent = pontuacao === perguntasQuiz.length
      ? "Excelente! Você demonstrou conhecimento sobre o uso consciente da IA."
      : "Continue aprendendo! Revise as dicas e tente novamente.";
    area.appendChild(mensagem);

    const reiniciar = document.createElement("button");
    reiniciar.className = "botao";
    reiniciar.textContent = "Tentar novamente";
    reiniciar.addEventListener("click", iniciarQuiz);
    area.appendChild(reiniciar);
    return;
  }

  const item = perguntasQuiz[perguntaAtual];

  const progresso = document.createElement("p");
  progresso.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;
  area.appendChild(progresso);

  const titulo = document.createElement("h3");
  titulo.textContent = item.pergunta;
  area.appendChild(titulo);

  const formulario = document.createElement("div");

  item.opcoes.forEach((opcao, indice) => {
    const label = document.createElement("label");
    label.className = "opcao";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "respostaQuiz";
    radio.value = indice;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(opcao));
    formulario.appendChild(label);
  });

  area.appendChild(formulario);

  const feedback = document.createElement("p");
  feedback.className = "resultado escondido";
  area.appendChild(feedback);

  const botao = document.createElement("button");
  botao.className = "botao";
  botao.textContent = "Responder";
  area.appendChild(botao);

  botao.addEventListener("click", () => {
    const selecionada = area.querySelector(
      'input[name="respostaQuiz"]:checked'
    );

    if (!selecionada) {
      feedback.textContent = "Escolha uma alternativa antes de continuar.";
      feedback.classList.remove("escondido");
      return;
    }

    const acertou = Number(selecionada.value) === item.correta;

    if (acertou) pontuacao++;

    feedback.textContent =
      (acertou ? "✅ Correto! " : "💡 Vamos aprender: ") + item.explicacao;

    feedback.classList.remove("escondido");
    botao.textContent = "Próxima pergunta";
    botao.onclick = () => {
      perguntaAtual++;
      mostrarPergunta();
    };
  });
}

function limparAnalise() {
  const campo = document.getElementById("respostaIA");
  const resultado = document.getElementById("resultado");

  if (campo) campo.value = "";

  if (resultado) {
    resultado.replaceChildren();
    resultado.classList.add("escondido");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const quiz = document.getElementById("quiz");

  if (quiz) iniciarQuiz();
});
