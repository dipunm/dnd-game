import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
    constructor(aspect?: number) {
        const field_of_view = 75; // observable area measured in degrees.
        const clip_near = 1; // objects nearer that this will be culled.
        const clip_far = 1000000000; // objects farther than this will be culled.
        super(field_of_view, aspect, clip_near, clip_far)
        this.position.z = 1000;
    }
}