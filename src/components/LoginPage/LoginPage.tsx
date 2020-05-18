import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CaretNext } from "grommet-icons";
import { Input, Button, Form } from "../StyledTags/FormAndInputs";
import colors from '../../constants/colors'
import UserObservable from "../../observables/UserObservable";

const Container = styled.div`
    color: white;
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    background:
    linear-gradient(115deg, transparent 75%, ${colors.primary_dark} 75%) 0 0,
    linear-gradient(245deg, transparent 75%, ${colors.primary_dark} 75%) 0 0,
    linear-gradient(115deg, transparent 75%, ${colors.primary_dark} 75%) 7px -10px,
    linear-gradient(245deg, transparent 75%, ${colors.primary_dark} 75%) 7px -10px,
    ${colors.primary};
    background-size: 10px 20px;

    text-shadow: 0 0 1px ${colors.primary_washed};
`;

const Block = styled.div`
    display: block;
`

const Main = styled.main`
    text-shadow: none;
    background: linear-gradient(${colors.white}, #FFF);
    border-radius: 20px 20px 0 0;
    color: ${colors.text};
    padding: 80px 40px;
    margin: 30px -20px 0 -20px;
    flex-grow: 1;
    box-shadow: 0 10px 20px black;
`;

function LoginPage() {
    const [username, setUsername] = useState("");
    const handler = useCallback((event: React.FormEvent) => {
        UserObservable.createUser(username);
        event.preventDefault();
    }, [username]);

    return (
        <Container> 
            <Block>
                <h1>Here be dragons.</h1> 
                <p>Enter at your own peril.</p> 
            </Block>
            <Main>
                <Form onSubmit={handler}>
                    <label htmlFor="login-username">Enter a username to enter:</label>
                    <Input id="login-username" value={username} onChange={e => setUsername(e.target.value)} 
                        autoFocus autoCapitalize={"none"} 
                        pattern="^[^\s]*$" required title="Must not contain spaces" />
                    <Button type="submit">Enter <CaretNext size={"medium"} /></Button>
                </Form>
            </Main>
        </Container>
    );
}

export default LoginPage;