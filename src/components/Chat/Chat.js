import React, { useState, useEffect, useRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './Chat.css';

const ENTER = 13;

export default function () {
    const [autoScroll, setAutoScroll] = useState(true);
    const contentsRef = useRef(null);

    const updateAutoScroll = e => {
        const { scrollHeight, scrollTop, offsetHeight } = contentsRef.current;

        if (scrollTop < (scrollHeight - offsetHeight - 2)) {
            setAutoScroll(false);
        } else {
            setAutoScroll(true);
        }        
    }

    useEffect(() => {
        let handle = false;
        const { scrollTop, scrollHeight } = contentsRef.current;
        if (autoScroll) {
            handle = setInterval(() =>{
                if (scrollTop === scrollHeight) return;
                contentsRef.current.scrollTop = scrollHeight;
            }, 50);
        }
        return () => handle && clearInterval(handle);
    }, [autoScroll])

    const doSubmit = (text) => {
        const trimmed = text.trim();
        if (trimmed) {
            console.log(trimmed);
            return true;
        }

        return false;
    }

    return (
        <div className="Chatbox">
            <div ref={contentsRef} onScroll={updateAutoScroll} className="Chatbox-contents">
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
            <ChatboxBar onSubmit={text => doSubmit(text)} />
        </div>
    )
}

function ChatboxBar({ onSubmit }) {
    const [text, setText] = useState("");
    let submitting = false;
    const keyDown = e => {
        if (e.nativeEvent.keyCode === ENTER && !e.nativeEvent.shiftKey) {
            submitting =true;
        } 
    };

    const changeHandler = e => {
        if (!submitting) {
            setText(e.target.value);
        } else {
            doSubmit();
        }
    }

    const keyUp = () => {
        submitting = false;
    }

    const doSubmit = async () => {
        if (await onSubmit(text)) {
            setText("");
        }
    }

    return (
        <form className="Chatbox-bar" onSubmit={doSubmit}>
            <TextareaAutoSize onKeyDown={keyDown} onKeyUp={keyUp} value={text} onChange={changeHandler} className="Chatbox-input" />                
            <button className="Chatbox-submit" type="submit">➤</button>
        </form>
    );
}