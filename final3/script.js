let matrix = [];
var side = 30;
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let bombArr = [];



function generateMatrix(size, countGrass, countGrassEater, countAllEater, countBomb) {
    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++) {
            matrix[i].push(0)
        }

    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        // console.log(matrix);
        if(matrix[y][x] == 0)
            matrix[y][x] = 1
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        if(matrix[y][x] == 0)
            matrix[y][x] = 2
    }
    for (let k = 0; k < countAllEater; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        if(matrix[y][x] == 0)
         matrix[y][x] = 3
    }
    for (let k = 0; k < countBomb; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        if(matrix[y][x] == 0)
        matrix[y][x] = 4
    }

    return matrix
}
matrix = generateMatrix(50, 50, 20, 60, 8, 10);

function objects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] === 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] === 3) {
                let allEater = new AllEater(x, y);
                allEaterArr.push(allEater);
            }
            else if (matrix[y][x] === 4) {
                let bomb = new Bomb(x, y);
                bombArr.push(bomb);
            }
        }

    }
}
function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }

    for (let i = 0; i < allEaterArr.length; i++) {
        // console.log(allEaterArr[i])
        allEaterArr[i].move()

    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat()

    }

}
function getRandInt(min, max) {
    var z = Math.floor(Math.random() * (max - min + 1)) + min;
    return z;
}
function setup(){
    frameRate(1)
    var canv = createCanvas(450,450)
}

function draw() {
objects()
game()
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 2){
                fill('yellow');
            }   
            else if(matrix[y][x] == 3){
                fill('red');
            }  
            else if(matrix[y][x] == 4){
                fill('black')
            }
           
            else {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for(let i = 0; i < grassEaterArr.length; i++){
        grassEaterArr[i].eat()
    }
    for(let i = 0; i < allEaterArr.length; i++){
        allEaterArr[i].eat()
    }
    for(let i = 0; i < bombArr.length; i++){
        bombArr[i].eat()
    }
   
}


const title = document.querySelector("h1");
const button = document.querySelector("button")
console.log(button)

button.addEventListener("click", )
function changeWeather() {
 if(document.body.style.backgroundColor === "brown"){
     title.innerText = "Autumn"
     document.body.style.backgroundColor ="red";
 } else if (document.body.style.backgroundColor === "white"){
    title.innerText = "Winter"
    document.body.style.backgroundColor ="red";
 }else if (document.body.style.backgroundColor === "green"){
    title.innerText = "Spring"
    document.body.style.backgroundColor ="red";
 } else if (document.body.style.backgroundColor === "yellow"){
    title.innerText = "Spring"
    document.body.style.backgroundColor ="red";
 }
}
