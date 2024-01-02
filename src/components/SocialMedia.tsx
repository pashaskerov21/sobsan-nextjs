'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { SettingDataType } from '../types'

type SocialMediaProps = {
  className: string,
  settingData: SettingDataType,
}

const SocialMedia: React.FC<SocialMediaProps> = ({ settingData, className }) => {
  return (
    <div className={`social-icons ${className}`}>
      <Link href={settingData.facebook} target='_blank'><FaFacebookF /></Link>
      <Link href={settingData.instagram} target='_blank'><FaInstagram /></Link>
      <Link href={settingData.youtube} target='_blank'><FaYoutube /></Link>

    </div>
  )
}

export default React.memo(SocialMedia);
