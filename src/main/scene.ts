/// <reference path="piston-0.4.0.d.ts" />
/// <reference path="missile.ts" />
/// <reference path="flak.ts" />
/// <reference path="city.ts" />

namespace mc {
    export class Scene {
        cities: City[] = [];
        fireInterval: number;

        constructor(public engine: ps.Engine, public dims: ps.Vector) {
            engine.mouse.setCustomCursor("assets/crosshair.png", new ps.Point(10, 10));

            // create cities
            let numberOfCities = 3;
            
            // flak allotment for each city
            let flakCount = 5;
            
            // distance between neighboring cities
            let spacing = dims.x / (numberOfCities + 1); 
            
            for (let i = 1; i < numberOfCities + 1; i++) {
                let city = new City(i * spacing, flakCount, this);
                engine.registerEntity(city);
                this.cities.push(city);
            }
    
            // make left mouse button shoot flak
            engine.mouse.addMouseDownEventListener((pos, button) => {
                if (button === 0) {
                    let city = this.getClosestCityWithFlak(this.cities, pos);
                    if (city) {
                        city.shoot(pos);
                    }
                }
            });
            
            // create incoming missiles
            this.fireInterval = setInterval(this.addMissile.bind(this), 1000);
        }

        addMissile() {
            let speed = Math.floor(Math.random() * 10 + 30);
            let missile = this.createMissile(Math.random() * this.dims.x, Math.random() * this.dims.x, speed)

            this.engine.registerEntity(missile); 
        }

        createMissile(initial_x: number, target_x: number, speed: number): Missile {
            return new Missile(new ps.Point(initial_x, this.dims.y), new ps.Point(target_x, 0), speed, "red");
        }

        getClosestCityWithFlak(cities: City[], pos: ps.Point): City {
            let closestCity: City;
            let closestDistance = Number.MAX_VALUE;

            for (let city of cities.filter(c => !c.destroyed && c.flakCount > 0)) {
                let distance = city.getGunPosition().distanceTo(pos);
                if (distance < closestDistance) {
                    closestCity = city;
                    closestDistance = distance; 
                }
            }

            return closestCity;
        }

        removeCity(city: City) {
            this.cities = this.cities.filter(c => c !== city);

            if (this.cities.length === 0) {
                clearInterval(this.fireInterval);
            }
        }

        isGameOver(): boolean {
            return this.cities.length === 0;
        }
    }
}