import React, { useState } from 'react'
import styles from './settings.module.css'
import { Box, Button, PasswordInput, Title, Tabs } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'

const Referral = () => {
  const [activeTab, setActiveTab] = useState('change-password');
  return (
    <div className={styles.settings}>
      <Box className={styles.settingsBoxHeader}>
        <Title className={styles.settingsTitle}>Settings</Title>
      </Box>
      <div className={styles.settingBoxBody}>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'change-password')} color='red'>
        <Tabs.List px={20}>
          <Tabs.Tab value="change-password" fz={20}>Change Password</Tabs.Tab>
          <Tabs.Tab value="notifications" fz={20}>Notifications</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {activeTab === 'change-password' && <ChangePassword />}
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
