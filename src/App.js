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

  function jogar() {
    console.log("entrou");
    if(!escolhaPlayer) {
      alert("Por favor, escolha uma jogada!");
      return;
    }

    let sorteio = Math.random();
    sorteio = Math.floor(sorteio * 3);

    let escolha = Array();
    escolha[0] = pedra;
    escolha[1] = papel;
    escolha[2] = tesoura;

    setEscolhaPc(escolha[sorteio]);
  }

  useEffect(()=> {
    if ((escolhaPlayer === pedra && escolhaPc === tesoura) || (escolhaPlayer === papel && escolhaPc === pedra) || (escolhaPlayer === tesoura && escolhaPc === papel)) {
      setResultado("You Wins!");
    }
    if ((escolhaPc === pedra && escolhaPlayer === tesoura) || (escolhaPc === papel && escolhaPlayer === pedra) || (escolhaPc === tesoura && escolhaPlayer === papel)) {
      setResultado("You Loose!");
    }
    if ((escolhaPlayer === pedra && escolhaPc === pedra) || (escolhaPlayer === papel && escolhaPc === papel) || (escolhaPlayer === tesoura && escolhaPc === tesoura)) {
      setResultado("Drawn Game");
    }
    return;
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
            <img src={pedra} alt="mão fechada" onClick={()=> setEscolhaPlayer(pedra)}/>
            <img src={papel} alt="mão aberta" onClick={()=> setEscolhaPlayer(papel)} />
            <img src={tesoura} alt="mão em forma de tesoura" onClick={()=> setEscolhaPlayer(tesoura)} />
            <h2>Sua escolha</h2>
            {escolhaPlayer &&
            <img src={escolhaPlayer} alt="" /> }
            
          </div>

          <button className="app-button" onClick={()=> jogar()}>Jogar</button>

          <div className="app-computer">
            <h2>Jogada do PC</h2>
            <img src={escolhaPc} alt="" />
          </div>
        </div>

        <h1>{resultado}</h1>

      </main>


    </div>
  );
}

export default App;
