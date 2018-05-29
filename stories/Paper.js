import React from 'react'
import { storiesOf } from '@storybook/react'
import Paper from '../src/components/Paper'
import Typography from '@material-ui/core/Typography'

storiesOf('Paper', module)
  .add('default', () => (
    <Paper>
      <Typography>Paper Content</Typography>
    </Paper>
  ))
  .add('without border', () => (
    <Paper border={false}>
      <Typography>Paper Content</Typography>
    </Paper>
  ))
  .add('with custom style', () => (
    <Paper style={{ backgroundColor: '#eee', padding: '1em' }}>
      <Typography>Paper Content</Typography>
    </Paper>
  ))
