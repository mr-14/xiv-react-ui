import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SimpleDialog, ConfirmDialog } from '../src/components/Dialog'
import Typography from '@material-ui/core/Typography'

storiesOf('Dialog/SimpleDialog', module)
  .add('extra small', () => (
    <SimpleDialog
      open
      title="My Simple Dialog"
      size='xs'
      onClose={action('Close dialog')}
    >
      <Typography>My Simple Dialog</Typography>
    </SimpleDialog>
  ))
  .add('small', () => (
    <SimpleDialog
      open
      title="My Simple Dialog"
      size='sm'
      onClose={action('Close dialog')}
    >
      <Typography>My Simple Dialog</Typography>
    </SimpleDialog>
  ))
  .add('medium', () => (
    <SimpleDialog
      open
      title="My Simple Dialog"
      size='md'
      onClose={action('Close dialog')}
    >
      <Typography>My Simple Dialog</Typography>
    </SimpleDialog>
  ))
  .add('large', () => (
    <SimpleDialog
      open
      title="My Simple Dialog"
      onClose={action('Close dialog')}
    >
      <Typography>My Simple Dialog</Typography>
    </SimpleDialog>
  ))
  .add('fullscreen', () => (
    <SimpleDialog
      open
      title="My Simple Dialog"
      size='full'
      onClose={action('Close dialog')}
    >
      <Typography>My Simple Dialog</Typography>
    </SimpleDialog>
  ))

storiesOf('Dialog/ConfirmDialog', module)
  .add('default', () => (
    <ConfirmDialog
      open
      title="My Confrimation Dialog"
      onClose={action('Close dialog')}
      onSubmit={action('Submit dialog')}
    >
      <Typography>My Confrimation Dialog</Typography>
    </ConfirmDialog>
  ))
