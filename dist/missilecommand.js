var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="piston-0.4.0.d.ts" />
var mc;
(function (mc) {
    var Missile = (function (_super) {
        __extends(Missile, _super);
        function Missile(pos, target, speed, color) {
            _super.call(this, pos);
            this.target = target;
            this.color = color;
            this.vel = new ps.Vector(target.x - pos.x, target.y - pos.y).unit().multiply(speed);
            this.radius = 5;
            this.initialPos = pos;
            this.isCollisionDetectionEnabled = true;
        }
        Missile.prototype.render = function (camera) {
            camera.drawLine(this.initialPos, this.pos, 1, this.color);
            camera.fillCircle(this, this.radius, this.color);
        };
        Missile.prototype.update = function (dt, dims) {
            _super.prototype.update.call(this, dt, dims);
            if (this.passedTarget()) {
                this.destroyed = true;
                console.log("boom");
            }
        };
        Missile.prototype.passedTarget = function () {
            var goingDown = this.vel.y < 0;
            if (goingDown) {
                return this.pos.y < this.target.y;
            }
            return this.pos.y > this.target.y;
        };
        Missile.prototype.collideWith = function (other) {
            if (other.vel.y * this.vel.y < 0) {
                this.destroyed = true;
            }
        };
        return Missile;
    }(ps.Entity));
    mc.Missile = Missile;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
var mc;
(function (mc) {
    var Shooter = (function (_super) {
        __extends(Shooter, _super);
        function Shooter() {
            _super.call(this, new ps.Point(0, 0));
        }
        Shooter.prototype.update = function (dt, dims) {
            if (this.engine.mouse.isLeftButtonDown) {
                this.engine.registerEntity(this.shoot(new ps.Point(dims.x / 2, 0), this.engine.mouse.pos));
            }
        };
        Shooter.prototype.render = function () { };
        Shooter.prototype.shoot = function (pos, target) {
            return new mc.Missile(pos, target, 30, "green");
        };
        return Shooter;
    }(ps.Entity));
    mc.Shooter = Shooter;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
/// <reference path="shooter.ts" />
var mc;
(function (mc) {
    var dims = new ps.Vector(500, 500);
    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = dims.x;
    canvas.height = dims.y;
    document.body.appendChild(canvas);
    var engine = new ps.Engine(dims, canvas);
    engine.mouse.setCustomCursor("assets/crosshair.png", new ps.Point(10, 10));
    var missile = new mc.Missile(new ps.Point(50, dims.y), new ps.Point(200, 0), 30, "orange");
    function shoot(e) {
        console.log(e);
        if (e.button === 0) {
            console.log("pew");
        }
    }
    setInterval(addMissile, 1000); //todo find a way to turn it off
    engine.registerEntity(missile);
    engine.start();
    function addMissile() {
        var speed = Math.floor(Math.random() * 10 + 30);
        var missile = createMissile(Math.random() * dims.x, Math.random() * dims.x, speed);
        engine.registerEntity(missile, new mc.Shooter());
    }
    function createMissile(initial_x, target_x, speed) {
        return new mc.Missile(new ps.Point(initial_x, dims.y), new ps.Point(target_x, 0), speed, "red");
    }
})(mc || (mc = {}));
