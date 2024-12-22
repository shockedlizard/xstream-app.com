import { Image, SimpleGrid, Title, Text, Center, Divider, Tabs } from '@mantine/core'
import React, { useState } from 'react'
import styles from './publicSale.module.css'


const presalePlatform = [
    {
        name: "Seedify",
        img: "/images/logo/seedify.png",
    },
    {
        name: "Unicrypt",
        img: "/images/logo/Unicrypt.svg",
    },
    {
        name: "DxSale",
        img: "/images/logo/DxSale.png",
    },
    {
        name: "Coinsniper",
        img: "/images/logo/coinsniper.png",
    }
]

const PublicSale = () => {
    const [tab, setTab] = useState('order');
    return (
        <div className={styles.presale}>
            <div className={styles.presaleHeader}>
                <Title className={styles.presaleTitle}>Presale</Title>
            </div>
            <Tabs value={tab} onChange={(value) => setTab(value || 'order')} color='red'>
                <Tabs.List px={20}>
                    <Tabs.Tab value="order" fz={20}>Order</Tabs.Tab>
                    <Tabs.Tab value="history" fz={20}>History</Tabs.Tab>
                </Tabs.List>
                    </Tabs>
            <div className={styles.presaleBody}>
                <SimpleGrid cols={4} pt={20}>
                    {presalePlatform.map((item, index) => (
                        <div key={index} className={styles.presalePlatform}>
                            <Center><Image src={item.img} alt={item.name} className={styles.presalePlatformImage} /></Center>
                            <Text className={styles.presalePlatformName}>{item.name}</Text>
                        </div>
                    ))}
                </SimpleGrid>
            </div>
        </div>
    )
}

export default PublicSale