import React, { Ref, useState, useEffect, useCallback } from 'react'
import styles from './referral.module.css'
import { Box, Title, Text, Table, Tabs, Avatar, Group, Skeleton, ScrollArea } from '@mantine/core'
import { IconList, IconMoneybag, IconSitemap } from '@tabler/icons-react';
import HeaderNav from '@/components/dashboard/headerNav';
import axios from 'axios';

const Referral = () => {
  const [referralList, setReferralList] = useState([]);
  const [tab, setTab] = useState('Referral');

  const navList = [
    { label: 'Referral', icon: <IconList size={16} />, url: "", type: 'tab' },
    { label: 'Referral Bonus', icon: <IconMoneybag size={16} />, url: "", type: 'tab' },
    { label: 'Matching Bonus', icon: <IconSitemap size={16} />, url: "", type: 'tab' },
  ]

  console.log(tab);

  return (
    <div className={styles.referral}>
      <HeaderNav title='Referral' navList={navList} setTab={setTab} tab={tab} />
      <div className={styles.referralBody}>
        {tab === 'Referral' && <ReferralList />}
        {tab === 'Referral Bonus' && <ReferralBonus />}
        {tab === 'Matching Bonus' && <MatchingBonus />}
      </div>
    </div>
  )
}

export default Referral

interface ReferralList {
  id: string;
  userId: string;
  sponsorId: string;
  generasi: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    password: string;
    image: string;
    sponsor: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  }
}

const ReferralList = () => {

  const [referralList, setReferralList] = useState<ReferralList[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReferralList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/referral');
      const data = response.data;
      setReferralList(data);
    } catch (error) {
      console.error('Fetch tickets error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReferralList();
  }, [fetchReferralList]);

  const rows = referralList.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="xs">
          <Avatar src={item.user.image} alt={item.user.name} size={24} />
          <Text fw={500} fz={14}>{item.user.name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{item.user.email}</Table.Td>
      <Table.Td>0 XTR</Table.Td>
      <Table.Td>Active</Table.Td>
    </Table.Tr>
  ))


  return (
    <div>
      <ScrollArea h={600}>
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
          {!loading && rows}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      {loading && <Skeleton height={30} w="100%" />}
    </div>
  )
}


const ReferralBonus = () => {
  return (
    <div>You have 0 referral bonus</div>
  )
}

const MatchingBonus = () => {
  return (
    <div>You have 0 matching bonus</div>
  )
}

