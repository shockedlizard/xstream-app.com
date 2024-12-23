import React, { useState } from 'react'
import styles from './profile.module.css'
import { Title } from '@mantine/core'
import { IconUser, IconWallet } from '@tabler/icons-react'
import HeaderNav from '@/components/dashboard/headerNav'


const Referral = () => {
  const [tab, setTab] = useState('Profile')
  const navList = [
    { label: 'Profile', icon: <IconUser size={16} />, url: "", type: 'tab' },
    { label: 'Wallet', icon: <IconWallet size={16} />, url: "", type: 'tab' },
  ]

  return (
    <HeaderNav title='Profile' navList={navList} setTab={setTab} tab={tab} />
  )
}

export default Referral