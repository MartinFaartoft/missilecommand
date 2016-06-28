/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="flakexplosion.ts" />


namespace mc {
    export class Flak extends ps.Entity {
        color: string = "yellow";
        speed: number = 150;
        lengthFactor: number;

        constructor(pos: ps.Point, public target: ps.Point) {
            super(pos);
            this.vel = new ps.Vector(target.x - pos.x, target.y - pos.y).unit().multiply(this.speed);
            this.radius = 5;
            this.isCollisionDetectionEnabled = false;
            this.lengthFactor = 15 / this.speed;
        }

        render(camera: ps.Camera): void {
            let tracer = this.pos.subtract(this.vel.multiply(this.lengthFactor));

            camera.drawLine(tracer, this.pos, 1, this.color);
        }

        update(dt: number, dims: ps.Vector) {
            super.update(dt, dims);

            if (this.passedTarget()) {
                this.destroyed = true;
                this.spawnExplosion();
            }
        }

        passedTarget(): boolean {
            let goingDown = this.vel.y < 0;

            if (goingDown) {
                return this.pos.y < this.target.y;
            }

            return this.pos.y > this.target.y;
        }

        spawnExplosion() {
            this.engine.registerEntity(new FlakExplosion(this.pos));
        }
    }
}