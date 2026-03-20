//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function TextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-PT'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMsgInicial() {
  TextoNaTela('h1', 'Jogo do número secreto!');
  TextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMsgInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let qtdElementosNaLista = listaNumerosSorteados.length;
        if (qtdElementosNaLista == numeroMaximo) {
        listaNumerosSorteados = [];
        }    
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
      return gerarNumeroAleatorio();
    } else {
      listaNumerosSorteados.push(numeroEscolhido);
      console.log(listaNumerosSorteados);
      return numeroEscolhido;
    }
}

function verificarChute() {
  let chute = document.querySelector('input').value;
  
   if (chute == numeroSecreto) {
    TextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu em ${tentativas} ${palavraTentativa}`;
    TextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
      console.log(`essa foi a tentativa ${tentativas}`);
      if (chute > numeroSecreto) {
           TextoNaTela('h1', 'Errou!');
           TextoNaTela('p', `o número secreto é menor que ${chute}`);
      } else {
           TextoNaTela('h1', 'Errou!');
           TextoNaTela('p', `o número secreto é maior que ${chute}`);
      }
    tentativas++;
    limparCampo();
}
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  console.clear();
}

//let campoChute = document.querySelector('.container__input')
//campoChute.addEventListener('keydown', function(event) {
//    if (event.key === 'Enter') {
//        verificarChute();
//    }
//});
