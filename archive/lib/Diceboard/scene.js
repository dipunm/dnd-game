import { Scene, Mesh, PlaneGeometry, MeshBasicMaterial, AmbientLight, SpotLight, TextureLoader, MeshPhongMaterial } from "three";
import { World } from "cannon";

const spot_light_color = 0xefdfd5;
const ambient_light_color = 0xf0f5fb;

function createFloor() {
    const geometry = new PlaneGeometry(1000, 1000, 1, 1);
    const material = new MeshPhongMaterial({ 
        ...{ color: 0x404040, shininess: 0, emissive: 0x858787 },
        transparent: true,
        opacity: 0.2,
        // map: new TextureLoader().load('/static/media/noisy-texture.ca608329.png'),
    });
    const floor = new Mesh(geometry, material);
    floor.receiveShadow = true;
    return floor;
}

function createAmbientLighting() {
    return new AmbientLight(ambient_light_color);
}

function createSpotlight() {
    const light = new SpotLight(spot_light_color, 1.2);
    // light.angle=0.5;
    // light.distance = 50000;
    light.position.set(-200, 1200, 1800);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 10000 * 5;
    light.shadow.camera.fov = 70;
    light.shadow.bias = 0.001;
    light.shadow.darkness = 1.1;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    return light;
}

/**
 * 
 * @param {Scene} scene 
 * @param {World} world 
 */
export const buildScene = () =>  {
    const scene = new Scene();
    scene.add(createFloor());
    scene.add(createAmbientLighting());
    scene.add(createSpotlight())
    return scene;
}