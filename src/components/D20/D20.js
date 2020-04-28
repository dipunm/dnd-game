import React, { useState } from 'react';
import './D20.css';

export default () => {
    const [value, setValue] = useState();
    const roll = () => {
        const rand = Math.floor(Math.random() * 20) + 1
        if (value === rand) {
            setValue(undefined);
            setTimeout(() => setValue(rand), 700);
        } else {
            setValue(rand);
        }
    }
    return (<>
        <section class="cube-container">
            <div id="cube" className={`show-${value}`}>
                <figure class="face01">1</figure>
                <figure class="face02">2</figure>
                <figure class="face03">3</figure>
                <figure class="face04">4</figure>
                <figure class="face05">5</figure>
                <figure class="face06">6</figure>
                <figure class="face07">7</figure>
                <figure class="face08">8</figure>
                <figure class="face09">9</figure>
                <figure class="face10">10</figure>
                <figure class="face11">11</figure>
                <figure class="face12">12</figure>
                <figure class="face13">13</figure>
                <figure class="face14">14</figure>
                <figure class="face15">15</figure>
                <figure class="face16">16</figure>
                <figure class="face17">17</figure>
                <figure class="face18">18</figure>
                <figure class="face19">19</figure>
                <figure class="face20">20</figure>
            </div>

        </section>
        <button onClick={roll}>Spin</button>
    </>
    )
}