const html = document.querySelector('html');
const FocoBt = document.querySelector('.app__card-button--foco');
const CurtoBt = document.querySelector('.app__card-button--curto');
const LongoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const StartPauseBt = document.querySelector('#start-pause')
const IniciarouPausarBt = document.querySelector('#start-pause span');
const TemponaTela = document.querySelector('#timer')

const MusicaFocoInput = document.querySelector('#alternar-musica');
const Musica = new Audio('sons/luna-rise-part-one.mp3');
Musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let IntervaloId = null;

MusicaFocoInput.addEventListener('change', () => {
	if(Musica.paused){
		Musica.play()
	}
	else {
		Musica.pause()
	}
});

FocoBt.addEventListener('click', () => {
	tempoDecorridoEmSegundos = 1500;
    AlterarContexto('foco');
    FocoBt.classList.add('active');
})

CurtoBt.addEventListener('click', () => {
	tempoDecorridoEmSegundos = 300;
    AlterarContexto('descanso-curto');
    CurtoBt.classList.add('active');
})

LongoBt.addEventListener('click', () => {
	tempoDecorridoEmSegundos = 900;
    AlterarContexto('descanso-longo');
    LongoBt.classList.add('active');
})

function AlterarContexto(contexto){
	MostrarTempo();
	botoes.forEach(function(contexto){
		contexto.classList.remove('active');
	})

	html.setAttribute('data-contexto', contexto);
	banner.setAttribute('src', `imagens/${contexto}.png`);
	switch (contexto){
		case "foco":
			titulo.innerHTML = `Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
			break;
		case "descanso-curto":
			titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
			break;
		case "descanso-longo":
			titulo.innerHTML = `Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
			break;
		default:
			break;
	}
}

const ContagemRegressiva = () => {
	if (tempoDecorridoEmSegundos <= 0) {
		alert('Tempo Finalizado');
		Zerar();
		return
	}
	tempoDecorridoEmSegundos -= 1;
	MostrarTempo();
}

StartPauseBt.addEventListener('click', IniciarouPausar);

function IniciarouPausar() {
    if(IntervaloId){
        Zerar()
        return
    }
    IntervaloId = setInterval(ContagemRegressiva, 1000)
    IniciarouPausarBt.textContent = "Pausar"
}

function Zerar() {
    clearInterval(IntervaloId);
    IniciarouPausarBt.textContent = "Começar"
    IntervaloId = null;
}

function MostrarTempo(){
	const Tempo = new date (tempoDecorridoEmSegundos * 1000);
	const TempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second '2-digit'})
	TemponaTela.innerHTML = `${TempoFormatado}`;
}

MostrarTempo();
