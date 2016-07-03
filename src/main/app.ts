/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="scene.ts" />

namespace mc {
    let dims = new ps.Vector(1000, 500);
    
    // create canvas
    let canvas = document.createElement("canvas");
    canvas.width = dims.x;
    canvas.height = dims.y;
    document.body.appendChild(canvas);

    let engine = new ps.Engine(dims, canvas);
    let scene = new Scene(engine, dims);

    // start the game
    engine.start();
}