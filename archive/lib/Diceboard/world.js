import { World, Body, Plane, NaiveBroadphase, Vec3, Material, ContactMaterial } from "cannon"

export const materials = {
    floor: new Material('floor'),
    wall: new Material('wall'),
    dice: new Material('dice'),
};

function createFloor() {
    return new Body({ mass: 0, shape: new Plane(), material: materials.floor });
}

function createWalls(width, height) {
    return [
        { vec: [0,1], mult: 1, xpos: -width/2 },
        { vec: [0,1], mult: -1, xpos: width/2 },
        { vec: [1,0], mult: 1, ypos: height/2 },
        { vec: [1,0], mult: -1, ypos: -height/2 },
    ].map(({ vec, mult, xpos = 0, ypos = 0 }) => {
        const barrier = new Body({ mass: 0, shape: new Plane(), material: materials.wall });
        barrier.quaternion.setFromAxisAngle(new Vec3(...vec, 0), mult * Math.PI / 2);
        barrier.position.set(xpos, ypos, 0);
        return barrier;
    });
}

const GRAVITY = 9.8;

export const createWorld = (width, height) => {
    const world = new World();
    world.gravity.set(0, 0, -GRAVITY * 700);
    world.broadphase = new NaiveBroadphase();
    world.solver.iterations = 50;

    world.add(createFloor());
    createWalls(width, height).map(wall => world.add(wall));

    world.addContactMaterial(new ContactMaterial(materials.floor, materials.dice, { friction: 0.01, restitution: 0.5 }));
    world.addContactMaterial(new ContactMaterial(materials.wall, materials.dice, { friction: 0, restitution: 1.0 }));
    world.addContactMaterial(new ContactMaterial(materials.dice, materials.dice, { friction: 0, restitution: 0.5 }));

    return world;
}