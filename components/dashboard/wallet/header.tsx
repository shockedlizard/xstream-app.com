import React, { useState } from 'react'
import styles from './header.module.css'
import { Button, Loader, Text, Center, Group, ActionIcon, Skeleton, CopyButton } from '@mantine/core'
import { IconCopy, IconPlus, IconWorldWww, IconQrcode, IconExchange, IconArrowsExchange2, IconHistory, IconArrowUp, IconCheck } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'

interface WalletPageHeaderProps {
    setActiveMenu: (menu: string) => void
    activeMenu: string
    loading: boolean
    xtrBalance: number
    address: string
    pendingTransfer: number
}



const WalletPageHeader = ({ setActiveMenu, activeMenu, loading, xtrBalance, address, pendingTransfer }: WalletPageHeaderProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');   
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.balance}>
                    <div className={styles.balanceTextContainer}>
                        <Text className={styles.balanceText}>{loading ? <Center><Loader w={60} h={60} type="dots" /></Center> : xtrBalance}</Text>
                    </div>
                    <Text className={styles.balanceTextInfo}>Available Balance</Text>
                    <Text className={styles.balanceTextPending}>Pending Balance <span className={styles.balanceTextPendingValueNegative}>{pendingTransfer * -1}</span></Text>
                </div>
                <div className={styles.navigation}>
                    <Group justify='space-between' align='center' gap={5}>
                        <Button className={styles.button} leftSection={<IconHistory size={16} />} radius='xl' color='red.6' onClick={() => setActiveMenu("history")} variant={activeMenu === "history" ? "filled" : "light"}>History</Button>
                        <Button className={styles.button} leftSection={<IconArrowUp size={16} />} radius='xl' color='red.6' onClick={() => setActiveMenu("withdraw")} variant={activeMenu === "withdraw" ? "filled" : "light"}>Withdraw</Button>
                        <Button className={styles.button} leftSection={<IconArrowsExchange2 size={16} />} radius='xl' color='red.6' onClick={() => setActiveMenu("swap")} variant={activeMenu === "swap" ? "filled" : "light"}>Swap</Button>
                    </Group>
                </div>
                <div className={styles.walletAddress}>
                    <Group justify='center' align='center' gap={5}>
                        {loading ? <Center><Skeleton w={200} h={20} /></Center> : 
                        isMobile ?
                        <Text className={styles.walletAddressText}>{address.split("").slice(0, 16).join("")}...</Text> :
                        <Text className={styles.walletAddressText}>{address}</Text>                        
                        }
                        <CopyButton value="https://mantine.dev">
                            {({ copied, copy }) => (
                                <ActionIcon variant="filled" color="orange.7" size="md" onClick={copy}>
                                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                </ActionIcon>
                            )}
                        </CopyButton>
                        <ActionIcon color="orange.7" onClick={() => window.open("https://bscscan.com/address/" + address, "_blank")}><IconWorldWww size={16} /></ActionIcon>
                        <ActionIcon color="orange.7"><IconQrcode size={16} /></ActionIcon>
                    </Group>

                </div>
            </div>

            <div className={styles.body}>

            </div>
        </div>
    )
}

export default WalletPageHeader

