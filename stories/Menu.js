import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { IconMenu } from '../src/components/Menu'
import NearMeIcon from '@material-ui/icons/NearMe'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'

storiesOf('Menu/IconMenu', module)
  .add('default', () => (
    <IconMenu
      icon={<NearMeIcon />}
      items={[
        { label: 'Item 1-1', icon: <InboxIcon />, onClick: action('clicked 1-1') },
        { label: 'Item 2-1', icon: <DraftsIcon />, onClick: action('clicked 2-1') },
        { label: 'Item 2-2', icon: <SendIcon />, onClick: action('clicked 2-2') },
      ]}
    />
  ))
