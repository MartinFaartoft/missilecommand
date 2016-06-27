/// <reference path="piston-0.4.0.d.ts" />

/// <reference path="missile.ts" />
/// <reference path="shooter.ts" />



namespace mc {
    
    let dims = new ps.Vector(500, 500);
    
    // create canvas
    let canvas = document.createElement("canvas");
    canvas.width = dims.x;
    canvas.height = dims.y;
    document.body.appendChild(canvas);

    let engine = new ps.Engine(dims, canvas);
    engine.mouse.setCustomCursor("assets/crosshair.png", new ps.Point(10, 10));
    
    let missile = new Missile(new ps.Point(50, dims.y), new ps.Point(200, 0), 30, "orange");
    
    function shoot(e: MouseEvent) {
        console.log(e);
        
        if (e.button === 0) {
            console.log("pew");
            
        }
    }
    
    setInterval(addMissile, 1000); //todo find a way to turn it off
    engine.registerEntity(missile);
    engine.start();

    function addMissile() {
        let speed = Math.floor(Math.random() * 10 + 30);
        let missile = createMissile(Math.random() * dims.x, Math.random() * dims.x, speed)

        engine.registerEntity(missile, new Shooter()); 
    }

    function createMissile(initial_x: number, target_x: number, speed: number): Missile {
        return new Missile(new ps.Point(initial_x, dims.y), new ps.Point(target_x, 0), speed, "red");
    }
}