import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa6'
import { SocialMediaProps } from '../types'

const SocialMedia:React.FC<SocialMediaProps> = ({settingData, className}) => {
  return (
    <div className={`social-icons ${className}`}>
      <Link href={settingData.facebook} target='_blank'><FaFacebookF /></Link>
      <Link href={settingData.instagram} target='_blank'><FaInstagram /></Link>
      {/* <Link href={settingData.linkedin} target='_blank'><FaLinkedinIn /></Link> */}
      {/* <Link href={settingData.twitter} target='_blank'><FaTwitter /></Link> */}
      <Link href={settingData.youtube} target='_blank'><FaYoutube /></Link>
    </div>
  )
}

export default React.memo(SocialMedia);
