import { PerspectiveCamera } from "three";

export const createCamera = (aspect) => {
    const camera = new PerspectiveCamera(25, aspect, 1, 1000000000);
    camera.position.z = 2010;
    return camera;
}