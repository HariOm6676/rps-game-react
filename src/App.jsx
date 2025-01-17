import './App.css';

function App() {
  // js goes here
  let userMove = '';
  let computerMove = '';
  let result = '';
  let game = JSON.parse(localStorage.getItem('game')) || {
    wins : 0,
    looses: 0,
    ties: 0
  };

  let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

  function captureUserMove(move){
    userMove = move;
  }
  function generateComputerMove(){
    const randNum = Math.random();
    if (randNum < 1/3){
      computerMove = 'Rock';
    } else if (randNum < 2/3){
      computerMove = 'Paper';
    } else{
      computerMove = 'Scissors';
    }
  }
  function evaluateMoves(){
    if (userMove === computerMove){ // (R,R) , (P,P) ,(S,S)
      result = 'Tie';
    } else if ((userMove==='Rock' && computerMove === 'Scissors') ||
    (userMove==='Paper' && computerMove === 'Rock') ||
    (userMove==='Scissors' && computerMove === 'Paper')
    ){
      // (R,S) , (P,R) ,(S,P)
      result = 'Win';
    } else{
      // (S,R) , (R,P) ,(P,S)
      result = 'Loose';
    }
  }
  function updateGameScore(){
    if (result === 'Win'){
      game.wins++;
    } else if (result === 'Tie'){
      game.ties++;
    } else {
      game.looses++;
    }
    const gameHistoryItem = {userMove: userMove , computerMove: computerMove, result:result};
    gameHistory.push(gameHistoryItem);

    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));

  }

  function renderGameHistory(){
    let finalGameHistoryHTML = ` <tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
  </tr>`;
    console.log(`userMove: ${userMove} computerMove ${computerMove}result: ${result}`);
    console.log(gameHistory);
    for(let i = 0; i< gameHistory.length;i++){
      finalGameHistoryHTML += `
          <tr>
            <td>${i+1}</td>
            <td>${gameHistory[i].userMove}</td>
            <td>${gameHistory[i].computerMove}</td>
            <td>${gameHistory[i].result}</td>
          </tr>
    `;
    }
    document.querySelector('#gameHistory').innerHTML = finalGameHistoryHTML;

  }

  function resetScores(){

    game = {
      wins : 0,
      looses: 0,
      ties: 0
    };
    
    gameHistory = [];
  }

  function playGame(move){
    captureUserMove(move)
    generateComputerMove();
    evaluateMoves();
    updateGameScore();
  }
  return ( 
		// html goes here
    <div className="App">
        <h1>Rock Paper Scissors</h1>
        <div id="buttons-container">
          <button onClick={() => playGame('Rock')}>
            <img src= {process.env.PUBLIC_URL + "/images/rock.png"}  alt="rock"/>
          </button>
          <button onClick={() => playGame('Paper')}>
            <img src={process.env.PUBLIC_URL + "images/paper.png" }alt="paper"/>
          </button>
          <button onClick={() => playGame('Scissors')}>
            <img src={process.env.PUBLIC_URL + "images/scissors.png"}alt="scissors"/>
          </button>
          <button>
            <img id ="reset-img" src={process.env.PUBLIC_URL + "images/reset.jpg"} alt="reset"/>
          </button>
        </div>
        <div id="game-summary-container">
          <h1>Game Summary</h1>
          <table>
            <tr>
                <th>Wins</th>
                <th>Looses</th>
                <th>Ties</th>
                <th>Games Played</th>
            </tr>
            <tr>
                <td id ="wins">{game.wins}</td>
                <td id ="looses">{game.looses}</td>
                <td id ="ties">{game.ties}</td>
                <td id ="gamesPlayed">{game.wins + game.looses + game.ties}</td>
            </tr>
            </table>
          </div>
          <h1>Game History</h1>
          <table id = "gameHistory"/>
					{
					gameHistory.map( (gameHistoryItem) => {
							// render this gameHistoryItem to UI 
					})
					}
    </div>
  );
}

export default App;
