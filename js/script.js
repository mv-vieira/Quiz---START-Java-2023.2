const perguntas = [
  {
    pergunta: "Qual é a capital da França?",
    respostas: [
      { opcao: "Londres", resposta: false },
      { opcao: "Madri", resposta: false },
      { opcao: "Paris", resposta: true },
      { opcao: "Roma", resposta: false },
    ],
  },
  {
    pergunta: "Quem escreveu a peça de teatro 'Romeu e Julieta'?",
    respostas: [
      { opcao: "Charles Dickens", resposta: false },
      { opcao: "William Shakespeare", resposta: true },
      { opcao: "Jane Austen", resposta: false },
      { opcao: "F. Scott Fitzgerald", resposta: false },
    ],
  },
  {
    pergunta: "Qual é o símbolo químico para o elemento ouro?",
    respostas: [
      { opcao: "Au", resposta: true },
      { opcao: "Ag", resposta: false },
      { opcao: "Fe", resposta: false },
      { opcao: "Hg", resposta: false },
    ],
  },
  {
    pergunta: "Quem foi o primeiro ser humano a viajar para o espaço?",
    respostas: [
      { opcao: "Neil Armstrong", resposta: true },
      { opcao: "Yuri Gagarin", resposta: false },
      { opcao: "John Glenn", resposta: false },
      { opcao: "Alan Shepard", resposta: false },
    ],
  },
  {
    pergunta: "Qual é o planeta mais próximo do Sol no nosso sistema solar?",
    respostas: [
      { opcao: "Vênus", resposta: false },
      { opcao: "Júpiter", resposta: false },
      { opcao: "Saturno", resposta: false },
      { opcao: "Marte", resposta: true },
    ],
  },
];

const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let i = 0;
let placar = 0;

function iniciarQuiz() {
  i = 0;
  placar = 0;

  nextBtn.innerHTML = "Avançar";
  mostrarPerguntas();
}

function mostrarPerguntas() {
  resetar();
  let perguntaAtual = perguntas[i];
  let perguntaNumero = i + 1;
  question.innerHTML = perguntaNumero + ". " + perguntaAtual.pergunta;

  perguntaAtual.respostas.forEach((resposta) => {
    const button = document.createElement("button");
    button.innerHTML = resposta.opcao;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (resposta.resposta) {
      button.dataset.resposta = resposta.resposta;
    }
    button.addEventListener("click", selecionarResposta);
  });
}

function resetar() {
  nextBtn.style.display = "none";

  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selecionarResposta(e) {
  const btnSelecionado = e.target;
  const isCorrect = btnSelecionado.dataset.resposta === "true";

  if (isCorrect) {
    btnSelecionado.classList.add("correct");
    placar++;
  } else {
    btnSelecionado.classList.add("incorrect");
  }

  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.resposta === "true") {
      btnSelecionado.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function mostrarPlacar() {
  resetar();
  question.innerHTML = `Você acertou ${placar} de ${perguntas.length} perguntas!`;
  nextBtn.innerHTML = "Iniciar novamente";
  nextBtn.style.display = "block";
}

function avancarBotao() {
  i++;
  if (i < perguntas.length) {
    mostrarPerguntas();
  } else {
    mostrarPlacar();
  }
}

nextBtn.addEventListener("click", () => {
  if (i < perguntas.length) {
    avancarBotao();
  } else {
    iniciarQuiz();
  }
});

iniciarQuiz();
