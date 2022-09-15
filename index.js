const cells = Array.from(document.querySelectorAll("#board div"));
const container = document.querySelector(".container");
const start = document.querySelector(".startContainer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const oBtn = document.querySelector("span")
const xBtn = document.querySelector(".btn_one")


/*----- variables -----*/
let board;
let win;
let turn = "X";

/*----- constants -----*/
const winningCombos = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

/*----- functions -----*/
function gameBoard(){
    board = [
        "", "", "", 
        "", "", "", 
        "", "", "",
    ];
    displayBoard();
    
};

function displayBoard(){  
    //take the board array
    board.forEach(function(mark, index){
        //this sets the text content of the cell of the same position to the mark on the board.
        cells[index].textContent = mark;     
     });

     const messages = document.querySelector("h2");
     messages.textContent = win === "T" ? `C'est une égalité, princesse !` : win ? `${win} a gagné la partie !` : `C'est au tour de ${turn}.`;

     document.getElementById("board").addEventListener("click", makeTurn)
     
     if (win){
        document.getElementById("board").removeEventListener("click", makeTurn);
     }
     
 }

 function makeTurn(event){
    // find the index of the cell and match the cell the user clicked
    let idx = cells.findIndex(function(cell){
          return cell === event.target; 
    });

    //Switch X to O
    if (board[idx] === ""){
        board[idx] = turn;
        //Ternary here. <condition> ? <if condition is true, this> : <else if condition is false, this>
        turn = turn === "X" ? "O" : "X"; 
    }
    
    win = getWinner();
    displayBoard();
 }

 function getWinner(){
    let winner = null;

    winningCombos.forEach(function(combo){
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
    })
    //If there's an empty space, return null. No winner and no empty space ? Return T
    return winner ? winner : board.includes("") ? null : "T";
 };

/*  function getComputerChoice(){
    let random = Math.floor(Math.random() * cells.length);

    while (cells[random].textContent !== ""){
        random = Math.floor(Math.random() * cells.length);
        
    }  

    cells[random].textContent = "O";
      console.log(random);        
 } */

 function resetGame(){
    gameBoard();
    win = getWinner();
    turn = "X";
    displayBoard();
 }

 /*----- addEventListener -----*/
startBtn.addEventListener("click", () =>{
    container.classList.remove("hidden");
    gameBoard();
    start.classList.add("hidden");
    
});
    
resetBtn.addEventListener("click", () => {
    resetGame()
});

// Select the User (X or O)
oBtn.addEventListener("click", () => {
    document.querySelector(".btn_bg").style.marginLeft = "-74px";
    xBtn.style.color = "#a6afbf";
    oBtn.style.color = "white";
    resetGame();
    turn = "O";
    displayBoard()
})

 xBtn.addEventListener("click", () => {
    document.querySelector(".btn_bg").style.marginLeft = "-241px";
    oBtn.style.color = "#a6afbf";
    xBtn.style.color = "white";
    resetGame()
 })