import React, { useRef, useEffect } from 'react';
import CANNON from 'cannon';
import three from 'three';
import './Dice.css';

canvasMarkup = ({}) => ({ __html: `<canvas />`})

export default function Dice() {
    const ref = useRef();
    useEffect();
    return (
        <div ref={ref} dangerouslySetInnerHTML={canvasMarkup()} />
    )
}