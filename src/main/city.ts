/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class City extends ps.Entity {
        color: string = "#5EF6FF";
        shieldColor: string = "blue";
        constructor(pos_x: number) {
            super(new ps.Point(pos_x, 0));

            this.radius = 50;
        }

        render(camera: ps.Camera) {
            camera.fillArc(this.pos, 0, this.radius, 0, Math.PI, true, this.color);
            camera.ctx.strokeStyle = this.shieldColor;
            camera.ctx.lineWidth = 3;
            camera.ctx.stroke();
        }

        getGunPosition(): ps.Point {
            return new ps.Point(this.pos.x, this.radius);
        }
    }
}