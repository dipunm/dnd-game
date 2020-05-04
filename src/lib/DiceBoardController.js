import { Body, Vec3 } from 'cannon';
import { createWorld } from './Diceboard/world';
import { createRenderer, updateRenderer } from './Diceboard/renderer';
import { buildScene } from './Diceboard/scene';
import { createCamera } from './Diceboard/camera';
import { create_d6, create_d4 } from './Diceboard/dice';


export class DiceBoardController {
    constructor(container) {
        this.container = container;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.aspect = this.width / this.height;        

        this.renderer = createRenderer();
        const dice = [
            // create_d4(45, [ 50, -50, 200 ]),
            create_d6(45, [ 0, -100, 200 ]),
            create_d6(45, [ -50, 50, 200 ]),
            // create_d4(45, [0, 0, 400])
        ];

        // Creates the physical world for physics engine.
        this.world = createWorld(this.width, this.height);
        // creates equivalent scene for rendering.
        this.scene = buildScene();

        dice.forEach(die => {
            this.world.addBody(die.body);
            this.scene.add(die.mesh);
        })

        this.camera = createCamera(this.aspect);
        updateRenderer(this.renderer, {
            width: this.width,
            height: this.height,
            scene: this.scene,
            camera: this.camera
        });
        
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.resize());

        let lastTime;
        const fixedTimeStep = 1.0 / 60.0;
        const animate = (time) => {
            requestAnimationFrame(animate);

            if (lastTime !== undefined) {
                var dt = (time - lastTime) / 1000;
                this.world.step(fixedTimeStep, dt, 3);
            }

            lastTime = time;
            dice.forEach(die => {
                die.mesh.position.copy(die.body.position);
                die.mesh.quaternion.copy(die.body.quaternion);
            });

            updateRenderer(this.renderer, {
                width: this.width,
                height: this.height,
                scene: this.scene,
                camera: this.camera
            });
        };
        let animation = requestAnimationFrame(animate)
    }

    roll(time) {
//        setTimeout(() => requestAnimationFrame((t) => this.roll(t)), 100);
        // requestAnimationFrame((t) => this.roll(t))

        if(this.lastTime !== undefined){
            this.world.step(1/60, time);
        }
        this.lastTime = time;

        for (var i in this.scene.children) {
            var interact = this.scene.children[i];
            if (interact.body != undefined) {
                interact.position.copy(interact.body.position);
                interact.quaternion.copy(interact.body.quaternion);
            }
        }

        // console.log('ITEMS', this.world.world.bodies.length)
        // const body = this.scene.children.filter(c => c.body).map(c => c.body)[0];
        // const output = {
        //     x: body.position.x, 
        //     y: body.position.y,
        //     z: body.position.z
        // };
        // if (window.output) {
        //     const diffs = {
        //         x: Math.abs(output.x - window.output.x),
        //         y: Math.abs(output.y - window.output.y),
        //         z: Math.abs(output.z - window.output.z),
        //     };
        //     const diff = diffs.x + diffs.y + diffs.z
        //     if (window.stop !== true)
        //         console.log('DIFF', diff);
        // }
        // window.output = output;

        this.renderer.render(this.scene, this.camera);
    }


    
    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.aspect = this.width / this.height;

        this.camera.aspect = this.aspect;
        this.renderer.setSize(this.width, this.height, false);
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    addDice(dice, position = {x: 0, y: 0, z: 0}, velocity = {x: 0, y: 0, z: 0}, angle = {x: 0, y: 0, z: 0}, axis = {x: 0, y: 0, z: 0, a: 10}) {
        position = Object.assign({x: 0, y: 0, z: 0}, position);
        velocity = Object.assign({x: 0, y: 0, z: 0}, velocity);
        angle = Object.assign({x: 0, y: 0, z: 0}, angle);
        axis = Object.assign({x: 0, y: 0, z: 0, a: 0}, axis);

        dice.castShadow = true;
        dice.body = new Body({
            mass: dice.mass,
            shape: dice.geometry.cannon_shape,
            // TODO: use dice_body_material to reduce material creation.
            // material: this.dice_body_material,
        });
        dice.body.position.set(position.x, position.y, position.z);
        dice.body.quaternion.setFromAxisAngle(new Vec3(axis.x, axis.y, axis.z), axis.a * Math.PI * 2);
        dice.body.angularVelocity.set(angle.x, angle.y, angle.z);
        dice.body.velocity.set(velocity.x, velocity.y, velocity.z);
        dice.body.linearDamping = 0.1;
        dice.body.angularDamping = 0.1;
        this.scene.add(dice);
        // this.dices.push(dice);
        this.world.add(dice.body);
    }
} 