import { Title } from '@mantine/core'
import { Container } from '@mantine/core'
import React from 'react'
import classes from './dashboard.module.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const DashboardIndex = () => {
    const { data: session, status } = useSession(); 
    if (status === 'loading') return <div>Loading...</div>;
    console.log(session);

  return (
    <Container fluid>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>Welcome Back XStreamer!</Title>
    </Container>
  )
}

export default DashboardIndex