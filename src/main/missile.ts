/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class Missile extends ps.Entity {
        initialPos: ps.Point;

        constructor(pos: ps.Point, public target: ps.Point, speed: number, public color: string) {
            super(pos);
            this.vel = new ps.Vector(target.x - pos.x, target.y - pos.y).unit().multiply(speed);
            this.radius = 5;
            this.initialPos = pos;
            this.isCollisionDetectionEnabled = true;
        }

        render(camera: ps.Camera): void {
            camera.drawLine(this.initialPos, this.pos, 1, this.color);
            camera.fillCircle(this.pos, this.radius, this.color);
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