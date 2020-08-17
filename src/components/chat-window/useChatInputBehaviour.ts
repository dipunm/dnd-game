import { useMemo, useEffect, useCallback, KeyboardEventHandler, ChangeEventHandler, useState, FormEventHandler, useRef } from "react";
import { ChatBoxObservable } from "./ChatBoxObservable";

type Handler = (value: string) => void;
export default function useChatInputBehaviour(
    { submitHandler, initialValue = "", refocusOnSubmit = true, focusOnLoad = false }: 
    { submitHandler: Handler, initialValue?: string, refocusOnSubmit?: boolean, focusOnLoad?: boolean }
) {
    const [value, setValue] = useState(initialValue);
    const observable = useMemo(() => new ChatBoxObservable(), []);
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleSubmission = useCallback((value: string) => {
        const message = value.trim();
        if (message) {
            submitHandler(message);
            setValue("");
        }
        if (refocusOnSubmit) {
            ref.current?.focus();
        }
    }, [setValue, submitHandler, refocusOnSubmit]);

    useEffect(() => {
        const handle = observable.subscribe(({ action, value }) => {
            switch (action) {
                case 'submit': 
                    handleSubmission(value);
                    break;
                case 'update':
                    setValue(value || "");
                    break;
            }
        });
        return handle.unsubscribe;
    }, [observable, handleSubmission]);

    useEffect(() => {
        if (focusOnLoad) {
            ref.current?.focus();
        }
    }, [ref, focusOnLoad])

    return {
        inputProps: {
            ref,
            value,
            onKeyPress: useCallback<KeyboardEventHandler>(e => observable.onKeyPress(e), [observable]),
            onKeyUp: useCallback<KeyboardEventHandler>(e => observable.onKeyUp(e), [observable]),
            onChange: useCallback<ChangeEventHandler<HTMLTextAreaElement>>(e => observable.onChange(e), [observable]),
            'aria-multiline': 'false',
        },
        onFormSubmit: useCallback<FormEventHandler>(e => { e.preventDefault(); handleSubmission(value); }, [handleSubmission, value]),
    };
}
 