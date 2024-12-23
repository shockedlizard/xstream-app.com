import React, { useState } from 'react'
import { SimpleGrid, Text, Group, Badge, Center, Container, TextInput, Button, Title, SegmentedControl, Select, Grid, NumberInput, Divider, rem, Checkbox, Table, Menu, ActionIcon, Tabs } from '@mantine/core'
import classes from './private-sale.module.css'
import { IconArrowLeftRight, IconArrowsExchange, IconChevronRight, IconDotsVertical, IconFlameFilled, IconHistory, IconList, IconTrash } from '@tabler/icons-react'
import HeaderNav from '@/components/dashboard/headerNav'


const PrivateSale = () => {

    const [currentPrice, setCurrentPrice] = useState(0.0625)
    const [swapValue, setSwapValue] = useState(0.0625)
    const [swapPercentage, setSwapPercentage] = useState(0.7)
    const [tab, setTab] = useState('Order')

    const data = [
        { id: 1, title: "Current price", value: currentPrice, symbol: "USDT" },
        { id: 2, title: "Swap Value", value: currentPrice * swapPercentage, symbol: "USDT" },
        { id: 3, title: "Swap Percentage", value: swapPercentage, symbol: "%" },
    ]

    const navList = [
        { label: 'Order', icon: <IconList size={16} />, url: "", type: 'tab' },
        { label: 'History', icon: <IconHistory size={16} />, url: "", type: 'tab' }
    ]   

    console.log(tab);
    
    return (
        <div className={classes.container}>
            <HeaderNav title='Private Sale' navList={navList} setTab={setTab} tab={tab}/>
            <div className={classes.body}>
                {tab === 'Order' ?
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Order currentPrice={currentPrice} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <div className={classes.header}>
                                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} className={classes.grid} w="100%">
                                    {data.map((item, index) => (
                                        <div key={index} className={classes.gridItem}>
                                            <Text className={classes.title}>{item.title}</Text>
                                            <Text className={classes.value}>{item.value} <span>{item.symbol}</span></Text>
                                            {item.id === 1 &&
                                                <Center mt="md">
                                                    <Badge color="red" variant="transparent" leftSection={<IconFlameFilled size={16} fontVariant="outline" color="red" />}>Price will increase soon</Badge>
                                                </Center>
                                            }

                                        </div>
                                    ))}
                                </SimpleGrid>
                            </div>
                        </Grid.Col>

                    </Grid>
                    :
                    <OrderHistory />
                }
            </div>
        </div>
    )
}

export default PrivateSale

const Order = ({ currentPrice }: { currentPrice: number }) => {
    const [buyType, setBuyType] = useState('XTR')
    const [amount, setAmount] = useState(0)
    const [amountXtr, setAmountXtr] = useState(0)
    const [amountUsdt, setAmountUsdt] = useState(0)

    return (
        <div className={classes.order}>
            <Title order={3}>Join Private Sale</Title>
            <Group w="100%" justify="space-between" grow>
                <NumberInput
                    value={amount}
                    onChange={
                        (value) => {
                            console.log(value)
                            if (buyType === 'XTR') {
                                setAmountXtr(Number(value))
                                setAmountUsdt(Number(value) * currentPrice)
                            } else {
                                setAmountUsdt(Number(value))
                                setAmountXtr(Number(value) / currentPrice)
                            }
                        }
                    }
                    allowNegative={false}
                    placeholder="Enter Amount"
                    size="lg"
                    classNames={{
                        input: classes.input
                    }}
                />
                <SegmentedControl
                    w="auto"
                    bg="transparent"
                    size="lg"
                    variant="transparent"
                    value={buyType}
                    onChange={
                        (value) => {
                            setBuyType(value)
                            setAmountXtr(0)
                            setAmountUsdt(0)
                        }
                    }
                    data={[
                        { value: 'XTR', label: 'XTR' },
                        { value: 'USDT', label: 'USDT' }
                    ]}

                    classNames={{
                        label: classes.segmentedControlLabel
                    }}
                />
            </Group>
            <Select
                data={['BSC (BEP20)', 'ERC20 (ETH)', 'TRC20 (TRON)', 'Polygon (Matic)']}
                placeholder="Select Network"
                size="lg"
            />
            <Divider mt="md" label="Please review your order before submit" labelPosition="center" style={{ fontSize: rem(16), fontWeight: 600 }} size="xs" variant="dashed" />
            <Group justify="space-between" className={classes.info}>
                <Text className={classes.title}>Total XTR Received</Text>
                <Text className={classes.value}>{amountXtr} XTR</Text>
            </Group>
            <Group justify="space-between" className={classes.info}>
                <Text className={classes.title}>Total USDT paid</Text>
                <Text className={classes.value}>{amountUsdt} USDT</Text>
            </Group>
            <Checkbox
                mt="md" size="lg" maw={400}
                label={<Text>I have read and agree to the <a href="/terms-of-service">Terms of Service</a></Text>}
            />
            <Button mt="md" size="lg" w="100%" color="red" leftSection={<IconArrowsExchange size={25} />}>Buy Private Sale</Button>
        </div>
    )
}

const OrderHistory = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={classes.orderHistory}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Order ID</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th ta="right">Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>1</Table.Td>
                        <Table.Td>100</Table.Td>
                        <Table.Td>Pending</Table.Td>
                        <Table.Td ta="right">
                            <Menu opened={opened} onChange={setOpened}>
                                <Menu.Target>
                                    <Button leftSection={<IconDotsVertical size={16} />} variant="filled" color="blue.7">Action
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown bg="transparent" variant="transparent" >
                                    <Menu.Item bg="transparent" variant="transparent" >
                                        <Button>Cancel</Button>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </div>
    )
}
