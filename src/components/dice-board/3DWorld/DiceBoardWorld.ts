import { World, NaiveBroadphase, ContactMaterial, Material, Body, Plane, Vec3 } from "cannon";
import { DiceBoardScene } from "./DiceBoardScene";

export class DiceBoardWorld extends World {
    readonly GRAVITY = 9.8;
    readonly MATERIALS = {
        floor: new Material('floor'),
        wall: new Material('wall'),
        dice: new Material('dice'),
    }

    readonly scene: DiceBoardScene;
    private dice: Body[];
    constructor(width: number, height: number) {
        super();
        this.scene = new DiceBoardScene(this);
        this.dice = [];

        this.gravity.set(0, 0, -this.GRAVITY * 700);
        this.broadphase = new NaiveBroadphase();
        this.solver.iterations = 50;

        this.addBody(this.createFloor());
        this.createWalls(width, height).map(wall => this.addBody(wall));

        this.addContactMaterial(new ContactMaterial(this.MATERIALS.floor, this.MATERIALS.dice, { friction: 0.01, restitution: 0.5 }));
        this.addContactMaterial(new ContactMaterial(this.MATERIALS.wall, this.MATERIALS.dice, { friction: 0, restitution: 1.0 }));
        this.addContactMaterial(new ContactMaterial(this.MATERIALS.dice, this.MATERIALS.dice, { friction: 0, restitution: 0.5 }));
    }

    clear() {
        this.dice.splice(0);
    }

    playDice(...diceCodes: string[]) {
        this.clear();
        this.dice.push(...diceCodes
            .map(code => { throw new Error('TODO: Create dice?' + code)}));
    }

    step(dy: number, timeSinceLastCalled?: number, maxSubSteps?: number) {
        super.step(dy, timeSinceLastCalled, maxSubSteps);
        this.dice.forEach(die => {
            // copy the following into scene's dice mesh
            // die.position
            // die.quaternion
        })
    }

    private createFloor(): Body {
        return new Body({ mass: 0, shape: new Plane(), material: this.MATERIALS.floor });
    }

    private createWalls(width: number, height: number): Body[] {
        return [
            { vec: [0,1], mult: 1, xpos: -width/2 },
            { vec: [0,1], mult: -1, xpos: width/2 },
            { vec: [1,0], mult: 1, ypos: height/2 },
            { vec: [1,0], mult: -1, ypos: -height/2 },
        ].map(({ vec, mult, xpos = 0, ypos = 0 }) => {
            const barrier = new Body({ mass: 0, shape: new Plane(), material: this.MATERIALS.wall });
            barrier.quaternion.setFromAxisAngle(new Vec3(...vec, 0), mult * Math.PI / 2);
            barrier.position.set(xpos, ypos, 0);
            return barrier;
        });
    }

}
