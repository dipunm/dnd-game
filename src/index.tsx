import React from 'react';
import ReactDOM from 'react-dom';
import { Separator, DialogDisclosure, useDialogState } from 'reakit';
import { FocusVisibleManager } from 'use-focus-visible';
import './index.css';

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

type PlayerPageProps = {
  user: User,
  logout: () => void,
};

function PlayerPage({ user, logout }: PlayerPageProps) {
  const dialog = useDialogState({ modal: true, visible: false });

  return (
    <TabbedLayout 
      tabLabels={[ 'Dice', 'Character Sheet', 'Chat' ]}
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
            <ChatComponent />
          </TabPanel>
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
