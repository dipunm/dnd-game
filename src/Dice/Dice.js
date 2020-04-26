import React, { useRef } from 'react';
import CANNON from 'cannon';
import THREE from 'three';
import './Dice.css';

canvasMarkup = ({}) => ({ __html: `<canvas />`})

export default function Dice() {
    const ref = useRef();
    return (
        <div ref={ref} dangerouslySetInnerHTML={canvasMarkup()} />
    )
}