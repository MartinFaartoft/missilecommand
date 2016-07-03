/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="scene.ts" />

namespace mc {
    export class City extends ps.Entity {
        color: string = "#5EF6FF";
        shieldColor: string = "blue";
        outOfAmmoColor: string = "#FF6363";
        constructor(pos_x: number, public flakCount: number, public scene: Scene) {
            super(new ps.Point(pos_x, 0));

            this.radius = 50;
            this.isCollisionDetectionEnabled = true;
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
            if (this.scene.isGameOver()) {
                let text = "GAME OVER";
                let width = camera.ctx.measureText(text).width;
                let x = (camera.dims.x - width) / 2.0;
                let y = camera.dims.y / 2.0 + 50;
                camera.ctx.font = "150px arial";
                camera.ctx.fillStyle = "red";
                camera.ctx.fillText("GAME OVER", x, y);

                return;
            }

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

        collideWith(other: ps.Entity) {
            this.scene.removeCity(this);

            if (!this.scene.isGameOver()) {
                this.destroyed = true;
            }
        }
    }
}