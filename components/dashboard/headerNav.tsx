import React from 'react'
import styles from './headernav.module.css'
import { rem, Tabs, Title } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import router from 'next/router'

interface IconProps {
    icon: React.ReactNode
    label: string
    url: string
    type: string
}

interface HeaderNavProps {
    title: string
    navList: IconProps[]
    setTab: (tab: string) => void
    tab?: string
}

const HeaderNav = ({ title, navList, setTab, tab }: HeaderNavProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title order={1} className={styles.title}>{title}</Title>
                <div className={styles.tabsContainer}>
                    <Tabs variant="outline" defaultValue={tab} classNames={styles}>
                        <Tabs.List>
                            {navList.map((item, index) => (
                                <Tabs.Tab
                                    key={index}
                                    value={item.label}
                                    leftSection={item.icon}
                                    onClick={() => {
                                        if (item.type === 'tab') {
                                            setTab(item.label)
                                        }
                                        if (item.type === 'link') {
                                            router.push(item.url)
                                        }
                                    }}
                                >
                                    {item.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs>
                </div>
            </div>

        </div>
    )
}

export default HeaderNav