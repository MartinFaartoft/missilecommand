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
            camera.fillCircle(this.pos, this.radius, this.color);
        };
        Missile.prototype.update = function (dt, dims) {
            _super.prototype.update.call(this, dt, dims);
            if (this.passedTarget()) {
                this.destroyed = true;
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
            if (other.vel.y === 0) {
                this.destroyed = true;
            }
        };
        return Missile;
    }(ps.Entity));
    mc.Missile = Missile;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
var mc;
(function (mc) {
    var FlakExplosion = (function (_super) {
        __extends(FlakExplosion, _super);
        function FlakExplosion(pos) {
            _super.call(this, pos);
            this.expandingTime = 1;
            this.contractingTime = 1.5;
            this.radius = 15;
            this.isCollisionDetectionEnabled = true;
            this.destroyOnCollision = false;
        }
        FlakExplosion.prototype.update = function (dt, dims) {
            _super.prototype.update.call(this, dt, dims);
            if (this.expandingTime < 0 && this.contractingTime < 0) {
                this.destroyed = true;
            }
            this.expand(dt);
            this.contract(dt);
        };
        FlakExplosion.prototype.render = function (camera) {
            camera.fillCircle(this.pos, this.radius, "orange");
        };
        FlakExplosion.prototype.expand = function (dt) {
            if (this.expandingTime > 0) {
                this.expandingTime -= dt;
                this.radius += .3;
            }
        };
        FlakExplosion.prototype.contract = function (dt) {
            if (this.expandingTime < 0 && this.contractingTime > 0) {
                this.contractingTime -= dt;
                this.radius = Math.max(0, this.radius - .3);
            }
        };
        return FlakExplosion;
    }(ps.Entity));
    mc.FlakExplosion = FlakExplosion;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="flakexplosion.ts" />
var mc;
(function (mc) {
    var Flak = (function (_super) {
        __extends(Flak, _super);
        function Flak(pos, target) {
            _super.call(this, pos);
            this.target = target;
            this.color = "yellow";
            this.speed = 150;
            this.vel = new ps.Vector(target.x - pos.x, target.y - pos.y).unit().multiply(this.speed);
            this.radius = 5;
            this.isCollisionDetectionEnabled = false;
            this.lengthFactor = 15 / this.speed;
        }
        Flak.prototype.render = function (camera) {
            var tracer = this.pos.subtract(this.vel.multiply(this.lengthFactor));
            camera.drawLine(tracer, this.pos, 1, this.color);
        };
        Flak.prototype.update = function (dt, dims) {
            _super.prototype.update.call(this, dt, dims);
            if (this.passedTarget()) {
                this.destroyed = true;
                this.spawnExplosion();
            }
        };
        Flak.prototype.passedTarget = function () {
            var goingDown = this.vel.y < 0;
            if (goingDown) {
                return this.pos.y < this.target.y;
            }
            return this.pos.y > this.target.y;
        };
        Flak.prototype.spawnExplosion = function () {
            this.engine.registerEntity(new mc.FlakExplosion(this.pos));
        };
        return Flak;
    }(ps.Entity));
    mc.Flak = Flak;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
var mc;
(function (mc) {
    var City = (function (_super) {
        __extends(City, _super);
        function City(pos_x, flakCount) {
            _super.call(this, new ps.Point(pos_x, 0));
            this.flakCount = flakCount;
            this.color = "#5EF6FF";
            this.shieldColor = "blue";
            this.outOfAmmoColor = "#FF6363";
            this.radius = 50;
        }
        City.prototype.shoot = function (target) {
            if (this.flakCount > 0) {
                this.flakCount--;
                this.engine.registerEntity(new mc.Flak(this.getGunPosition(), target));
                if (this.flakCount === 0) {
                    this.color = this.outOfAmmoColor;
                }
            }
        };
        City.prototype.render = function (camera) {
            camera.fillArc(this.pos, 0, this.radius, 0, Math.PI, true, this.color);
            camera.ctx.strokeStyle = this.shieldColor;
            camera.ctx.lineWidth = 3;
            camera.ctx.stroke();
            //render remaining flak
            camera.ctx.fillStyle = "black";
            camera.ctx.font = "20px arial";
            var posCC = camera.coordConverter.toCameraCoords(this.pos);
            camera.ctx.fillText(this.flakCount.toString(), posCC.x - 5, posCC.y - 5);
        };
        City.prototype.getGunPosition = function () {
            return new ps.Point(this.pos.x, this.radius);
        };
        return City;
    }(ps.Entity));
    mc.City = City;
})(mc || (mc = {}));
/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
/// <reference path="flak.ts" />
/// <reference path="city.ts" />
var mc;
(function (mc) {
    var dims = new ps.Vector(1000, 500);
    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = dims.x;
    canvas.height = dims.y;
    document.body.appendChild(canvas);
    var engine = new ps.Engine(dims, canvas);
    engine.mouse.setCustomCursor("assets/crosshair.png", new ps.Point(10, 10));
    // make left mouse button shoot flak
    engine.mouse.addMouseDownEventListener(function (pos, button) {
        if (button === 0) {
            var city = getClosestCityWithFlak(cities, pos);
            if (city) {
                city.shoot(pos);
            }
        }
    });
    // create cities
    var numberOfCities = 3;
    var flakCount = 5;
    var cities = [];
    var spacing = dims.x / (numberOfCities + 1);
    for (var i = 1; i < numberOfCities + 1; i++) {
        var city = new mc.City(i * spacing, flakCount);
        engine.registerEntity(city);
        cities.push(city);
    }
    // create incoming missiles
    setInterval(addMissile, 1000); //todo find a way to turn it off
    // start the game
    engine.start();
    function addMissile() {
        var speed = Math.floor(Math.random() * 10 + 30);
        var missile = createMissile(Math.random() * dims.x, Math.random() * dims.x, speed);
        engine.registerEntity(missile);
    }
    function createMissile(initial_x, target_x, speed) {
        return new mc.Missile(new ps.Point(initial_x, dims.y), new ps.Point(target_x, 0), speed, "red");
    }
    function getClosestCityWithFlak(cities, pos) {
        var closestCity;
        var closestDistance = Number.MAX_VALUE;
        for (var _i = 0, _a = cities.filter(function (c) { return c.flakCount > 0; }); _i < _a.length; _i++) {
            var city = _a[_i];
            var distance = city.getGunPosition().distanceTo(pos);
            if (distance < closestDistance) {
                closestCity = city;
                closestDistance = distance;
            }
        }
        return closestCity;
    }
})(mc || (mc = {}));
