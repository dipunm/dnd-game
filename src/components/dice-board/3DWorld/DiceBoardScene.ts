import { Scene, Mesh, PlaneGeometry, MeshPhongMaterial, AmbientLight, SpotLight } from "three";
import { DiceBoardWorld } from "./DiceBoardWorld";
import { Body } from "cannon";

const ambient_light_color = 0xf0f5fb;
const spot_light_color = 0xefdfd5;

export class DiceBoardScene extends Scene {
    constructor(world: DiceBoardWorld) {
        super();

        const { ambientlight, spotlight } = this.createLighting();
        this.add(ambientlight, spotlight);

        world.bodies.forEach(body => {
            switch(body.material) {
                case world.MATERIALS.floor:
                    const floor = this.createFloor(body);
                    this.add(floor);
                    break;
                case world.MATERIALS.dice:
                    console.log('I\'d render the dice here...');
                    break;
                case world.MATERIALS.wall:
                default:
                    // no need to render walls
                    break;
            }
        });
    }

    private createLighting() {
        const ambientlight = new AmbientLight(ambient_light_color);
        const spotlight = new SpotLight(spot_light_color, ...Object.values({
            intensity: 1.2,
            distance: 50000,
            angle: 0.5,
        }));
        spotlight.position.set(-200, 1200, 1800);
        spotlight.target.position.set(0, 0, 0);
        spotlight.castShadow = true;
        spotlight.shadow.camera.near = 200;
        spotlight.shadow.camera.far = 10000 * 5;
        spotlight.shadow.camera.fov = 70;
        spotlight.shadow.bias = 0.001;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        return { ambientlight, spotlight };
    }

    private createFloor(body: Body): Mesh {
        const geometry = new PlaneGeometry(1000, 1000, 1, 1);
        const material = new MeshPhongMaterial({ 
            ...{ color: 0x404040, shininess: 0, emissive: 0x858787 },
            transparent: true,
            opacity: 0.2,
            // map: new TextureLoader().load('/static/media/noisy-texture.ca608329.png'),
        });
        const floor = new Mesh(geometry, material);
        floor.position.set(body.position.x, body.position.y, body.position.z);
        floor.receiveShadow = true;
        return floor;
    }
}
