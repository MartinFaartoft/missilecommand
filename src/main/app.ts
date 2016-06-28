/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
/// <reference path="flak.ts" />

namespace mc {
    let dims = new ps.Vector(500, 500);
    
    // create canvas
    let canvas = document.createElement("canvas");
    canvas.width = dims.x;
    canvas.height = dims.y;
    document.body.appendChild(canvas);

    let engine = new ps.Engine(dims, canvas);
    
    engine.mouse.setCustomCursor("assets/crosshair.png", new ps.Point(10, 10));
    
    // make left mouse button shoot flak
    engine.mouse.addMouseDownEventListener((pos, button) => {
        if (button === 0) {
            engine.registerEntity(shoot(new ps.Point(dims.x / 2, 0), pos));
        }
    });
    
    // create incoming missiles
    setInterval(addMissile, 1000); //todo find a way to turn it off

    // start the game
    engine.start();

    function shoot(pos: ps.Point, target: ps.Point): Flak {
            return new Flak(pos, target);
        }

    function addMissile() {
        let speed = Math.floor(Math.random() * 10 + 30);
        let missile = createMissile(Math.random() * dims.x, Math.random() * dims.x, speed)

        engine.registerEntity(missile); 
    }

    function createMissile(initial_x: number, target_x: number, speed: number): Missile {
        return new Missile(new ps.Point(initial_x, dims.y), new ps.Point(target_x, 0), speed, "red");
    }
}