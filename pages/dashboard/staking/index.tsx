import { Image, SimpleGrid, Title, Text, Center, Button, Group, Box, Divider, Badge, Tabs, NumberInput } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './staking.module.css'
import { IconArrowRight, IconBolt, IconBoltFilled, IconCheck, IconChevronRight, IconClock, IconHourglass, IconReload, IconStar, IconX } from '@tabler/icons-react'
import axios from 'axios'
import { Status } from '@prisma/client'


const StakingPlatform = [
    {
        name: "Lite",
        img: "/images/logo/seedify.png",
        min: 100,
        max: 4900,
        dailyReward: 0.5,
        popular: false,
    },
    {
        name: "Regular",
        img: "/images/logo/Unicrypt.svg",
        min: 5000,
        max: 49000,
        dailyReward: 0.7,
        popular: false,
    },
    {
        name: "Bold",
        img: "/images/logo/DxSale.png",
        min: 50000,
        max: 100000,
        dailyReward: 1,
        popular: true,
    }
]

const Staking = () => {
    const [tab, setTab] = useState("lists")
    return (
        <div className={styles.staking}>
            <Group justify="space-between" align="center" p={20}>
                <Title className={styles.stakingTitle}>Staking <span> <IconChevronRight size={16} /> {tab === "lists" ? "Active" : "History"}</span></Title>
            </Group>
            <Tabs value={tab} onChange={(value) => setTab(value || 'referral')} color='red'>
                <Tabs.List px={20}>
                    <Tabs.Tab value="lists" fz={20}>Staking Lists</Tabs.Tab>
                    <Tabs.Tab value="new" fz={20}>New Staking</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            {tab === "lists" && <StakingLists />}
            {tab === "new" && <StakingNew setTab={setTab} />}

        </div>
    )
}

export default Staking

const formatNumber = (number: number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


interface StakingPackage {
    id: string
    img: string | null
    name: string
    description: string
    stakingDays: number
    minAmount: string
    maxAmount: string
    dailyReward: string
    status: string
    popular: boolean
}

interface Staking {
    id: string
    userId: string
    packageId: string
    amount: string
    status: 'WAITING' | 'PENDING' | 'RUNNING' | 'CANCELLED'
    canceledDate: string | null
    createdAt: string
    updatedAt: string
    package: StakingPackage
    lastRewardDate: string | null
}

const StakingLists = () => {
    const [staking, setStaking] = useState<Staking[]>([])
    const [loading, setLoading] = useState(false)

    const getStaking = useCallback(async () => {
        try {
            const response = await axios.get('/api/staking')
            setStaking(response.data)
        } catch (error) {
            console.error('Get staking error:', error)
        }
    }, [])

    useEffect(() => {
        getStaking()
    }, [getStaking])


    const [rewards, setRewards] = useState<{ [key: string]: number }>({});
    const [prevRewards, setPrevRewards] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const timer = setInterval(() => {
            setPrevRewards(rewards);
            const newRewards = { ...rewards };
            staking.forEach((item) => {
                const dailyReward = Number(item?.package?.dailyReward);
                const rewardPerSecond = dailyReward / 86400;
                if (item?.lastRewardDate) {
                    const totalSeconds = (new Date().getTime() - new Date(item?.lastRewardDate).getTime()) / 1000;
                    newRewards[item.id] = rewardPerSecond * totalSeconds;
                } else {
                    const totalSeconds = (new Date().getTime() - new Date(item?.createdAt).getTime()) / 1000;
                    newRewards[item.id] = rewardPerSecond * totalSeconds;
                }
            });
            setRewards(newRewards);
        }, 1000);
        return () => clearInterval(timer);
    }, [staking]);

    return (
        <div className={styles.stakingLists}>
            <Title className={styles.stakingListsTitle}>Staking Lists</Title>
            <SimpleGrid cols={3} pt={20}>
                {staking.map((item, index) => {

                    const status = item?.status === 'WAITING' ? 'WAITING' : item?.status === 'PENDING' ? 'PENDING' : item?.status === 'RUNNING' ? 'RUNNING' : 'CANCELLED';

                    const statusColor = item?.status === 'WAITING' ? 'yellow' : item?.status === 'PENDING' ? 'yellow' : item?.status === 'RUNNING' ? 'yellow' : 'red';

                    const icon = item?.status === 'WAITING' ? <IconClock size={16} /> : item?.status === 'PENDING' ? <IconClock size={16} /> : item?.status === 'RUNNING' ? <IconBoltFilled size={16} /> : <IconX size={16} />;

                    const startDate = new Date(item?.createdAt);
                    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                    const dailyReward = item?.package?.dailyReward;
                    const rewardPerSecond = Number(dailyReward) / 86400;
                    let totalReward = 0;
                    if (item?.lastRewardDate) {
                        const totalSeconds = (new Date().getTime() - new Date(item?.lastRewardDate).getTime()) / 1000;
                        totalReward = rewardPerSecond * totalSeconds;
                    } else {
                        const totalSeconds = (new Date().getTime() - new Date(item?.createdAt).getTime()) / 1000;
                        totalReward = rewardPerSecond * totalSeconds;
                    }
                    const hasChanged = prevRewards[item.id] !== rewards[item.id];

                    return (
                        <div key={index} className={styles.stakingListsItem}>

                            <Group justify="space-between" align="center" mb="md" className={styles.stakingListsItemId}>
                                <Text className={styles.stakingListsItemIdTixtle}>#{item?.id}</Text>
                                <Badge leftSection={icon} color={statusColor} variant="filled">{status}</Badge>
                            </Group>

                            <CurrentReward
                                rewards={rewards}
                                prevRewards={prevRewards}
                                item={item}
                            />

                            <Group justify="space-between" align="center">
                                <div>
                                    <Text className={styles.stakingListsItemTitle}>{item?.package?.name}</Text>
                                    <Text className={styles.stakingListsItemRewardInfo}>Package</Text>
                                </div>
                                <div>
                                    <Text className={styles.stakingListsItemAmount}>{item?.amount} <span> XTR</span></Text>
                                    <Text className={styles.stakingListsItemRewardInfo}>Amount</Text>
                                </div>
                                <div>
                                    <Text className={styles.stakingListsItemStartDate}>{formattedStartDate}</Text>
                                    <Text className={styles.stakingListsItemRewardInfo}>Start Date</Text>
                                </div>
                            </Group>

                            <Group justify="space-between" align="center" grow gap="xs">
                                <Button leftSection={<IconReload />} color="red" size="xs" disabled={item?.status === 'CANCELLED' || totalReward < 1} >Claim Reward</Button>
                                <Button leftSection={<IconX />} color="red" size="xs" disabled={item?.status === 'CANCELLED'}>Cancel</Button>
                            </Group>
                        </div>
                    )
                })}

            </SimpleGrid>
        </div>
    )
}

const formatDecimals = (number: number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 7, maximumFractionDigits: 7 });
}

const StakingNew = ({ setTab }: { setTab: (tab: string) => void }) => {

    const [stakingPackage, setStakingPackage] = useState<StakingPackage[]>([])
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(0);

    const selectedPackage = stakingPackage.find((item) => Number(item.minAmount) <= amount && Number(item.maxAmount) >= amount)

    const getStakingPackage = useCallback(async () => {
        try {
            const response = await axios.get('/api/staking/package')
            setStakingPackage(response.data)
        } catch (error) {
            console.error('Get staking package error:', error)
        }
    }, [])

    useEffect(() => {
        getStakingPackage()
    }, [getStakingPackage])

    const handleStake = async () => {
        if (!selectedPackage) {
            return
        }
        setLoading(true)
        try {
            const response = await axios.post('/api/staking', { packageId: selectedPackage.id, amount })
            console.log(response)
            setTab('lists')
        } catch (error) {
            console.error('Stake error:', error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className={styles.stakingNew}>
            <NumberInput
                label="Amount"
                size="lg"
                value={amount}
                onChange={(value: string | number) => setAmount(Number(value))}
                placeholder="Enter amount"
                min={100}
                max={1000000}
                step={100}
                maw={500}
            />
            <Box className={styles.stakingInformation}>
                {!selectedPackage ?
                    <div className={styles.stakingInformationContent}>
                        <Text className={styles.stakingInformationTitle}>Please enter amount between 100 and 1000000 and package will be selected automatically</Text>
                    </div>
                    :
                    <>
                        <div className={styles.stakingInformationContent}>
                            <Text className={styles.stakingInformationTitle}>Staking Information</Text>
                        </div>

                        <Group justify="space-between" align="center" className={styles.stakingInformationItem}>
                            <Text className={styles.stakingInformationItemTitle}>Selected Package</Text>
                            <Text className={styles.stakingInformationItemValue}>{selectedPackage?.name}</Text>
                        </Group>
                        <Group justify="space-between" align="center" className={styles.stakingInformationItem}>
                            <Text className={styles.stakingInformationItemTitle}>Total Staked</Text>
                            <Text className={styles.stakingInformationItemValue}>{formatNumber(amount)} <span className={styles.stakingInformationItemValueSymbol}>XTR</span></Text>
                        </Group>
                        <Group justify="space-between" align="center" className={styles.stakingInformationItem}>
                            <Text className={styles.stakingInformationItemTitle}>Daily Reward</Text>
                            {selectedPackage && <Text className={styles.stakingInformationItemValue}>{formatNumber((Number(selectedPackage?.dailyReward) / 100) * amount)} <span className={styles.stakingInformationItemValueSymbol}>XTR</span></Text>}
                        </Group>
                        <Group justify="space-between" align="center" className={styles.stakingInformationItem}>
                            <Text className={styles.stakingInformationItemTitle}>Monthly Reward</Text>
                            {selectedPackage && <Text className={styles.stakingInformationItemValue}>{formatNumber((Number(selectedPackage?.dailyReward) / 100) * amount * 30)} <span className={styles.stakingInformationItemValueSymbol}>XTR</span></Text>}
                        </Group>
                        <Group justify="space-between" align="center" className={styles.stakingInformationItem}>
                            <Text className={styles.stakingInformationItemTitle}>Yearly Reward</Text>
                            {selectedPackage && <Text className={styles.stakingInformationItemValue}>{formatNumber((Number(selectedPackage?.dailyReward) / 100) * amount * 365)} <span className={styles.stakingInformationItemValueSymbol}>XTR</span></Text>}
                        </Group>
                        <Group justify="flex-end" align="center" className={styles.stakingInformationButton}>
                            <Button mt="xl" className={styles.stakingInformationButton} leftSection={<IconArrowRight />} color="red" onClick={handleStake}>Stake Now</Button>
                        </Group>
                    </>
                }
            </Box>

            {/* <SimpleGrid cols={3} pt={20} className={styles.stakingNew}>

            {stakingPackage.map((item, index) => (
                <div key={index} className={styles.stakingPlatform}>
                    <div className={styles.stakingPlatformContent}>
                        <Box bg="gray.9" w="100%" h={200} className={styles.stakingPlatformImage} />
                        <Group justify="space-between" align="center">
                            <Text className={styles.stakingPlatformName}>{item.name}</Text>
                            {item.popular && <Badge color="red" leftSection={<IconStar />} className={styles.stakingPlatformPopular}>Popular</Badge>}
                        </Group>

                        <Group justify="space-between" className={styles.stakingPlatformDescription}>
                            <Text className={styles.stakingPlatformDescriptionTitle}>Minimum</Text>
                            <Text className={styles.stakingPlatformDescriptionValue}>{formatNumber(Number(item.minAmount))}</Text>
                        </Group>

                        <Group justify="space-between" className={styles.stakingPlatformDescription}>
                            <Text className={styles.stakingPlatformDescriptionTitle}>Maximum</Text>
                            <Text className={styles.stakingPlatformDescriptionValue}>{formatNumber(Number(item.maxAmount))}</Text>
                        </Group>

                        <Group justify="space-between" className={styles.stakingPlatformDescription}>
                            <Text className={styles.stakingPlatformDescriptionTitle}>Daily Reward</Text>
                            <Text className={styles.stakingPlatformDescriptionValue}>{Number(item.dailyReward)} %</Text>
                        </Group>
                    </div>
                    <Button className={styles.stakingPlatformButton} leftSection={<IconArrowRight />} color="red" onClick={() => handleStake(item.id)}>Stake Now</Button>
                </div>
                ))}
            </SimpleGrid> */}
        </div>
    )
}
const CurrentReward = ({ rewards, prevRewards, item }: {
    rewards: { [key: string]: number },
    prevRewards: { [key: string]: number },
    item: Staking
}) => {
    return (
        <>
            <div className={styles.rewardContainer}>
                <Text ta="center" className={styles.stakingListsItemReward}>
                    {formatDecimals(rewards[item.id] || 0)}
                    <span> XTR</span>
                </Text>
                {prevRewards[item.id] !== rewards[item.id] && (
                    <Text
                        className={styles.rewardDiff}
                        ta="center"
                    >
                        +{formatDecimals(rewards[item.id] - (prevRewards[item.id] || 0))}
                    </Text>
                )}
            </div>
            <Text ta="center" className={styles.stakingListsItemRewardInfo}>
                Current Reward
            </Text>
        </>
    );
};