import React, { useRef, useEffect, forwardRef, useState, useMemo } from 'react';
import './DiceBoard.css';
import { DiceBoardController } from '../../../lib/DiceBoardController';
import lintTexture from './noisy-texture.png';
import woodTexture from './wood-texture.png';

const staticEmptyMarkup = {__html: ''};
const UnmanagedEmptyDiv = forwardRef((props, ref) =>  {
    if (props.children) throw new Error('UnmanagedEmptyDiv should not contain children.');
    return (<div {...props} ref={ref} dangerouslySetInnerHTML={staticEmptyMarkup} />);
});

export default function DiceBoard({ notation = 'd20', reason = 'initiative', onResult }) {
    const canvasRef = useRef(null);
    const diceBoardRef = useRef(null);
    const [rolled, setRolled] = useState(false);
    const [result, setResult] = useState(null);
    const diceBoard = diceBoardRef.current;
    useEffect(() => {
       diceBoardRef.current = new DiceBoardController(canvasRef.current);
    }, [canvasRef]);

    
    const dice = useMemo(() => {
        if (/^(\d*d\d+)(\d*d\d+[+])*$/.test(notation)){
            return (notation.match(/\d+d\d+/g) || [ '3d20' ]).reduce((agg, x) => {
                const multiple = parseInt(x);
                if (Number.isNaN(multiple)) {
                    return [...agg, x];
                } else {
                    const die = x.match(/d\d+/)[0];
                    return [...agg, ...Array(multiple).fill(die)]
                }
            }, []);
        } else {
            throw new Error(`${notation} is not valid dice notation.`)
        }
    }, [notation]);

    const displayResults = (values) => {
        setResult(
                <>{values.join(' + ')} = {values.reduce((sum, n) => sum + n, 0)}
                <br />
                <u>close</u>
                </>);
    };

    function roll() {
        diceBoard.roll(dice).then(displayResults);
        setRolled(true);
    }

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

            {!rolled && (
                <div className="DiceBoard-overlay" onClick={roll}>
                    Roll a {notation}{reason ? ` for ${reason}` : null}
                </div>
            )}
            {rolled && result && (
                <div className="DiceBoard-overlay" onClick={() => onResult(result)}>
                    {result}
                </div>
            )}
        </div>
    )
}