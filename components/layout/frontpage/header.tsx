import { Button, Container, Group, Image, Text } from '@mantine/core'
import React from 'react'
import styles from './header.module.css'
import { IconUser } from '@tabler/icons-react'
import Link from 'next/link'


const menu = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Features',
        href: '/features',
    },
    {
        label: 'Tokenomics',
        href: '/tokenomics',
    },
    {
        label: 'Roadmap',
        href: '/roadmap',
    },
]
const Header = () => {
    return (
        <div className={styles.header}>
            <Container size="xl" className={styles.headerContainer}>
                <Group justify="space-between" w="100%">
                    <Image src="/images/xstream-logo2.png" alt="Xstream" className={styles.bannerLogo} w="auto" h={60} />
                    <Group gap={10}>
                        {menu.map((item, index) => (
                            <Link href={item.href} key={index} className={styles.menuItem}>
                                <Text c="gray">{item.label}</Text>
                            </Link>
                        ))}
                        <Link href="/signin" className={styles.menuItem}>
                            <Button color="red" variant="filled" size="xs" leftSection={<IconUser size={16} />}>Sign In</Button>
                        </Link>
                    </Group>
                </Group>
            </Container>
        </div>
    )
}

export default Header