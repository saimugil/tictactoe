const prompt = require('prompt-sync')();

let gameboard = [' ',' ',' ',' ',' ',' ',' ',' ',' ',];

let currentplayer = '🐐';
let gameactive = true;

function printboard(){
    console.log(`${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]}
---------
${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]}
---------
${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]}`);
}

function handlemove(position){
    if(gameboard[position] === " "){
        gameboard[position] = currentplayer;
    }else{
        console.log("Cell already taken, choose another one.");
        return false;
    }
    if(checkwin()){
        printboard();
        console.log(`Player ${currentplayer} wins!`);
        gameactive = false;
        return true;
    }
    if (gameboard.every(cell=>cell!==" ")){
        printboard();
        console.log("Its a draw!");
        gameactive = false;
        return true;
    } 
    currentplayer = currentplayer === "🐐" ? "🍇" : "🐐";
    return true;
}

function checkwin(){
    const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    return conditions.some(condition=>{
        const [a,b,c] = condition;
        return gameboard[a] === currentplayer && gameboard[b] === currentplayer && gameboard[c] === currentplayer;
    });
}

while (gameactive){
    printboard()
    const position = prompt(`Player ${currentplayer}, enter your move(0-8): `);

    if (position >= 0 && position <=8){
        handlemove(parseInt(position));
    }else{
        console.log("Invalid position, enter a number between 0 and 8.");
    }
}