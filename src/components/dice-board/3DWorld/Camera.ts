import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
    constructor(aspect?: number) {
        super(25, aspect, 1, 1000000000);
        this.position.z = 2010;
    }
}