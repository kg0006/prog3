class Grass extends LivingCreature{
    constructor(x, y){
        super(x, y);
        this.x = x; 
        this.y = y; 
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1], 
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    

    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var chooseObject = random(emptyCells);
 
      //  console.log(emptyCells, chooseObject);
        if(chooseObject && this.multiply >= 2){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 1;
 
            var newGrass = new Grass(newX, newY);
            grasses.push(newGrass);
            this.multiply = 0;
        }
    }


}

