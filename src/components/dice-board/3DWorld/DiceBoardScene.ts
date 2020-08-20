import { Scene, Mesh, PlaneGeometry, MeshPhongMaterial, AmbientLight, SpotLight, BoxGeometry, TextureLoader, Vector2, RepeatWrapping } from "three";
import { DiceBoardWorld, WorldMaterials } from "./DiceBoardWorld";
import { Body } from "cannon";

const ambient_light_color = 0xf0f5fb;
const spot_light_color = 0xefdfd5;

export class DiceBoardScene extends Scene {

    untouched: boolean;

    constructor(world: DiceBoardWorld) {
        super();
        this.untouched = false; // should render at least once.
        const { ambientlight, spotlight } = this.createLighting();
        this.add(ambientlight);
        this.add(spotlight);
        this.illustrate(world);
    }


    private bodyMeshMap: { body: Body, mesh: Mesh }[] = [];
    illustrate(world: DiceBoardWorld) {
        const tmpMap: { body: Body, mesh: Mesh }[] = [];
        world.bodies.forEach(body => {
            switch(body.material) {
                case WorldMaterials.floor:
                    const floor = this.bodyMeshMap.find(map => map.body === body)?.mesh || this.createFloor(body);
                    tmpMap.push({body, mesh: floor});
                    this.add(floor);
                    break;
                case WorldMaterials.dice:
                    const die = this.bodyMeshMap.find(map => map.body === body)?.mesh || this.createDie(body);
                    if (
                        Math.abs(die.position.distanceTo(body.position as any)) > 1 ||
                        Math.abs(die.quaternion.angleTo(body.quaternion as any)) > 1
                    ) {
                        this.trackChange();
                        die.position.copy(body.position as any);
                        die.quaternion.copy(body.quaternion as any);
                    }
                    tmpMap.push({body, mesh: die});
                    this.add(die);
                    break;
                case WorldMaterials.wall:
                default:
                    // no need to render walls
                    break;
            }
        });
        this.bodyMeshMap = tmpMap;
    }

    resetChangeTracker() {
        this.untouched = true;
    }

    private trackChange() {
        this.untouched = false;
    }

    private createLighting() {
        this.trackChange();
        const ambientlight = new AmbientLight(ambient_light_color, 0.3);
        const spotlight = new SpotLight(spot_light_color, ...Object.values({
            intensity: 0.8,
            distance: 5000,
            angle: 10,
        }));
        spotlight.position.set(100, 100, 500);
        spotlight.target.position.set(0, 0, 0);
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 4096;
        spotlight.shadow.mapSize.height = 4096;
        // spotlight.shadow.camera.near = 200;
        // spotlight.shadow.camera.far = 10000 * 5;
        // spotlight.shadow.camera.fov = 70;
        // spotlight.shadow.bias = 0.001;
        // spotlight.shadow.mapSize.width = 1024;
        // spotlight.shadow.mapSize.height = 1024;
        return { ambientlight, spotlight };
    }

    private createFloor(body: Body): Mesh {
        this.trackChange();
        const geometry = new PlaneGeometry(10000, 10000, 1, 1);
        const map = new TextureLoader().load('/noisy-texture.png', () => this.trackChange());
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.repeat = new Vector2(30, 30);
        const material = new MeshPhongMaterial({ 
            ...{ color: 0x40F0F4, shininess: 0, emissive: 0x222222 },
            map,
        });
        const floor = new Mesh(geometry, material);
        floor.position.set(body.position.x, body.position.y, body.position.z);
        floor.receiveShadow = true;
        return floor;
    }

    private createDie(body: Body): Mesh {
        this.trackChange();
        var geometry = new BoxGeometry();
        var material = new MeshPhongMaterial( { color: 0x00ff00 } );
        var cube = new Mesh( geometry, material );
        cube.rotateY(2);
        cube.rotateX(-0.8);
        cube.position.copy(body.position as any)
        cube.quaternion.copy(body.quaternion as any)
        cube.scale.set(body.shapes[0].boundingSphereRadius, body.shapes[0].boundingSphereRadius, body.shapes[0].boundingSphereRadius)
        cube.position.set(0, 0, 50)
        cube.castShadow = true;
        return cube;
    }
}
