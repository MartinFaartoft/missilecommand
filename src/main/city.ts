/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    export class City extends ps.Entity {
        color: string = "#5EF6FF";
        shieldColor: string = "blue";
        outOfAmmoColor: string = "#FF6363";
        constructor(pos_x: number, public flakCount: number) {
            super(new ps.Point(pos_x, 0));

            this.radius = 50;
        }

        shoot(target: ps.Point): void {
            if (this.flakCount > 0) {
                this.flakCount--;
                this.engine.registerEntity(new Flak(this.getGunPosition(), target));

                if (this.flakCount === 0) {
                    this.color = this.outOfAmmoColor;
                }
            }
        }

        render(camera: ps.Camera) {
            camera.fillArc(this.pos, 0, this.radius, 0, Math.PI, true, this.color);
            camera.ctx.strokeStyle = this.shieldColor;
            camera.ctx.lineWidth = 3;
            camera.ctx.stroke();
            
            //render remaining flak
            camera.ctx.fillStyle = "black";
            camera.ctx.font = "20px arial";
            let posCC = camera.coordConverter.toCameraCoords(this.pos);
            camera.ctx.fillText(this.flakCount.toString(), posCC.x - 5, posCC.y - 5);
        }

        getGunPosition(): ps.Point {
            return new ps.Point(this.pos.x, this.radius);
        }
    }
}