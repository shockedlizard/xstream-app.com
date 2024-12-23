import React, { useState, useEffect, useCallback } from 'react'
import styles from './wallet.module.css'
import { Box, Group, Text, Button, ActionIcon, Table, Title, Divider, CopyButton, Loader, Center, ThemeIcon, TextInput, Space, NumberInput, Badge, Select, ScrollArea } from '@mantine/core'
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowsExchange2, IconArrowUp, IconBolt, IconBoltFilled, IconCheck, IconClock, IconCopy, IconHistory, IconProgressBolt, IconQrcode } from '@tabler/icons-react'
import axios from 'axios'
import { formatNumber, timeAgo, truncateText, validateAddress } from '@/components/function'
import { useForm } from '@mantine/form'
import WalletPageHeader from '@/components/dashboard/wallet/header'
interface History {
    id: string;
    walletId: string;
    blockNumber: string;
    transactionHash: string;
    from: string;
    to: string;
    value: string;
    timestamp: string;
    date: string;
    type: string;
    status: string;
    gas: string;
}


const WalletPage = () => {
    const [activeMenu, setActiveMenu] = useState("history")
    const [address, setAddress] = useState("")
    const [bnbBalance, setBnbBalance] = useState(0)
    const [xtrBalance, setXtrBalance] = useState(0)
    const [loading, setLoading] = useState(true)
    const [xtrHistory, setXtrHistory] = useState<History[]>([])
    const [pendingTransfer, setPendingTransfer] = useState(0)

    const getAddress = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/wallet/address');
            console.log(response.data)
            setAddress(response.data.address);
            setBnbBalance(response.data.bnbBalance);
            setXtrBalance(response.data.xtrBalance);
            setXtrHistory(response.data.xtrHistory);
            setPendingTransfer(response.data.pendingTransfer);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        getAddress();
    }, [getAddress]);

    const reload = (menu: string) => {
        getAddress()
        setActiveMenu(menu)
    }

    return (
        <div className={styles.walletPage}>
            <WalletPageHeader setActiveMenu={setActiveMenu} activeMenu={activeMenu} loading={loading} xtrBalance={xtrBalance} address={address} pendingTransfer={pendingTransfer} />
            {activeMenu === "history" && <History xtrHistory={xtrHistory} loading={loading} />}
            {activeMenu === "withdraw" && <Withdraw balance={xtrBalance} reload={setActiveMenu} />}
            {activeMenu === "swap" && <Swap balance={xtrBalance} reload={setActiveMenu} />}
        </div>
    )
}

export default WalletPage

const History = ({ xtrHistory, loading }: { xtrHistory: History[], loading: boolean }) => {

    const row = xtrHistory.map((item: History) => (
        <Table.Tr key={item.id}>
            <Table.Td>{item.transactionHash ? truncateText(item.transactionHash, 10) : <Badge size="md" color="yellow">Pending</Badge>}</Table.Td>
            <Table.Td>{item.type}</Table.Td>
            <Table.Td>{item.blockNumber ? item.blockNumber : "-"}</Table.Td>
            <Table.Td>{item.date ? timeAgo(item.date) : "-"}</Table.Td>
            <Table.Td>{item.from ? truncateText(item.from, 10) : "-"}</Table.Td>
            <Table.Td>{item.to ? truncateText(item.to, 10) : "-"}</Table.Td>
            <Table.Td ta="right">{item.value ? formatNumber(Number(item.value)) : "-"}</Table.Td>
        </Table.Tr>
    ))

    return (
        <div className={styles.history}>
            <Title className={styles.historyTitle}>History</Title>
            <Divider />
            <ScrollArea h={500}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                        <Table.Th>Tx Hash</Table.Th>
                        <Table.Th>Method</Table.Th>
                        <Table.Th>Block</Table.Th>
                        <Table.Th>Age</Table.Th>
                        <Table.Th>From</Table.Th>
                        <Table.Th>To</Table.Th>
                        <Table.Th ta="right">Amount</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {loading ? <Loading /> : row}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </div>
    )
}

const Loading = () => {
    return (
        <Text className={styles.walletLoading} p={10}>
            Please wait...
        </Text>
    )
}



const Withdraw = ({ balance, reload }: { balance: number, reload: (menu: string) => void }) => {

    const [amount, setAmount] = useState(0)
    const [destinationAddress, setDestinationAddress] = useState("")
    const [addressError, setAddressError] = useState<string | null>(null)
    const [amountError, setAmountError] = useState<string | null>(null)
    const [fee, setFee] = useState(1)
    const [min, setMin] = useState(10)
    const [max, setMax] = useState(10000000)


    const handleWithdraw = async () => {

        if (!validateAddress(destinationAddress)) {
            setAddressError("Invalid address")
            return
        }

        if (amount < min || amount > max) {
            setAmountError("Amount must be between " + min + " and " + max)
        }
        if (amount > balance) {
            setAmountError("Insufficient balance")
        }

        try {
            const response = await axios.post('/api/wallet/req-transfer', {
                amount: amount,
                destinationAddress: destinationAddress
            })
            reload("history")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className={styles.withdraw}>
            <Title className={styles.historyTitle}>Withdraw</Title>
            <Text>Transfer XTR to another wallet</Text>
            <Space h="xs" />
            <Text>Transfer fee: 1 XTR</Text>
            <Text>Minimum Transfer: {min} XTR</Text>
            <Text>Maximum Transfer: {max} XTR</Text>
            <TextInput
                placeholder="0x..."
                label="Destination Address"
                value={destinationAddress}
                onChange={(e) => {
                    setDestinationAddress(e.target.value)
                    setAddressError(null)
                }}
                error={addressError}
                maw={600}
                size="md"
                mt="md"
            />

            <Group justify="flex-start" gap="xs" align="flex-end" mt="sm">
                <NumberInput
                    value={amount}
                    onChange={(e) => {
                        setAmount(Number(e))
                        setAmountError(null)
                    }}
                    placeholder="Amount"
                    label="Amount"
                    rightSection={<Badge>XTR</Badge>}
                    rightSectionWidth={50}
                    maw={300}
                    size="md"
                    min={min}
                    max={max}
                    allowNegative={false}
                    error={amountError}
                    inputWrapperOrder={["label", 'error', "input", "description"]}
                />
                <Button size="md" mt="md" rightSection={<IconArrowRight size={16} />} onClick={handleWithdraw}>Withdraw</Button>
            </Group>
            <Text mt="md">Amount received: {amount > 0 ? amount - fee : 0} XTR</Text>

        </div>
    )
}

const Swap = ({ balance, reload }: { balance: number, reload: (menu: string) => void }) => {
    const [rate, setRate] = useState(0.0625)
    const [tax, setTax] = useState(30)
    const [amount, setAmount] = useState(0)
    const [fee, setFee] = useState(1)
    const [network, setNetwork] = useState("BEP20")
    const [usdtAmount, setUsdtAmount] = useState(0)
    const [min, setMin] = useState(10)
    const [max, setMax] = useState(10000000)
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            amount: 0,
            network: "BEP20",
            destinationAddress: "",
        },
        validate: {
            amount: (value) => {
                if (value < min || value > max) {
                    return "Amount must be between " + min + " and " + max
                }
                if (value > balance) {
                    return "Insufficient balance"
                }
                return null
            },
            destinationAddress: (value) => !validateAddress(value) ? "Invalid address" : null
        }
    })

    const handleSwap = async (values: any) => {
        setLoading(true)
        const allData = { ...values, usdtAmount }
        console.log(allData)
        try {
            const response = await axios.post('/api/wallet/swap', allData)
            console.log(response)
            reload("history")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setUsdtAmount(((form.values.amount - fee) * rate) - (tax / 100 * ((form.values.amount - fee) * rate)))
    }, [form.values.amount])
    return (
        <div className={styles.swap}>
            <Title className={styles.historyTitle}>Swap</Title>
            <Text>Swap XTR to USDT</Text>
            <Text>Swap Rate: 1 XTR = {rate} USDT</Text>
            <Text>Tax: {tax}%</Text>
            <Text>Swap Fee: {fee} XTR</Text>

            <form onSubmit={form.onSubmit((values) => handleSwap(values))}>
                <TextInput
                    required
                    mt="xl"
                    placeholder="0x..."
                    label="Destination Address"
                    maw={500}
                    {...form.getInputProps('destinationAddress')}
                />
                <NumberInput
                    required
                    placeholder="Amount"
                    label="Amount"
                    mt="xs"
                    maw={200}
                    rightSection={<Badge radius="xs" color="gray.7">XTR</Badge>}
                    rightSectionWidth={50}
                    value={amount}
                    {...form.getInputProps('amount')}

                />
                <Select
                    required
                    data={["BEP20", "ERC20", "TRC20"]}
                    placeholder="Select Network"
                    mt="xs"
                    label="Select Network"
                    maw={200}
                    value={network}
                    {...form.getInputProps('network')}
                />
                <Text mt="md">Received USDT: {usdtAmount.toFixed(2)} USDT</Text>

                <Button
                    type="submit"
                    mt="md"
                    leftSection={<IconArrowsExchange2 />}
                    onClick={handleSwap}
                    loading={loading}
                >Swap</Button>
            </form>
        </div>
    )
}

