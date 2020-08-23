import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
    constructor(aspect: number = 1) {
        const distance_from_floor = 8000;
        const field_of_view = 21; // observable area measured in degrees. Smaller angle = less skewing on edges.
        const clip_near = 100; // objects nearer that this will be culled.
        const clip_far = distance_from_floor; // objects farther than this will be culled.
        super(field_of_view, aspect, clip_near, clip_far)
        this.position.z = distance_from_floor;
    }
}