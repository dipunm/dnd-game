import { createWorld } from './Diceboard/world';
import { createRenderer, updateRenderer } from './Diceboard/renderer';
import { buildScene } from './Diceboard/scene';
import { createCamera } from './Diceboard/camera';
import * as creators from './Diceboard/dice';
import { Vector3, Quaternion } from 'three';


export class DiceBoardController {
    constructor(container) {
        this.stillCounter = 0;
        this.container = container;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.aspect = this.width / this.height;        

        this.renderer = createRenderer();
        this.dice = [];

        // Creates the physical world for physics engine.
        this.world = createWorld(this.width, this.height);
        // creates equivalent scene for rendering.
        this.scene = buildScene();

        this.camera = createCamera(this.aspect);
        updateRenderer(this.renderer, {
            width: this.width,
            height: this.height,
            scene: this.scene,
            camera: this.camera
        });
        
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.resize());

        this.startAnimation();
    }

    startAnimation() {
        console.log('starting animation');
        if (this.animation) {
            return;
        }

        let lastTime;
        const fixedTimeStep = 1.0 / 60.0;
        const animate = (time) => {
            this.animation = requestAnimationFrame(animate);

            if (lastTime !== undefined) {
                var dt = (time - lastTime) / 1000;
                console.log('tick');
                this.world.step(fixedTimeStep, dt, 3);
                this.detectResults();
            }

            lastTime = time;
            this.dice.forEach(die => {
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
        this.animation = requestAnimationFrame(animate)
    }

    roll(dice) {
        setTimeout(() => {
            if (this.dice.length) {
                this.dice.forEach(die => {
                    this.world.remove(die.body);
                    this.scene.remove(die.mesh);
                });
                this.dice.splice(0);
            }
            console.log(dice);
            const newDice = dice.map(die_name => creators[`create_${die_name}`]());
            this.dice.push(...newDice);
            newDice.forEach(die => {
                this.world.addBody(die.body);
                this.scene.add(die.mesh);
            });
            this.startAnimation();
        }, 100)

        if (this.lastPromise) {
            this.lastPromise.reject();
        }
        return new Promise((resolve, reject) => this.lastPromise = { resolve, reject });
    }

    detectResults() {
        const diff = this.dice.reduce((agg, die) => {
            const bodyPos = new Vector3(die.body.position.x, die.body.position.y, die.body.position.z);
            const bodyQuat = new Quaternion(die.body.quaternion.x, die.body.quaternion.y, die.body.quaternion.z, die.body.quaternion.w);
            return (
                agg + 
                Math.abs(die.mesh.position.distanceTo(bodyPos)) + 
                Math.abs(die.mesh.quaternion.angleTo(bodyQuat))
            );
        }, 0);

        console.log('diff', diff);
        if (diff <= 1) {
            this.stillCounter++;
        } else {
            this.stillCounter = 0;
        }

        const n30_FRAMES = 30;
        if (this.stillCounter > n30_FRAMES) {
            console.log('stopping animation');
            cancelAnimationFrame(this.animation);
            this.animation = null;
            if (this.lastPromise) {
                const values = this.readDice();
                if (!values.length) return;
                this.lastPromise.resolve(values);
            }
        }
    }

    readDice() {
        return this.dice.map(({mesh}) => {
            const diceFaces = mesh.geometry.faces.filter(face => face.materialIndex !== 0);
            const faceDirection = diceFaces.length === 4 ? new Vector3(0,0,-1) : new Vector3(0,0,1)
            const upFace = diceFaces.reduce((agg, face) => {
                    var angle = face.normal.clone().applyQuaternion(mesh.quaternion).angleTo(faceDirection);
                    if (angle < agg.angle) {
                        return { face, angle };
                    } else {
                        return agg;
                    }
                }, {face: null, angle: Number.MAX_VALUE}).face;
            
            return upFace.materialIndex - 1;
        });
    }

    dispose() {
        if (this.lastPromise) {
            this.lastPromise.reject();
        } 
        cancelAnimationFrame(this.animation);
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
} 