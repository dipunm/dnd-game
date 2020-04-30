import React, { useState, useEffect, useRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import './Chat.css';
import ChatObservable from '../../observables/ChatObservable';
import { useObservable } from 'react-use';

const ENTER = 13;

export default function Chat() {
    const messages = useObservable(ChatObservable, []) || [];
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
            ChatObservable.sendMessage(text);
            return true;
        }

        return false;
    }

    return (
        <div className="Chatbox">
            <div ref={contentsRef} onScroll={updateAutoScroll} className="Chatbox-contents">
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry">
                    <p className="bot"><strong>Summer of Beth</strong> rolled a 2d8+9 and got 21</p>
                </div>
                <div className="Chatbox-entry bubble self">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                <div className="Chatbox-entry bubble">
                    <h2 className="Chatbox-entry-handle">Nisha</h2>
                    <p>Hello world. This is a message that I wrote. What's up?</p>
                    <div style={{clear: "both"}} />
                </div>
                { messages.map(( {handle, message} ) => (
                    <div className="Chatbox-entry bubble">
                        <h2 className="Chatbox-entry-handle">{handle}</h2>
                        <p>{message}</p>
                        <div style={{clear: "both"}} />
                    </div>
                )) }
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