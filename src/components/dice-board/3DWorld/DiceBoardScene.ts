import { Scene, Mesh, PlaneGeometry, MeshPhongMaterial, AmbientLight, SpotLight, TextureLoader, Vector2, RepeatWrapping } from "three";
import { DiceBoardWorld, WorldMaterials } from "./DiceBoardWorld";
import { Body } from "cannon";
import { DieFactory } from "./DieFactory";

const ambient_light_color = 0xf0f5fb;
const spot_light_color = 0xefdfd5;

export class DiceBoardScene extends Scene {

    untouched: boolean;

    private hideWalls = true;
    constructor(world: DiceBoardWorld) {
        super();
        this.untouched = false; // should render at least once.
        const [ ambientlight, ...spotlights ] = this.createLighting();
        this.add(ambientlight);
        this.add(...spotlights);
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
                    if (!this.hideWalls) {
                        const wall = this.bodyMeshMap.find(map => map.body === body)?.mesh || this.createWall(body);
                        tmpMap.push({body, mesh: wall});
                        this.add(wall);
                    }
                    break;
                default:
                    console.warn('Unknown cannon body found. Cannot create a mesh to render.')
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
        const ambientlight = new AmbientLight(ambient_light_color, 0.5);
        const spotlight = new SpotLight(spot_light_color, ...Object.values({
            intensity: 0.2,
            distance: 12000,
            angle: Math.PI/2 * 0.95,
            penumbra: 0.5,
            decay: 0
        }));
        spotlight.position.set(0,0, 900);
        spotlight.target.position.set(0, 0, 0);
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 4096;
        spotlight.shadow.mapSize.height = 4096;

        const spotlight1 = spotlight.clone();
        spotlight1.position.set(3000, 3000, 1500);
        
        const spotlight2 = spotlight.clone();
        spotlight2.position.set(-3000, -3000, 1500);

        const spotlight3 = spotlight.clone();
        spotlight3.position.set(3000, -3000, 1500);

        const spotlight4 = spotlight.clone();
        spotlight4.position.set(-3000, 3000, 1500);
        
        spotlight.intensity = 1
        spotlight.penumbra = 1
        return [ 
            ambientlight,
            spotlight, 
            spotlight1, 
            spotlight2,
            spotlight3,
            spotlight4,
        ];
    }

    private createFloor(body: Body): Mesh {
        this.trackChange();
        const geometry = new PlaneGeometry(10000, 10000, 1, 1);
        const map = new TextureLoader().load('/noisy-texture.png', () => this.trackChange());
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.repeat = new Vector2(5, 5);
        const material = new MeshPhongMaterial({ 
            ...{ color: 0x40F0F4, shininess: 0, emissive: 0x222222 },
            map,
        });
        const floor = new Mesh(geometry, material);
        floor.position.set(body.position.x, body.position.y, body.position.z);
        floor.receiveShadow = true;
        return floor;
    }

    private createWall(body: Body): Mesh {
        this.trackChange();
        const geometry = new PlaneGeometry(10000, 10000, 1, 1);
        const material = new MeshPhongMaterial({ 
            ...{ color: 0x40F0F4, shininess: 0, emissive: 0x222222 },
        });
        const wall = new Mesh(geometry, material);
        wall.position.copy(body.position as any);
        wall.quaternion.copy(body.quaternion as any);
        return wall;
    }

    private createDie(body: Body): Mesh {
        this.trackChange();
        // console.log('faces:::', (body.shapes[0] as ConvexPolyhedron).faces.length)
        // var geometry = new BoxGeometry();
        // var material = new MeshPhongMaterial( { color: 0x00ff00 } );
        // var cube = new Mesh( geometry, material );
        const cube = DieFactory.createDieMesh(body);
        cube.position.copy(body.position as any)
        cube.quaternion.copy(body.quaternion as any)
        // console.log(body.shapes[0].boundingSphereRadius);
        // const scale = Math.floor(body.shapes[0].boundingSphereRadius);
        // const scale = 200;
        // cube.scale.set(scale, scale, scale)
        cube.castShadow = true;
        return cube;
    }
}
