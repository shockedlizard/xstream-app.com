import { Badge, Button, Grid, Group, SimpleGrid, Title, Text, Avatar, ActionIcon } from '@mantine/core'
import { Container } from '@mantine/core'
import React, { useState } from 'react'
import classes from './dashboard.module.css'
import { useSession } from 'next-auth/react'
import { IconBoltFilled, IconChevronRight, IconPackage } from '@tabler/icons-react'


const DashboardIndex = () => {
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <Title order={2} className={classes.title} ta="center">Welcome Back XStreamer!</Title>
      </div>
      <div className={classes.center}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Portfolio />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ReferralPortfolio />
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}

export default DashboardIndex

const Portfolio = () => {
  const dummyData = [
    { name: 'Lite', value: 100, currentReward: 0.00000155448, status: 'ACTIVE' },
    { name: 'Lite', value: 200, currentReward: 0.00000155448, status: 'ACTIVE' },
    { name: 'Bold', value: 300, currentReward: 0.00000155448, status: 'ACTIVE' },
  ]

  const [data, setData] = useState<any>(dummyData);
  return (
    <div className={classes.portfolio}>
      <Group justify="space-between" className={classes.portfolioHeader} p={5}>
        <Title order={2} className={classes.title} ta="center">Staking Portfolio</Title>
        <Group gap="xs">
          <Badge variant="light" color="green" className={classes.hideXs}>+256</Badge>
          <Button variant="transparent" rightSection={<IconChevronRight size={16} />} className={classes.hideXs}>View All</Button>
          <ActionIcon variant="light" size="xs" color="green" className={classes.hideDesktop}>
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>
      </Group>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {data.map((item: any, index: number) => (
          <div key={index} className={classes.portfolioItem}>
            <Group justify="space-between" className={classes.portfolioItemHeader}>
              <Group gap="xs">
                <IconBoltFilled size={16} />
                <Text className={classes.portfolioItemTitle}>{item.name}</Text>
              </Group>
              <Badge variant="light" color={item.status === 'ACTIVE' ? 'green' : 'red'} size="xs">{item.status}</Badge>
            </Group>
            <Text className={classes.portfolioItemReward}>{item.currentReward}</Text>
          </div>
        ))}
      </SimpleGrid>
    </div>
  )
}



const ReferralPortfolio = () => {
  const dummyData = [
    { name: 'Jajang', value: 100, currentReward: 0.00000155448, status: 'ACTIVE' },
    { name: 'Lilis', value: 200, currentReward: 0.00000155448, status: 'ACTIVE' },
    { name: 'Bambang', value: 300, currentReward: 0.00000155448, status: 'ACTIVE' },
  ]

  const [data, setData] = useState<any>(dummyData);

  return (
    <div className={classes.referralPortfolio}>
      <Group justify="space-between" className={classes.portfolioHeader} w="100%" p={5}>
        <Title order={2} className={classes.title} ta="center">Referral Portfolio</Title>
        <Group gap="xs">
          <Badge variant="light" color="green" className={classes.hideXs}>+256</Badge>
          <Button variant="transparent" rightSection={<IconChevronRight size={16} />} className={classes.hideXs}>View All</Button>
          <ActionIcon variant="light" size="xs" color="green" className={classes.hideDesktop}>
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>
      </Group>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {data.map((item: any, index: number) => (
          <div className={classes.portfolioItem} key={index}>
            <Group align='center' gap={5} className={classes.portfolioItemHeader}>
              <Avatar size={30} radius="xl">{item.name[0]}</Avatar>
              <Text className={classes.portfolioItemTitle}>{item.name}</Text>
            </Group>
            <Text>{item.currentReward}</Text>
          </div>
        ))}
      </SimpleGrid>
    </div>
  )
}