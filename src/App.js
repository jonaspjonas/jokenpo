import './App.css';
import goku from './assets/goku.jpg';
import vegeta from './assets/vegeta.jpg';
import pedra from './assets/pedra.png';
import papel from './assets/papel.png';
import tesoura from './assets/tesoura.png';
import { useEffect, useState } from 'react';

function App() {

  const [escolhaPlayer, setEscolhaPlayer] = useState();
  const [escolhaPc, setEscolhaPc] = useState();
  const [resultado, setResultado] = useState(" ");
  const [rodada, setRodada] = useState(1);
  const [ptsPlayer, setPtsPlayer] = useState(0);
  const [ptsPc, setPtsPc] = useState(0);
  const [fim, setFim] = useState();

  function jogar() {

    if (!escolhaPlayer) {
      alert("Por favor, escolha uma jogada!");
      return;
    }

    let sorteio = Math.random();
    sorteio = Math.floor(sorteio * 3);

    let escolha = [pedra, papel, tesoura];

    setEscolhaPc(escolha[sorteio]);
  }

  function handleYes() {
    setEscolhaPc();
    setEscolhaPlayer();
    setResultado(" ");
    setRodada(rodada + 1);
  }

  function handleNo() {
    setFim(1);
    setEscolhaPlayer();
    setEscolhaPc()
  }

  function handleReset() {
    setEscolhaPc();
    setEscolhaPlayer();
    setFim();
    setPtsPc(0);
    setPtsPlayer(0);
    setResultado(" ");
    setRodada(1);
  }


  useEffect(() => {
    if ((escolhaPlayer === pedra && escolhaPc === tesoura) || (escolhaPlayer === papel && escolhaPc === pedra) || (escolhaPlayer === tesoura && escolhaPc === papel)) {
      setResultado("Voce Venceu!");
      setPtsPlayer(ptsPlayer + 1);
    }
    if ((escolhaPc === pedra && escolhaPlayer === tesoura) || (escolhaPc === papel && escolhaPlayer === pedra) || (escolhaPc === tesoura && escolhaPlayer === papel)) {
      setResultado("Voce Perdeu!");
      setPtsPc(ptsPc + 1);
    }
    if ((escolhaPlayer === pedra && escolhaPc === pedra) || (escolhaPlayer === papel && escolhaPc === papel) || (escolhaPlayer === tesoura && escolhaPc === tesoura)) {
      setResultado("Empate!");
    }
  }, [escolhaPc, escolhaPlayer])

  return (
    <div className="App">
      <header className="app-header">
        <img src={goku} alt="cabeça goku" />
        <h1>JOKENPO</h1>
        <img src={vegeta} alt="cabeça vegeta" />
      </header>

      <main>
        <h1>Rodada {rodada}</h1>

        <div className="app-game">
          <div className="app-player">
            <h2>Esolha sua jogada</h2>
            <img src={pedra} alt="mão fechada" onClick={() => setEscolhaPlayer(pedra)} />
            <img src={papel} alt="mão aberta" onClick={() => setEscolhaPlayer(papel)} />
            <img src={tesoura} alt="mão em forma de tesoura" onClick={() => setEscolhaPlayer(tesoura)} />
            <h2>Sua escolha</h2>
            {escolhaPlayer &&
              <img src={escolhaPlayer} alt="" />}

          </div>

          <button className="app-button" onClick={() => jogar()}>Jogar</button>

          <div className="app-computer">
            <h2>Jogada do PC</h2>
            <img src={escolhaPc} alt="" />
          </div>
        </div>

        {resultado !== " " && <div className="app-modal">
          <div className="card-modal">
            <h1>{fim ? "Fim de Jogo" : resultado}</h1>
            <h2>{fim ? "Resultado:" : "Deseja Continuar?"}</h2>
            {fim ? <h2>Sua pontuação: {ptsPlayer}</h2> : <button className="btn-yes" onClick={() => handleYes()}>Sim</button>}
            {fim ? <h2>Pontuação PC: {ptsPc}</h2> : <button className="btn-no" onClick={() => handleNo()}>Nao</button>}
            {fim && <h1>{ptsPc > ptsPlayer ? "Vencedor: PC" : ptsPlayer > ptsPc ? "Vencedor: Player" : "Empatou"}</h1>}
            {fim && <button className="btn-reset" onClick={()=> handleReset()}>Voltar ao Início</button>}

          </div>
        </div>}

      </main>


    </div>
  );
}

export default App;
