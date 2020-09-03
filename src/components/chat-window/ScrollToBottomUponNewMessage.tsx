// using useEffect with this function caused jittery behaviour, so instead, we're going to scroll before the messages are displayed on-screen i.e. useLayoutEffect
export const scrollToBottomUponNewMessage = (messagePanel: HTMLDivElement|null, oldScrollHeight: number) => {
    const {scrollTop = 0, clientHeight = 0} = messagePanel ?? {}; 
    // {a, b} = c. Look for c.a and c.b and assign to vars called a,b 
    // a ?? b. If a is null, return b
    // const. constant within scope
    const scrollPosition = scrollTop + clientHeight;
    if (Math.abs(scrollPosition - oldScrollHeight) < 100) 
    {
        messagePanel?.scrollTo(0, messagePanel?.scrollHeight);
    }
    oldScrollHeight = messagePanel?.scrollHeight ?? 0;
};