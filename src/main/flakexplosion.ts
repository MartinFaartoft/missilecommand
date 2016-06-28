/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class FlakExplosion extends ps.Entity {
        expandingTime: number = 1;
        contractingTime: number = 1.5;

        constructor(pos: ps.Point)  {
            super(pos);
            this.radius = 15;
            this.isCollisionDetectionEnabled = true;
            this.destroyOnCollision = false;
        }

        update(dt: number, dims: ps.Vector) {
            super.update(dt, dims);

            if (this.expandingTime < 0 && this.contractingTime < 0) {
                this.destroyed = true;
            }
            
            this.expand(dt);
            this.contract(dt);            
        }

        render(camera: ps.Camera) {
            camera.fillCircle(this.pos, this.radius, "orange");
        }

        private expand(dt: number) {
            if (this.expandingTime > 0) {
                this.expandingTime -= dt;
                this.radius += .3;
            }
        }

        private contract(dt: number) {
            if (this.expandingTime < 0 && this.contractingTime > 0) {
                this.contractingTime -= dt;
                this.radius = Math.max(0, this.radius - .3);
            }
        }
    }
}