import { Button, Container, Group, Image, Text, Burger, Modal, Drawer, Space } from '@mantine/core'
import React from 'react'
import styles from './header.module.css'
import { IconUser, IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks'


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
const Header = ({ section, setSection }: { section: string, setSection: (section: string) => void }) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <div className={styles.header}>
                <Container size="xl" className={styles.headerContainer}>
                    <Group justify="space-between" w="100%" p={0}>
                        <Image src="/images/xstream-logo2.png" alt="Xstream" className={styles.bannerLogo} w="auto" h={60} />
                        <Group gap={10} className={styles.hideXs}>
                            {menu.map((item, index) => (
                                <div key={index} className={`${styles.menuItem} ${section === item.label ? styles.active : ''}`} onClick={() => setSection(item.label)}>
                                    <Text>{item.label}</Text>
                                </div>
                            ))}
                            <Link href="/signin" className={styles.menuItem}>
                                <Button color="red" variant="filled" size="xs" leftSection={<IconUser size={16} />}>Sign In</Button>
                            </Link>
                        </Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                    </Group>
                    <Drawer opened={opened} onClose={toggle} title="Authentication" position="right">
                        <MobileMenu close={toggle} section={section} setSection={setSection} />
                    </Drawer>
                </Container>

            </div>
        </>
    )
}

export default Header

const MobileMenu = ({ close, section, setSection }: { close: () => void, section: string, setSection: (section: string) => void }) => {
    return (
        <div className={styles.mobileMenu}>
            <div className={styles.menuList}>
                {menu.map((item, index) => (
                    <div key={index} className={`${styles.menuItem} ${section === item.label ? styles.active : ''}`} onClick={() => {
                        setSection(item.label)
                        close()
                    }}>
                        <Text>{item.label}</Text>
                    </div>
                ))}
            </div>
            <Link href="/signin" className={styles.menuItem}>
                <Button fullWidth color="red" variant="filled" size="lg" leftSection={<IconUser size={16} />}>Sign In</Button>
            </Link>

        </div>
    )
}
