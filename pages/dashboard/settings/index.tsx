import React, { useState } from 'react'
import styles from './settings.module.css'
import { Box, Button, PasswordInput, Title, Tabs } from '@mantine/core'
import { IconBell, IconLock } from '@tabler/icons-react'
import HeaderNav from '@/components/dashboard/headerNav'

const Referral = () => {
  const [activeTab, setActiveTab] = useState('Change Password');
  const navList = [
    { label: 'Change Password', icon: <IconLock size={16} />, url: "", type: 'tab' },
    { label: 'Notifications', icon: <IconBell size={16} />, url: "", type: 'tab' }
  ]
  return (
    <div className={styles.settings}>
      <HeaderNav title='Settings' navList={navList} setTab={setActiveTab} tab={activeTab} />
      <div className={styles.settingBoxBody}>   
      {activeTab === 'Change Password' && <ChangePassword />}
      {activeTab === 'Notifications' && <Notifications />}
      </div>
    </div>
  )
}

export default Referral

const ChangePassword = () => {
  return (
    <div className={styles.changePassword}>

      <PasswordInput placeholder="Current Password" label="Current Password" maw={300} />
      <PasswordInput placeholder="New Password" label="New Password" maw={300} mt={10} />
      <PasswordInput placeholder="Repeat Password" label="Repeat Password" maw={300} mt={10} />
      <Button mt={10} leftSection={<IconLock />}  >Save</Button>

    </div>
  )
}

const Notifications = () => {
  return (
    <div>Notifications</div>
  )
}

