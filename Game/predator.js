let LivingCreature = require('./livingcreature.js');

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);

        this.energy = 10;

    }

    chooseCell(char) {
        this.getNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = super.random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4;
            let pre = new Predator(x, y);

            predator.push(pre);

            this.energy = 15;
        }
    }
    eat() {
        let found1 = this.chooseCell(1);
        let found2 = this.chooseCell(2);
        let found = found1.concat(found2)
        let exact = this.random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

            for (var i in grasses) {
                if (grasses[i].x == x && grasses[i].y == y) {
                    grasses.splice(i, 1)
                    break
                }

                else {
                    for (var i in grassEater) {
                        if (grassEater[i].x == x && grassEater[i].y == y) {
                            grassEater.splice(i, 1)
                            break
                        }
                    }
                }
            }
            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = this.random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        }
         
    }
    die() {
        for (let i = 0; i < predator.length; i++) {
            if (predator[i].x == this.x && predator[i].y == this.y) {
                predator.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}