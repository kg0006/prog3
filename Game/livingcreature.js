

module.exports = class LivingCreature {
    constructor(x, y){
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

    
    random(found) {
        return found[Math.floor(Math.random() * found.length)]
    }

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character) {
        this.getNewCordinates()
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] == character) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }




    // die() {
    //     matrix[this.y][this.x] = 0;
    //     for (var i in grassEater) {
    //         if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
    //             grassEater.splice(i, 1);
    //             break;
    //         }
    //     }
    // }




}
