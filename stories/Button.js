import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { IconButton } from '../src/components/Button'
import AddIcon from '@material-ui/icons/Add'

storiesOf('Button/IconButton', module)
  .add('default', () => (
    <IconButton onClick={action('Clicked')}><AddIcon /></IconButton>
  ))
  .add('with tooltip', () => (
    <IconButton tooltip='My tooltip' onClick={action('Clicked')}>
      <AddIcon />
    </IconButton>
  ))
