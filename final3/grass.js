 class Grass extends LivingCreature {
     constructor(x, y){
         super(x,y)
         this.energy = 10;
     }
    mul(){
        this.multiply++;
        let found = super.chooseCell(0);
        let emptyCell = random(found);
        if(emptyCell && this.multiply === 1){
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0;
        }
        else{
            this.energy--;
            if(this.energy <= 0){
                this.die()
            }
        }
    }
    die() {
        for (let i in grassArr) {
            if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                grassArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
  
        
        

    
   