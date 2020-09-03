import React from 'react';
import ReactDOM from 'react-dom';
import { Separator, DialogDisclosure, useDialogState } from 'reakit';
import { FocusVisibleManager } from 'use-focus-visible';
import './index.css';
import { useObservable } from "react-use";


import { RequireLogin } from './components/user-auth/LoginPage';
import { TabbedLayout } from './layouts/TabbedLayout';
import { TabPanel } from './controls/tab-controls/TabPanel';
import { CharacterSheet } from './components/character-sheet/CharacterSheet';
import { NavLabel } from './controls/navigation/NavLabel';
import { NavMenuItem } from './controls/navigation/NavMenuItem';
import { Dialog } from './controls/dialog/Dialog';
import { DialogBackdrop } from './controls/dialog/DialogBackdrop';
import { Button } from './controls/form-controls/Button';
import { User } from './components/user-auth/UserObservable';
import { ChatComponent } from './components/chat-window/ChatComponent';
import { DiceBoard } from './components/dice-board/DiceBoard';
import { Toast } from './controls/Toast';
import TabObservable from './layouts/TabObservable'
import { UserName } from './components/chat-window/ChatComponents';


type PlayerPageProps = {
  user: User,
  logout: () => void,
};

function PlayerPage({ user, logout }: PlayerPageProps) {
  const dialog = useDialogState({ modal: true, visible: false });
  const [visibility, setVisibility] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");
  const activeTab = useObservable(TabObservable, null);
  const [currentNotificationMessage, setCurrentNotificationMessage] = React.useState<Message>({handle: "", message: ""});

  const activateToast = (message: Message) => {
    setVisibility(true);
    setCurrentNotificationMessage(message);
    setTimeout(() => {setVisibility(false);}, 2000);
  };

  const messageNotification = (message: Message) => {
    if (activeTab != "Chat")
    {
      activateToast(message);
    }
  };

  return (
    <TabbedLayout
      tabLabels={[ 'Dice', 'Character Sheet', 'Chat' ]}
      tabIds={[ 'Dice', 'Character Sheet', 'Chat' ]}
      moreMenuContents={(menuProps) => (
        <>
          <NavLabel>You are logged in as <strong>{user?.username}</strong></NavLabel>
          <Separator />
          <DialogDisclosure as={NavMenuItem} {...dialog}>
            Logout
          </DialogDisclosure>
          <DialogBackdrop {...dialog}>
            <Dialog role="alertdialog" aria-label="Confirm logout" {...dialog}>
              <p>Are you sure you want to logout?</p>
              <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '20px' }}>
                <Button primary onClick={logout}>Yes</Button>
                <Button onClick={() => dialog.hide()}>Cancel</Button>
              </div>
            </Dialog>
          </DialogBackdrop>
        </>
      )}>
      {(tabProps) => (
        <>
          <TabPanel {...tabProps} tabIndex={-1} style={{ flexGrow: 1 }}>
            <DiceBoard />
          </TabPanel>

          <TabPanel tabIndex={-1} {...tabProps} style={{ overflow: 'auto' }}>
            <CharacterSheet />
          </TabPanel>
    
          <TabPanel {...tabProps} tabIndex={-1} style={{ overflow: 'auto', flexGrow: 1 }}>
            <ChatComponent messageNotification={messageNotification}  />
          </TabPanel>
          <Toast visibility={visibility} fromThisUser={false}>
              <UserName>{currentNotificationMessage.handle}</UserName>
              <p>{currentNotificationMessage.message}</p>
          </Toast>
        </>
      )}
    </TabbedLayout>
    
  );
}

ReactDOM.render(
  <React.StrictMode>
    <FocusVisibleManager>
      <RequireLogin>
        {({user, logout}) => 
          (<PlayerPage user={user} logout={logout} />)}
      </RequireLogin>
    </FocusVisibleManager>
  </React.StrictMode>,
  document.getElementById('root')
);
