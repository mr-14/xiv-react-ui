import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ComboText, MultiText, Text, AddableSelect, AutoSelect, DateRange } from '../src/components/Field'
import { ComboForm } from '../src/components/Form'
import AddIcon from '@material-ui/icons/Add'

storiesOf('Field/ComboText', module)
  .addDecorator(story => (
    <div style={{ width: 300 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return (
      <ComboText
        id='ct1'
        label='Field 1'
        icon={<AddIcon />}
        onChange={action('field changed')}
        onClick={action('button clicked')}
      />
    )
  })

storiesOf('Field/MultiText', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return (
      <MultiText
        id='ct1'
        label='Field 1'
        onChange={action('field changed')}
      />
    )
  })
  .add('with values', () => {
    return (
      <MultiText
        id='ct1'
        label='Field 1'
        value={['value 1', 'value 2']}
        onChange={action('field changed')}
      />
    )
  })
  .add('in form', () => {
    const fields = [
      { id: 'fld1', component: Text, props: { label: 'Text 1' } },
      { id: 'fld2', component: MultiText, props: { label: 'MuliText 1' }, default: [] },
    ]

    const actions = [
      { label: 'Action 1', color: 'secondary', onClick: action('Clicked action1') },
      { label: 'Action 2', color: 'primary', onClick: action('Clicked action2') },
    ]

    return <ComboForm fields={fields} actions={actions} onChange={action('field changed')} />
  })

storiesOf('Field/AddableSelect', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    const options = [
      { id: 'opt1', label: 'Option 1' },
      { id: 'opt2', label: 'Option 2' },
      { id: 'opt3', label: 'Option 3' },
    ]
    const fields = [
      {
        id: 'fld1',
        component: Text,
        props: {
          label: 'Field 1',
          validators: [{ type: 'required', message: 'field required' }]
        }
      },
      {
        id: 'fld2',
        component: Text,
        props: {
          label: 'Field 2',
          validators: [{ type: 'required', message: 'field required' }]
        }
      },
    ]
    return (
      <AddableSelect
        id='ct1'
        label='Field 1'
        icon={<AddIcon />}
        onChange={action('field changed')}
        options={options}
        resourceId="user"
        resourceUrl="http://localhost:3000/users"
        fields={fields}
      />
    )
  })

storiesOf('Field/AutoSelect', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    const options = [
      { id: 'opt1', label: 'Option 1' },
      { id: 'opt2', label: 'Option 2' },
      { id: 'opt3', label: 'Option 3' },
    ]
    return (
      <AutoSelect
        id='ct1'
        label='Field 1'
        placeholder="Placeholder text..."
        onChange={action('field changed')}
        options={options}
      />
    )
  })
  .add('multiple', () => {
    const options = [
      { id: 'opt1', label: 'Option 1' },
      { id: 'opt2', label: 'Option 2' },
      { id: 'opt3', label: 'Option 3' },
    ]
    return (
      <AutoSelect
        id="ct1"
        label="Field 1"
        placeholder="Placeholder text..."
        onChange={action('field changed')}
        options={options}
        multiple
      />
    )
  })

storiesOf('Field/DateRange', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return (
      <DateRange
        id='ct1'
        label='Field 1'
        placeholder="Placeholder text..."
        onChange={action('field changed')}
      />
    )
  })
