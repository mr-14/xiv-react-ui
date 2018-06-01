import React from 'react'
import { storiesOf } from '@storybook/react'
import { Section } from '../src/components/Section'
import Typography from '@material-ui/core/Typography'

storiesOf('Section', module)
  .add('default', () => {
    return (
      <Section title="My Title">
        <Typography variant="body1">My Body</Typography>
      </Section>
    )
  })
  .add('no padding', () => {
    return (
      <Section title="My Title" disablePadding>
        <Typography variant="body1">My Body</Typography>
      </Section>
    )
  })
