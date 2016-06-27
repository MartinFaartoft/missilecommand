/// <reference path="piston-0.4.0.d.ts" />

namespace mc {
    // create canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);

    let engine = new ps.Engine(new ps.Vector(500, 500), canvas);

    engine.start();
}