import React from 'react'
import img1 from './01-profile.png'
import img2 from './02-profile.png'
import img3 from './03-profile.png'

export const ProfilePic = props => {
  return (
    <img {...props} className={props.className} src={img[props.src]} />
  )
}

const img = {
  [`01-profile.png`]: img1,
  [`02-profile.png`]: img2,
  [`03-profile.png`]: img3,
}

export default ProfilePic
