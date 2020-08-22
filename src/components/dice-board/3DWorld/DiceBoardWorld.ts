import { World, NaiveBroadphase, ContactMaterial, Material, Body, Plane, Vec3 } from "cannon";
import { DiceBoardScene } from "./DiceBoardScene";
import { DieMaterial, DieFactory } from "./DieFactory";
import { Camera } from "./Camera";

export const WorldMaterials = {
    floor: new Material('floor'),
    wall: new Material('wall'),
    dice: DieMaterial,
}

export class DiceBoardWorld extends World {
    readonly GRAVITY = 9.8 * 400;

    readonly scene: DiceBoardScene;
    private dice: Body[];
    constructor(camera: Camera) {
        super();
        this.scene = new DiceBoardScene(this);
        this.dice = [];

        const viewingRadius = Math.abs(Math.tan((camera.fov / 2) * (Math.PI / 180)) * camera.position.z) -50;
        this.gravity.set(0, 0, -this.GRAVITY);
        this.broadphase = new NaiveBroadphase();
        this.solver.iterations = 50;

        this.addBody(this.createFloor());
        this.createWalls(viewingRadius * 2, viewingRadius * 2).map(wall => this.addBody(wall));

        this.addContactMaterial(new ContactMaterial(WorldMaterials.floor, WorldMaterials.dice, { friction: 0.01, restitution: 0.5 }));
        this.addContactMaterial(new ContactMaterial(WorldMaterials.wall, WorldMaterials.dice, { friction: 0, restitution: 1.0 }));
        this.addContactMaterial(new ContactMaterial(WorldMaterials.dice, WorldMaterials.dice, { friction: 0, restitution: 0.5 }));
        
        this.scene.illustrate(this);
    }

    private createFloor(): Body {
        const floor = new Body({ mass: 0, shape: new Plane(), material: WorldMaterials.floor });
        return floor;
    }

    private createWalls(width: number, height: number): Body[] {
        return [
            { vec: [0,1], mult: 1, xpos: -width/2 },
            { vec: [0,1], mult: -1, xpos: width/2 },
            { vec: [1,0], mult: 1, ypos: height/2 },
            { vec: [1,0], mult: -1, ypos: -height/2 },
        ].map(({ vec, mult, xpos = 0, ypos = 0 }) => {
            const barrier = new Body({ mass: 0, shape: new Plane(), material: WorldMaterials.wall });
            barrier.quaternion.setFromAxisAngle(new Vec3(...vec, 0), mult * Math.PI / 2);
            barrier.position.set(xpos, ypos, 0);
            return barrier;
        });
    }

    clearDice() {
        this.dice.forEach(die => this.remove(die));
        this.dice.splice(0);
    }

    playDice(...diceCodes: string[]) {
        this.clearDice();
        this.dice.push(
            ...diceCodes.map(code => {
                const die = DieFactory.buildDie(code);
                die.position.z = 900;
                die.velocity.set(3990, 4000, 0);
                die.angularVelocity.set(10,1,9);

                return die;
            }));

        this.dice.forEach(die => this.addBody(die));
        this.scene.illustrate(this);
    }

    step(dy: number, timeSinceLastCalled?: number, maxSubSteps?: number) {
        super.step(dy, timeSinceLastCalled, maxSubSteps);
        this.scene.illustrate(this);
    }
}
