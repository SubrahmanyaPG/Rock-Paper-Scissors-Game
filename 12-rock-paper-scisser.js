
let score=JSON.parse( localStorage.getItem('score'))||{
    wins:0,
    ties:0,
    losses:0
  };

// if(!score){
//   score={
//     wins:0,
//     ties:0,
//     losses:0
//   };
// }


updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(function(){
      const playerMove = pickComputerMove(); 
      playGame(playerMove);
    },1000);
   isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
 
 
}

function autoStop(){
      const buttonElem = document.querySelector('.js-auto-play-button');

      if(buttonElem.innerText ==='Auto play'){
        buttonElem.innerHTML='Stop';
      }else{
        buttonElem.innerHTML='Auto play';
      }
}

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result='';
  if(playerMove==='Rock'){
    if(computerMove==='Rock'){
      result='Tie';
    }else if(computerMove==='Paper'){
      result ='You Lose';
    }else if(computerMove==='Scissors'){
      result='You Won';
    }
  }else if(playerMove==='Paper'){
    if(computerMove==='Rock'){
      result='You Won';
    }else if(computerMove==='Paper'){
      result ='Tie';
    }else if(computerMove==='Scissors'){
      result='You Lose';
    }

  }else if(playerMove==='Scissors'){
    if(computerMove==='Rock'){
      result='You Lose';
    }else if(computerMove==='Paper'){
      result ='You Won';
    }else if(computerMove==='Scissors'){
      result='Tie';
    }
  }


  if(result==='You Won'){
    score.wins++;
  }else if(result==='You Lose'){
    score.losses++;
  }else if(result==='Tie'){
    score.ties++;
  }

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML=result;

  document.querySelector('.js-moves').innerHTML=`You 
  <img class="move-icon" src="images/${playerMove}-emoji.png">
  <img class="move-icon" src="images/${computerMove}-emoji.png" > Computer;`
}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  const randomNumber=Math.random();

  let computerMove='';

  if(randomNumber>=0 && randomNumber<1/3){
  computerMove='Rock';
  } else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove='Paper';
  } else{
    computerMove='Scissors';
  }

  return computerMove;
}
