import { IconChevronRight, IconPackage, IconUser, IconMessageCircle, IconSettings, IconLink, IconLockDollar, IconLogout } from '@tabler/icons-react';
import { IconDashboard, IconRocket, IconWallet } from '@tabler/icons-react';
import { Center, Drawer, Group, rem, rgba, SimpleGrid, Text, Image, Button, Divider } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react'
import classes from './footer.module.css'
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const MobileNav = [
    { label: 'Dashboard', icon: IconDashboard, href: '/dashboard' },
    { label: 'Staking', icon: IconRocket, href: '/dashboard/staking' },
    { label: 'Wallet', icon: IconWallet, href: '/dashboard/wallet' },
    { label: 'Menu', icon: IconMenu2, href: '' },
]


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

const Footer = () => {
    const [active, setActive] = useState('Dashboard');
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.inner}>
                    <SimpleGrid cols={4}>
                        {MobileNav.map((item) => (
                            <MenuItem key={item.label} label={item.label} icon={item.icon} href={item.href} active={active} setActive={setActive} open={open} close={close} />
                        ))}
                    </SimpleGrid>
                </div>

            </div>
            <Drawer opened={opened} onClose={close} position="left" size="80%" className={classes.drawer} withCloseButton={false}>
                <MobileMenu active={active} setActive={setActive} close={close} />
            </Drawer>
        </>
    );
}


export default Footer

interface MenuItemProps {
    label: string;
    icon: React.ElementType;
    href: string;
    active: string;
    setActive: (label: string) => void;
    open: () => void;
    close: () => void;
}

const MenuItem = ({ label, icon, href, active, setActive, open, close }: MenuItemProps) => {
    const router = useRouter();

    return (
        <div className={active === label ? ' ' + classes.active : ''}>
            <div className={classes.item} onClick={() => {
                setActive(label)
                if (href) router.push(href)
                if (href === '') open()

            }}>
                <Center>{React.createElement(icon)}</Center>
                <Text ta="center" fz={rem(10)} mt={rem(5)} tt="uppercase" fw={500} c="rgba(255, 255, 255, 0.7)">{label}</Text>
            </div>
        </div>
    );
}

interface MobileMenuProps {
    active: string;
    setActive: (label: string) => void;
    close: () => void;
}

const MobileMenu = ({ active, setActive, close }: MobileMenuProps) => {

    const handleClick = (label: string) => {
        setActive(label)
        close()
    }
    return (
        <div className={classes.drawerContent}>
            <Center>
                <Image src="/images/xstream-logo.png" alt="logo" w={150} h="auto" />
            </Center>

            <div>
                {navigation.map((item) => (
                        <Link href={item.link} key={item.label} className={classes.menuLink + ' ' + (active === item.label ? classes.active : '')} onClick={() => handleClick(item.label)}>
                        <Group justify="flex-start" align="center" gap="xs">
                            {item.icon}
                            <Text className={classes.menuLinkText}>{item.label}</Text>
                        </Group>
                    </Link>
                ))}
                <Divider my={rem(20)} label="Settings" labelPosition="left" />
                {settings.map((item) => (
                    <Link href={item.link} key={item.label} className={classes.menuLink + ' ' + (active === item.label ? classes.active : '')} onClick={() => handleClick(item.label)}>
                        <Group justify="flex-start" align="center" gap="xs">
                            {item.icon}
                            <Text className={classes.menuLinkText}>{item.label}</Text>
                        </Group>
                    </Link>
                ))}
            </div>


            <Button variant="filled" color="red" fullWidth leftSection={<IconLogout size={16} />} onClick={() => {
                signOut({ callbackUrl: '/signin' })
            }}>Logout</Button>
        </div>
    );
}

