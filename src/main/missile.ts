/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class Missile extends ps.EntityWithSprites {
        initialPos: ps.Point;

        constructor(pos: ps.Point, public target: ps.Point, speed: number, public color: string) {
            super(pos);
            this.vel = new ps.Vector(target.x - pos.x, target.y - pos.y).unit().multiply(speed);
            this.radius = 8;
            this.initialPos = pos;
            this.isCollisionDetectionEnabled = true;
            this.rotationSpeed = (Math.random() - .5) * 10; 

            this.sprites.push(new ps.Sprite(new ps.Point(0, 0), [90, 90], [0, 1, 2], 3, "assets/meteor.png"));
        }

        render(camera: ps.Camera): void {
            camera.drawLine(this.initialPos, this.pos, 1, this.color);
            camera.paintSprites(this.pos, this.rotation, [this.radius * 2, this.radius * 2], this.sprites); 
        }

        update(dt: number, dims: ps.Vector) {
            super.update(dt, dims);

            if (this.passedTarget()) {
                this.destroyed = true;
            }
        }

        passedTarget(): boolean {
            let goingDown = this.vel.y < 0;

            if (goingDown) {
                return this.pos.y < this.target.y;
            }

            return this.pos.y > this.target.y;
        }

        collideWith(other: ps.Entity) {
            if (other.vel.y === 0) {
                this.destroyed = true;
            }
        }
    }
}