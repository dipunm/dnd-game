import React, { useState, useCallback } from "react"
import UserObservable, { User } from "./UserObservable";
import { LoginLayout } from "../../layouts/LoginLayout";
import { Form } from "../../controls/form-controls/Form";
import { Button } from "../../controls/form-controls/Button";
import { Input } from "../../controls/form-controls/Input";
import { GrCaretNext } from 'react-icons/gr';
import { useObservable } from 'react-use';

type RenderCallback = ({user, logout} : {user: User, logout: () => void}) => void;

export function RequireLogin({children} : {children: RenderCallback}) {
    const [username, setUsername] = useState("");
    const user = useObservable(UserObservable);
    const handler = useCallback((event: React.FormEvent) => {
        UserObservable.createUser(username);
        event.preventDefault();
    }, [username]);
    
    return user != null ? (
        <>{
            children({
                user, 
                logout: () => UserObservable.reset(),
            })
        }</>
    ) : (
        <LoginLayout 
            heroContent={(
            <>
                <h1>Here be dragons.</h1> 
                <p>Enter at your own peril.</p>     
            </>
            )}
            mainContent={(
            <>
                <Form onSubmit={handler}>
                    <label htmlFor="login-username">Enter a username to enter:</label>
                    <Input id="login-username" value={username} onChange={e => setUsername(e.target.value)} 
                        autoFocus autoCapitalize={"none"} 
                        pattern="^[^\s]*$" required title="Must not contain spaces" />
                    <Button type="submit">
                        Enter<GrCaretNext size="14px" />
                    </Button>
                </Form>
            </>
            )}
        />
    );
}
