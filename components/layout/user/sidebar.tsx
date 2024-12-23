import { Stack, Title, UnstyledButton, Image, Center, Button, rem, Divider, Space, Box } from '@mantine/core'
import React from 'react'
import classes from './sidebar.module.css'
import { IconDashboard, IconDots, IconDotsVertical, IconLink, IconLock, IconLockDollar, IconLogout, IconMessageCircle, IconPackage, IconRocket, IconSettings, IconUser, IconWallet } from '@tabler/icons-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import router from 'next/router'

const Sidebar = () => {

    const navigation = [
        { label: 'Dashboard', icon: <IconDashboard size={30} />, link: '/dashboard' },
        { label: 'PrivateSale', icon: <IconRocket size={30} />, link: '/dashboard/private-sale' },
        { label: 'PublicSale', icon: <IconPackage size={30} />, link: '/dashboard/public-sale' },
        { label: 'Wallet', icon: <IconWallet size={30} />, link: '/dashboard/wallet' },
        { label: 'Staking', icon: <IconLockDollar size={30} />, link: '/dashboard/staking' },
    ]

    const settings = [
        { label: 'Referral', icon: <IconLink size={30} />, link: '/dashboard/referral' },
        { label: 'Settings', icon: <IconSettings size={30} />, link: '/dashboard/settings' },
        { label: 'Profile', icon: <IconUser size={30} />, link: '/dashboard/profile' },
        { label: 'Support', icon: <IconMessageCircle size={30} />, link: '/dashboard/support' },

    ]

    const links = navigation.map((item) => (
        <Link className={classes.link} href={item.link} key={item.label}
            onClick={
                (e) => {
                    e.preventDefault();
                    router.push(item.link);
                }}>
            {item.icon}
            <span>{item.label}</span>
        </Link>
    ))
    const SettingsLinks = settings.map((item) => (
        <Link className={classes.link} href={item.link} key={item.label}
            onClick={(e) => {
                e.preventDefault();
                router.push(item.link);
            }}>
            {item.icon}
            <span>{item.label}</span>
        </Link>
    ))

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarBody}>
                <Center><Image src="/images/xstream-logo.png" alt="logo" w={100} h="auto" /></Center>
                <div>
                    <Stack className={classes.links}>{links}</Stack>
                    <Box className={classes.divider}><IconDots size={30} /></Box    >
                    <Stack className={classes.settings}>{SettingsLinks}</Stack>
                </div>
                <Button
                    color='red'
                    variant='filled'
                    onClick={() => { signOut({ callbackUrl: '/signin' }) }}
                    size="md"
                    radius="xl"
                    w="100%"
                    mt="auto"
                    leftSection={<IconLogout size={16} />} >Logout</Button>
            </div>
        </div>
    )
}

export default Sidebar