/// <reference path="piston-0.4.0.d.ts" />

/// <reference path="missile.ts" />


namespace mc {
    export class Shooter extends ps.Entity {

        constructor() {
            super(new ps.Point(0, 0));
        }

        update(dt: number, dims: ps.Vector) {
            if (this.engine.mouse.isLeftButtonDown) {
                this.engine.registerEntity(this.shoot(new ps.Point(dims.x / 2, 0), this.engine.mouse.pos));
            }
        }

        render() {}

        shoot(pos: ps.Point, target: ps.Point): Missile {
            return new Missile(pos, target, 30, "green");
        }
    }
}