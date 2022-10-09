import React from 'react'
import '../ToggleSwitch.css'
import { Switch } from 'antd'
import cx from 'classnames'
const ToggleSwitch = ({ rounder = false }) => {
  const sliderCX = cx('slider', {
    rounded: rounded,
  })
  return (
    <label className='switch'>
      <input type='checkbox' />
      <span className={sliderCX} />
    </label>
  )
}

export default ToggleSwitch
