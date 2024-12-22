import React, { Ref, useState } from 'react'
import styles from './referral.module.css'
import { Box, Title, Text, Table, Tabs } from '@mantine/core'

const Referral = () => {
  const [referralList, setReferralList] = useState([]);
  const [tab, setTab] = useState('referral');
  return (
    <div className={styles.referral}>
      <Box className={styles.referralBox}>
      <Title className={styles.referralTitle}>Referral</Title>
        <Text>
          Getting started with our referral program is easy. Simply share your wallet address or email address with others, and ask them to use it as their referral code when they register.
        </Text>
        <Text>
          For every successful referral, you'll receive a reward. The more people you refer, the more rewards you'll earn!
        </Text>
      </Box>

      <Tabs value={tab} onChange={(value) => setTab(value || 'referral')} color='red'>
        <Tabs.List px={20}>
          <Tabs.Tab value="referral" fz={20}>Referral</Tabs.Tab>
          <Tabs.Tab value="referral-bonus" fz={20}>Referral Bonus</Tabs.Tab>
          <Tabs.Tab value="matching-bonus" fz={20}>Matching Bonus</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className={styles.referralBody}>
        {tab === 'referral' && <ReferralList />}
      </div>
    </div>
  )
}

export default Referral

const ReferralList = () => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Active Staking</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>John Doe</Table.Td>
          <Table.Td>john.doe@example.com</Table.Td>
          <Table.Td>0 XTR</Table.Td>
          <Table.Td>Active</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}
