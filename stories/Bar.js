import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppBar } from '../src/components/Bar'
import { IconPopover } from '../src/components/Popover'
import MenuIcon from '@material-ui/icons/Menu'
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice'
import IconButton from '@material-ui/core/IconButton'
import NearMeIcon from '@material-ui/icons/NearMe'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import { NavList } from '../src/components/List'

storiesOf('Bar/AppBar', module)
  .add('default', () => {
    return <AppBar title="My App Bar" />
  })
  .add('with menu', () => {
    const menuButton = (
      <IconButton
        color="inherit"
        onClick={action('Menu clicked')}
      >
        <MenuIcon />
      </IconButton>
    )
    return <AppBar title="My App Bar" leftToolbar={menuButton} />
  })
  .add('with actions', () => {
    const items = [
      { label: 'Item 1-1', icon: <InboxIcon />, onClick: action('clicked 1-1') },
      { label: 'Item 2-1', icon: <DraftsIcon />, onClick: action('clicked 2-1') },
      { label: 'Item 2-2', icon: <SendIcon />, onClick: action('clicked 2-2') },
    ]
    const actions = (
      <div>
        <IconPopover
          icon={<NearMeIcon />}
          color="inherit"
          anchorOriginHorizontal='right'
          transformOriginHorizontal='right'
        >
          <NavList items={items} />
        </IconPopover>
        <IconButton
          color="inherit"
          onClick={action('Mail clicked')}
        >
          <LocalPostOfficeIcon />
        </IconButton>
      </div>
    )
    return <AppBar title="My App Bar" rightToolbar={actions} />
  })
