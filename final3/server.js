var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);
function getRandInt(min, max) {
    var z = Math.floor(Math.random() * (max - min + 1)) + min;
    return z;
}

let Grass = require("./grass")
let GrassEater = require("./grasseater")
let AllEater = require("./alleater")
let Bomb = require("./bomb")

matrix = []
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

        matrix[y][x] = 1
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        matrix[y][x] = 2
    }
    for (let k = 0; k < countAllEater; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        matrix[y][x] = 3
    }
    for (let k = 0; k < countBomb; k++) {
        let x = Math.floor(getRandInt(0, size - 1))
        let y = Math.floor(getRandInt(0, size - 1))
        matrix[y][x] = 4
    }

    io.emit("send matrix", matrix)
    return matrix
}

grassArr = [];
grassEaterArr = [];
allEaterArr = [];
bombArr = [];


matrix = generateMatrix(50, 50, 20, 60, 8, 10);
function objects(){
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
    io.emit("send matrix", matrix)
}






objects()
function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }

    for (let i = 0; i < allEaterArr.length; i++) {
        allEaterArr[i].move()

    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat()

    }


    io.emit("send matrix", matrix)

}

setInterval(game, 200)