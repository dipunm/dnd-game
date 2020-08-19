import { useRef, useEffect, useCallback } from "react";
import { Renderer } from "./3DWorld/Renderer";
import { Camera } from "./3DWorld/Camera";
import { DiceBoardWorld } from "./3DWorld/DiceBoardWorld";


export function useDiceBoardRenderer() {
    const tmpContainerRef = useRef<HTMLElement>();
    const rendererRef = useRef<Renderer>();

    useEffect(() => {
        if (!rendererRef.current) {
            const world = new DiceBoardWorld(100, 100);
            rendererRef.current = new Renderer(new Camera(), world);
            world.playDice('d6');
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