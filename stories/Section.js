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
  .add('no margin', () => {
    return (
      <React.Fragment>
        <Section title="My Title 1" disableMargin>
          <Typography variant="body1">My Body 1</Typography>
        </Section>
        <Section title="My Title 2" disableMargin>
          <Typography variant="body1">My Body 2</Typography>
        </Section>
      </React.Fragment>
    )
  })
  .add('with divider', () => {
    return (
      <Section title="My Title" disablePadding showDivider>
        <Typography variant="body1">My Body</Typography>
      </Section>
    )
  })
