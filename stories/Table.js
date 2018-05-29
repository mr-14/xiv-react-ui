import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ViewTable, DataTable, SimpleTableFilter } from '../src/components/Table'
import { IconPopover } from '../src/components/Popover'
import { NavList } from '../src/components/List'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const columns = [
  { id: 'col1', label: 'Col 1' },
  { id: 'col2', label: 'Col 2' },
  { id: 'col3', label: 'Col 3' },
]

const rows = [
  { col1: 'val 1-1', col2: 'val 1-2', col3: 'val 1-3' },
  { col1: 'val 2-1', col2: 'val 2-2', col3: 'val 2-3' },
  { col1: 'val 3-1', col2: 'val 3-2', col3: 'val 3-3' },
]

const rowActions = row => {
  const items = [
    { label: 'Action 1', icon: <InboxIcon />, onClick: action('clicked Action 1') },
    { label: 'Action 2', icon: <DraftsIcon />, onClick: action('clicked Action 2') },
    { label: 'Action 3', icon: <SendIcon />, onClick: action('clicked Action 3') },
  ]

  return (
    <IconPopover icon={<MoreVertIcon />} color='inherit'>
      <NavList items={items} />
    </IconPopover>
  )
}

storiesOf('Table/ViewTable', module)
  .addDecorator(story => (
    <div style={{ width: 500 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <ViewTable columns={columns} rows={rows} />
  })

storiesOf('Table/DataTable', module)
  .addDecorator(story => (
    <div style={{ width: '100%' }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <DataTable columns={columns} rows={rows} rowActions={rowActions} />
  })
  .add('with filter', () => {
    return (
      <DataTable
        columns={columns}
        rows={rows}
        rowActions={rowActions}
        Filter={SimpleTableFilter}
        onFetch={action(`filter table`)}
        pageToken='1234'
      />
    )
  })
