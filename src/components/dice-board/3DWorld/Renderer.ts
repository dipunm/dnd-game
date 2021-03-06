import { Camera } from "./Camera";
import { WebGLRenderer, PCFShadowMap } from "three";
import { DiceBoardWorld } from "./DiceBoardWorld";

class CustomisedRenderer extends WebGLRenderer {
    constructor() {
        super({ antialias: true, alpha: true });
        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFShadowMap;
        this.setClearColor(0xafafaf, 0);
    }
}

const isVisible = (elem: HTMLElement) => !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );

export class Renderer {
    camera: Camera;
    world: DiceBoardWorld;
    containerEl?: HTMLElement;
    renderer = new CustomisedRenderer();

    constructor(camera: Camera, world: DiceBoardWorld) {
        this.camera = camera;
        this.world = world;
    }

    renderTo(containerEl: HTMLElement) {
        if (this.containerEl) {
            this.stop();
        }
        
        this.containerEl = containerEl;
        window.addEventListener('resize', () => {
            this.adjustForContainer();
            this.render();
        });
        this.adjustForContainer();
        
        this.containerEl.appendChild(this.renderer.domElement);
        this.startAnimation();
    }

    stop() {
        this.stopAnimation();
        delete this.containerEl;
    }

    private animation?: number
    private startAnimation() {
        if (this.animation)
            throw new Error('Cannot start animation because an animation is already in progress.');

        if (!this.containerEl)
            throw new Error('Cannot start animation without a container to render to.')

        let lastTime = 0;
        const animate = (time: number) => {
            this.animation = requestAnimationFrame(animate);

            if (lastTime !== 0) {
                const dt = (time - lastTime) / 1000;
                this.world.step(1/60, dt);
            }
            lastTime = time;
            
            if (
                !isVisible(this.containerEl!) ||
                this.containerEl!.clientWidth * this.containerEl!.clientHeight === 0
            ) {
                // skip rendering.
                return;
            }
            
            if (
                this.renderer.domElement.width !== this.containerEl!.clientWidth ||
                this.renderer.domElement.height !== this.containerEl!.clientHeight
            ) {
                this.adjustForContainer();
            }

            if (!this.world.scene.untouched) {
                this.render();
                this.world.scene.resetChangeTracker();
            }
        }
        this.animation = requestAnimationFrame(animate);
    }

    private stopAnimation() {
        if (this.animation) cancelAnimationFrame(this.animation);
        delete this.animation;
    }

    private adjustForContainer() {
        const [width, height] = [this.containerEl!.clientWidth, this.containerEl!.clientHeight];
        const aspect = width / height;
        this.camera.aspect = aspect;
        this.camera.zoom = Math.min(aspect, 1);
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    }

    private render() {
        this.renderer.render(this.world.scene, this.camera);
    } 
}