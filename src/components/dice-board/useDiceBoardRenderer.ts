import { useRef, useEffect, useCallback } from "react";
import { Renderer } from "./3DWorld/Renderer";
import { Camera } from "./3DWorld/Camera";
import { DiceBoardWorld } from "./3DWorld/DiceBoardWorld";


export function useDiceBoardRenderer() {
    const tmpContainerRef = useRef<HTMLElement>();
    const rendererRef = useRef<Renderer>();

    useEffect(() => {
        if (!rendererRef.current) {
            const camera = new Camera();
            const world = new DiceBoardWorld(camera);
            rendererRef.current = new Renderer(camera, world);
            world.playDice('d4', 'd10', 'd20', 'd6', 'd8', 'd12', 'd100');
        }

        if (tmpContainerRef.current) {
            rendererRef.current.renderTo(tmpContainerRef.current);
            tmpContainerRef.current = undefined;
        }
        
        return () => rendererRef.current?.stop(); // cleanup
    }, []);
    
    const containerCallbackRef = useCallback<(c: HTMLElement | null) => void>(container => {
        if (!container || container === tmpContainerRef.current) return;

        if (rendererRef.current) {
            const renderer = rendererRef.current;
            renderer.renderTo(container);
        } else {
            // save for later when the effect runs.
            tmpContainerRef.current = container;
        }
    }, []);

    return containerCallbackRef;
}