/// <reference path="piston-0.4.0.d.ts" />
var mc;
(function (mc) {
    // create canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    var engine = new ps.Engine(new ps.Vector(500, 500), canvas);
    engine.start();
})(mc || (mc = {}));
