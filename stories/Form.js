import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SimpleForm, ComboForm, ListForm } from '../src/components/Form'
import { Text } from '../src/components/Field'
import { Integer, AutoSelect } from '../src/components/Field'

const fields = [
  { id: 'fld1', component: Text, props: { label: 'Field 1' } },
  { id: 'fld2', component: Text, props: { label: 'Field 2' } },
  { id: 'fld3', component: Text, props: { label: 'Field 3' } },
  { id: 'fld4', component: Text, props: { label: 'Field 4' } },
  { id: 'fld5', component: Text, props: { label: 'Field 5' } },
  { id: 'fld6', component: Text, props: { label: 'Field 6' } },
]

const actions = [
  { label: 'Action 1', color: 'secondary', onClick: action('Clicked action1') },
  { label: 'Action 2', color: 'primary', onClick: action('Clicked action2') },
]

const columns = [
  {
    id: 'fld1',
    component: AutoSelect,
    props: {
      label: 'field 1',
      placeholder: 'field 1 placeholder',
      options: [
        { id: 'opt1', label: 'option 1' },
        { id: 'opt2', label: 'option 2' },
      ],
      validators: [{ type: 'required', message: 'field 1 error' }]
    },
  },
  {
    id: 'fld2',
    component: Integer,
    props: {
      label: 'field 2',
      validators: [{ type: 'min', val: 1, message: 'field 2 error' }]
    },
    align: 'right'
  },
]

storiesOf('Form/SimpleForm', module)
  .addDecorator(story => (
    <div style={{ width: 500 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <SimpleForm fields={fields} actions={actions} />
  })

storiesOf('Form/ComboForm', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {
    return <ComboForm fields={fields} actions={actions} />
  })

storiesOf('Form/ListForm', module)
  .addDecorator(story => (
    <div style={{ width: 600 }}>
      {story()}
    </div>
  ))
  .add('default', () => {

    return (
      <ListForm
        columns={columns}
        onRowAdd={action('Clicked row add')}
        onRowRemove={action('Clicked row remove')}
      />
    )
  })
  .add('nested list', () => {
    const values = [
      {
        'fld1': 'cell1-1', 'fld2': 'cell1-2', items: {
          'fld1': 'cell1-1-1', 'fld2': 'cell1-1-2'
        }
      },
      { 'fld1': 'cell2-1', 'fld2': 'cell2-2' }
    ]

    return (
      <ListForm
        columns={columns}
        values={values}
        nestedRow="items"
        onRowAdd={action('Clicked row add')}
        onRowRemove={action('Clicked row remove')}
      />
    )
  }) 
