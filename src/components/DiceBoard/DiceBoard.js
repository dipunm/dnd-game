import React, { useRef, useEffect, forwardRef } from 'react';
import './DiceBoard.css';
import { DiceBoardController } from '../../lib/DiceBoardController';
import lintTexture from './noisy-texture.png';
import woodTexture from './wood-texture.png';

const staticEmptyMarkup = {__html: ''};
const UnmanagedEmptyDiv = forwardRef((props, ref) =>  {
    if (props.children) throw new Error('UnmanagedEmptyDiv should not contain children.');
    return (<div {...props} ref={ref} dangerouslySetInnerHTML={staticEmptyMarkup} />);
});

export default function DiceBoard() {
    const canvasRef = useRef(null);
    const diceBoardRef = useRef(null);
    const diceBoard = diceBoardRef.current;
    window.db = diceBoard;
    useEffect(() => {
       diceBoardRef.current = new DiceBoardController(canvasRef.current);
    }, [canvasRef]);

    const borderThickness = 40;
    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'row', 
            width: '100%', 
            height:'100%',
            overflow: 'hidden',
        }}>
            
            {/* React will not touch the contents of this div. 
                It is safe to manipulate dom within this div. */}
            <UnmanagedEmptyDiv style={{
                flexGrow: 1,
                border: `solid`,
                borderWidth: `min(${borderThickness}px, 5vw, 5vh)` , 
                borderImage: `url(${woodTexture})`,
                borderImageSlice: '50 50',
                background: `url(${lintTexture})`,
                outline: '2px solid black',
                boxShadow: 'inset 0 0 10px 10px #000',
                overflow: 'hidden',
            }} ref={canvasRef} />
        </div>
    )
}