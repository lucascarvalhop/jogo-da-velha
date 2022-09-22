// Variáveis de controle
const spaces = document.querySelectorAll('.s-container div');
const options = ['X', 'O'];
let player = document.querySelector('.player');
let currentTime;
let filledSpace;
let filledSpaces = [];
let winner;
let isAllFilled;

// Função que sorteia a vez de cada player (X ou O) jogar no início do jogo
function getcurrentTime() {
  const sort = Math.floor(Math.random() * 2);
  currentTime = options[sort];
  player.innerHTML = currentTime;
}

getcurrentTime();

// A função abaixo faz a verificação se o ganhador foi "X", "O" ou se houve empate (velha)
function checkWinner(){
  /* Quando um quadradinho é preenchido no jogo, ele assume uma posição em um array 
  de acordo com sua posição no jogo, o if abaixo analisa todas as combinações em que
  é possível o "X" ganhar */
  if ((filledSpaces[0] == 'X' && filledSpaces[1] == 'X' && filledSpaces[2] == 'X') || 
  (filledSpaces[0] == 'X' && filledSpaces[3] == 'X' && filledSpaces[6] == 'X') || 
  (filledSpaces[6] == 'X' && filledSpaces[7] == 'X' && filledSpaces[8] == 'X') || 
  (filledSpaces[8] == 'X' && filledSpaces[5] == 'X' && filledSpaces[2] == 'X') ||
  (filledSpaces[1] == 'X' && filledSpaces[4] == 'X' && filledSpaces[7] == 'X') ||
  (filledSpaces[0] == 'X' && filledSpaces[4] == 'X' && filledSpaces[8] == 'X') ||
  (filledSpaces[2] == 'X' && filledSpaces[4] == 'X' && filledSpaces[6] == 'X') ||
  (filledSpaces[3] == 'X' && filledSpaces[4] == 'X' && filledSpaces[5] == '')) {
     winner = 'X';
     document.querySelector('.winner').innerHTML = 'Jogador X venceu';
     // No if abaixo é analisado as combinações onde é possível o "O" ganhar
   } else if((filledSpaces[0] == 'O' && filledSpaces[1] == 'O' && filledSpaces[2] == 'O') || 
   (filledSpaces[0] == 'O' && filledSpaces[3] == 'O' && filledSpaces[6] == 'O') || 
   (filledSpaces[6] == 'O' && filledSpaces[7] == 'O' && filledSpaces[8] == 'O') || 
   (filledSpaces[8] == 'O' && filledSpaces[5] == 'O' && filledSpaces[2] == 'O') ||
   (filledSpaces[1] == 'O' && filledSpaces[4] == 'O' && filledSpaces[7] == 'O') ||
   (filledSpaces[0] == 'O' && filledSpaces[4] == 'O' && filledSpaces[8] == 'O') ||
   (filledSpaces[2] == 'O' && filledSpaces[4] == 'O' && filledSpaces[6] == 'O') ||
    (filledSpaces[3] == 'O' && filledSpaces[4] == 'O' && filledSpaces[5] == 'O')){
    winner = 'O';
    document.querySelector('.winner').innerHTML = 'Jogador O venceu';
    /* O else abaixo é executado em caso de todas as combinações acimas serem falsas, ou seja, em caso de empate
    além disso também é verificado se todos os quadradinhos foram preenchidos, para que não seja dado empate
    sem que o jogo tenha terminado */
   }else{

    /* A variável abaixo clona a variável filledSpaces, array onde estão armazenados as informações de preenchimento
    de cada quadradinho do game, ela é necessária pelo motivo de que que quando ela é clonada, em caso de haver
    espaços em branco na array, esses espaços são preenchidos como espaços vazios, mas estão lá presentes e possuem
    um index. Já no array original, se o quadradinho 1 é preenchido e logo depois o quadradinho 9 é preenchido,
    o array fica com index 1 e index 9 preenchido, mas os itens que estão vazios não possuem representação e nem mesmo
    um index, o que impossibilita a função isAllFilled verificar se todos os quadradinhos estão preenchidos
    para assim afirmar que o game deu empate */

      auxArray = Array.from(filledSpaces);
      function isAllFilled(element){
        return element !== undefined;
      };
      if(auxArray.length > 8 && auxArray.every(isAllFilled)){
        document.querySelector('.winner').innerHTML = 'Empate!';
      };
   };
}

// O código abaixo faz um loop em todos os quadrados do jogo e adiciona um evento de click

spaces.forEach((item) => {
  function handleClick(event){
    /* O if abaixo verifica se o quadrado já não foi preenchido, verifica se é a vez do jogador "X" e
    verifica se o jogo já não teve um ganhador. Se todas as verificações forem bem sucedidas ele preenche
    o quadrado clicado com um "X", se algo reprovar na verificação ele passa pro else if abaixo */
    if (item.innerHTML == '' && currentTime == 'X' && winner == undefined) {
      item.innerHTML = 'X';
      currentTime = 'O';
      player.innerHTML = currentTime;
      filledSpace = event.currentTarget.classList[0] - 1;
      filledSpaces[filledSpace] = 'X';
      /* Toda vez que um quadradinho é preenchido é chamada a função checkWinner para verificar
       se já houve um ganhador */
      checkWinner();
       /* O else if abaixo verifica se o quadrado já não foi preenchido, verifica se é a vez do jogador "O" e
      verifica se o jogo já não teve um ganhador. Se todas as verificações forem bem sucedidas ele preenche
      o quadrado clicado com um "O".
      Se as condições no else if abaixo não forem verdadeiras é porque o jogo já houve um vencedor
      ou houve empate, nesse caso só resta para o jogador a opção de resetar o game e começar outro jogo */
    } else if (item.innerHTML == '' && currentTime == 'O' && winner == undefined) {
      item.innerHTML = 'O';
      currentTime = 'X';
      player.innerHTML = currentTime;
      filledSpace = event.currentTarget.classList[0] - 1;
      filledSpaces[filledSpace] = 'O';
      checkWinner();
    }
  }
  item.addEventListener('click', handleClick);
});

// O código abaixo adiciona interação ao botão de resetar o jogo e executa o código para que o jogo seja reiniciado

const resetButton = document.querySelector('.reset-button');

function resetGame(){
  spaces.forEach((item) =>{
    item.innerHTML = '';
  });
  document.querySelector('.winner').innerHTML = '';
  filledSpaces = [];
  winner = undefined;
  auxArray = []
  getcurrentTime();
}

resetButton.addEventListener('click', resetGame)
