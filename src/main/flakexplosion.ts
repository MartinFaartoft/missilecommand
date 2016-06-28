/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class FlakExplosion extends ps.Entity {
        
        constructor(pos: ps.Point)  {
            super(pos);
            this.radius = 30;
            this.isCollisionDetectionEnabled = true;
            this.destroyOnCollision = true;
        }


        render(camera: ps.Camera) {
            camera.fillCircle(this.pos, this.radius, "orange");
        }
    }
}