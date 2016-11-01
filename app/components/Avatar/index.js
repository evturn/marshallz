import React from 'react'
import img1 from './01-avatar.png'
import img2 from './02-avatar.png'
import img3 from './03-avatar.png'

export const Avatar = props => {
  return (
    <img {...props} className={props.className} src={img[props.src]} />
  )
}

const img = {
  [`01-avatar.png`]: img1,
  [`02-avatar.png`]: img2,
  [`03-avatar.png`]: img3,
}

export default Avatar
