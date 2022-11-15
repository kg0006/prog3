class Hunter extends LivingCreature{
    constructor(x,y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 200;
    }

    

    eat() {
        this.energy++
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if(newCell) {
            
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            for (var i in grassEater) {
                if (newX == grassEater[i].x && newY == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    
                }
            }
        }
    }
   

}