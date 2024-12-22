import React, { Ref } from 'react'
import styles from './profile.module.css'
import { Title } from '@mantine/core'

const Referral = () => {
  return (
    <div className={styles.referral}>
        <Title className={styles.profileTitle}>Profile</Title>
    </div>
  )
}

export default Referral