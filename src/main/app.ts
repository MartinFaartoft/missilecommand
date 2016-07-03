/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
/// <reference path="flak.ts" />
/// <reference path="city.ts" />


namespace mc {
    let dims = new ps.Vector(1000, 500);
    
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
            let city = getClosestCityWithFlak(cities, pos);
            if (city) {
                city.shoot(pos);
            }
        }
    });
    
    // create cities
    let numberOfCities = 3;
    let flakCount = 5;
    let cities: City[] = [];
    let spacing = dims.x / (numberOfCities + 1); 
    for (let i = 1; i < numberOfCities + 1; i++) {
        let city = new City(i * spacing, flakCount);
        engine.registerEntity(city);
        cities.push(city);
    }

    // create incoming missiles
    setInterval(addMissile, 1000); //todo find a way to turn it off

    // start the game
    engine.start();

    function addMissile() {
        let speed = Math.floor(Math.random() * 10 + 30);
        let missile = createMissile(Math.random() * dims.x, Math.random() * dims.x, speed)

        engine.registerEntity(missile); 
    }

    function createMissile(initial_x: number, target_x: number, speed: number): Missile {
        return new Missile(new ps.Point(initial_x, dims.y), new ps.Point(target_x, 0), speed, "red");
    }

    function getClosestCityWithFlak(cities: City[], pos: ps.Point): City {
        let closestCity: City;
        let closestDistance = Number.MAX_VALUE;

        for (let city of cities.filter(c => c.flakCount > 0)) {
            let distance = city.getGunPosition().distanceTo(pos);
            if (distance < closestDistance) {
                closestCity = city;
                closestDistance = distance; 
            }
        }

        return closestCity;
    }
}