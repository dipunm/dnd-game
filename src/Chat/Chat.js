import React, { useState, useEffect, useRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './Chat.css';

const ENTER = 13;

export default function () {
    const [text, setText] = useState("");
    const [autoScroll, setAutoScroll] = useState(true);
    const contentsRef = useRef(null);
    const messages = [];
    let submitting = false;
    const keyDown = e => {
        if (e.nativeEvent.keyCode === ENTER && !e.nativeEvent.shiftKey) {
            submitting = true;
        }
    };

    const keyUp = () => {
        submitting = false;
    }

    const changeHandler = e => {
        if (!submitting) {
            setText(e.target.value);
        } else {
            setText("");
        }
    }


    const onScroll = e => {
        if (!contentsRef.current) 
            return;
        
        const { scrollHeight, scrollTop, offsetHeight } = contentsRef.current;

        if (scrollTop < (scrollHeight - offsetHeight - 2)) {
            setAutoScroll(false);
        } else {
            setAutoScroll(true);
        }
        
    }

    useEffect(() => {
        if (!contentsRef.current)
            return;

        if (autoScroll) {
            setTimeout(() =>{
                contentsRef.current.scrollTop = contentsRef.current.scrollHeight;
            });
        }
    }, [contentsRef, text, autoScroll])

    return (
        <div className="Chatbox">
            <div ref={contentsRef} onScroll={onScroll} className="Chatbox-contents">
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>

                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>

                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>

                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>

                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>

                <div className="Chatbox-entry">
                    <div className="Img">A</div>
                    <p>Hello world</p>
                    <div style={{clear: "both"}} />
                </div>
            </div>
            <div className="Chatbox-bar">
                <TextareaAutoSize onKeyDown={keyDown} onKeyUp={keyUp} value={text} onChange={changeHandler} className="Chatbox-input" />
                <button className="Chatbox-submit">➤</button>
            </div>
        </div>
    )
}