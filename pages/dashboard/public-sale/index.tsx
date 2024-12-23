import { Image, SimpleGrid, Title, Text, Center, Divider, Tabs } from '@mantine/core'
import React, { useState } from 'react'
import styles from './publicSale.module.css'
import { IconHistory } from '@tabler/icons-react'
import { IconList } from '@tabler/icons-react'
import HeaderNav from '@/components/dashboard/headerNav'


const presalePlatform = [
    {
        name: "Seedify",
        img: "/images/logo/seedify.png",
    },
    {
        name: "Unicrypt",
        img: "/images/logo/Unicrypt.png",
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
    const [tab, setTab] = useState('Order');

    const navList = [
        { label: 'Order', icon: <IconList size={16} />, url: "", type: 'tab' },
        // { label: 'Information', icon: <IconHistory size={16} />, url: "", type: 'tab' }
    ]

    return (
        <div className={styles.presale}>
            <HeaderNav title='Public Sale' navList={navList} setTab={setTab} tab={tab} />

            {tab === 'Order' && <PresalePlatform />}
            {/* {tab === 'Information' && <Information />} */}
        </div>
    )
}

export default PublicSale

const Information = () => {
    return (
        <div>Information</div>
    )
}

const PresalePlatform = () => {
    return (
        <div className={styles.presaleContainer}>
            <Title className={styles.presaleTitle}>Get Ready for the XSTREAM Presale!</Title>
            <Text className={styles.presaleSubtitle}>We are excited to announce that the XSTREAM presale will soon take place across some of the most trusted and renowned platforms in the crypto ecosystem. These include:

            </Text>
            <div className={styles.presaleBody}>
                <SimpleGrid cols={{ base: 2, lg: 4 }} pt={20}>
                    {presalePlatform.map((item, index) => (
                        <div key={index} className={styles.presalePlatform}>
                            <Center><Image src={item.img} alt={item.name} className={styles.presalePlatformImage} /></Center>
                            <Text className={styles.presalePlatformName}>{item.name}</Text>
                        </div>
                    ))}
                </SimpleGrid>
                <Text className={styles.presaleSubtitle}>
                    However, the exact presale platform and dates are yet to be confirmed. Rest assured, we are finalizing the details to ensure a smooth and rewarding experience for all participants.</Text>
                <Text className={styles.presaleSubtitle}>
                    To stay updated, make sure to subscribe to our email notifications. We'll send you timely updates with all the necessary information, including the final platform, dates, and how to participate.
                </Text>

                <Text className={styles.presaleSubtitle}>
                    Don't miss your chance to be part of this groundbreaking journey. Secure your spot in the XSTREAM presale by keeping an eye on your inbox!
                </Text>

                <Text className={styles.presaleSubtitle}>
                    Stay Connected: Visit our website or follow us on our social media channels for the latest announcements.
                </Text>

            </div>
        </div>
    )
}
