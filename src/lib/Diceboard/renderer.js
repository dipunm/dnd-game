import { WebGLRenderer, PCFShadowMap } from "three";

export const  createRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    renderer.setClearColor(0xafafaf, 0);
    return renderer;
}

/**
 * 
 * @param {WebGLRenderer} renderer 
 * @param {*} param1 
 */
export const updateRenderer = (renderer, {width, height, scene, camera}) => {
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
}