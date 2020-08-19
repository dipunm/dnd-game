import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
    constructor(aspect?: number) {
        const distance_from_floor = 1000;
        const field_of_view = 75; // observable area measured in degrees.
        const clip_near = 100; // objects nearer that this will be culled.
        const clip_far = distance_from_floor; // objects farther than this will be culled.
        super(field_of_view, aspect, clip_near, clip_far)
        this.position.z = distance_from_floor;
    }
}