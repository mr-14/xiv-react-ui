import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image } from '../src/components/Image'

storiesOf('Image/Image', module)
  .addDecorator(story => (
    <div style={{ width: 400, height: 200, border: '1px solid #333' }}>
      {story()}
    </div>
  ))
  .add('cover', () => (
    <Image src="http://via.placeholder.com/350x150" width="400px" height="200px" />
  ))
  .add('contain', () => (
    <Image
      src="http://via.placeholder.com/350x150"
      size="contain"
      width="400px"
      height="200px"
    />
  ))
  .add('cover align left', () => (
    <Image
      src="http://via.placeholder.com/350x150"
      width="400px"
      height="200px"
      align="left"
    />
  ))
  .add('contain valign bottom', () => (
    <Image
      src="http://via.placeholder.com/350x150"
      size="contain"
      width="400px"
      height="200px"
      valign="bottom"
    />
  ))
