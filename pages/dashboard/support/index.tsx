import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Modal,
    TextInput,
    Textarea,
    Select,
    Badge,
    Group,
    Title,
    Text,
    Stack,
    Tabs,
    Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import styles from './support.module.css'
import { IconSend } from '@tabler/icons-react';
import Link from 'next/link';

interface Ticket {
    id: string;
    subject: string;
    message: string;
    priority: string;
    status: string;
    createdAt: string;

}

const Support = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    const [activeTab, setActiveTab] = useState('tickets');

    // Fetch tickets
    const fetchTickets = async () => {
        try {
            const res = await fetch('/api/support');
            const data = await res.json();
            setTickets(data);
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to fetch tickets',
                color: 'red'
            });
        }
    };
    useEffect(() => {
        fetchTickets();
    }, []);
    
    // Create ticket

    return (
        <Stack gap="xl">
            <div className={styles.support}>
                <Box className={styles.supportBoxHeader}>
                    <Title className={styles.supportTitle}>Support</Title>
                </Box>
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'change-password')} color='red'>
                    <Tabs.List px={20}>
                        <Tabs.Tab value="tickets" fz={20}>Tickets</Tabs.Tab>
                        <Tabs.Tab value="new-ticket" fz={20}>Create Ticket</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <div className={styles.supportBody}>
                    {activeTab === 'tickets' && <Tickets tickets={tickets} />}
                    {activeTab === 'new-ticket' && <NewTicket fetchTickets={fetchTickets}  setActiveTab={setActiveTab}/>}
                </div>
            </div>
        </Stack>
    );
};

export default Support;

const Tickets = ({ tickets }: { tickets: Ticket[] }) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'yellow';
            case 'LOW': return 'blue';
            default: return 'gray';
        }
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'green';
            case 'CLOSED': return 'red';
            case 'PENDING': return 'yellow';
            default: return 'gray';
        }
    };
    return (<div>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Subject</Table.Th>
                    <Table.Th>Priority</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Created</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {tickets.map((ticket) => (
                    <Table.Tr key={ticket.id}>
                        <Table.Td>{ticket.subject}</Table.Td>
                        <Table.Td>
                            <Badge color={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                            </Badge>
                        </Table.Td>
                        <Table.Td>
                            <Badge color={getStatusColor(ticket.status)}>
                                {ticket.status}
                            </Badge>
                        </Table.Td>
                        <Table.Td>{new Date(ticket.createdAt).toLocaleDateString()}</Table.Td>
                        <Table.Td>
                            <Link href={`/dashboard/support/detail/${ticket.id}`}>
                                <Button variant="subtle" size="xs">
                                    View Details
                                </Button>
                            </Link>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    </div>
    );
};


const NewTicket = ({ fetchTickets, setActiveTab }: { fetchTickets: () => void, setActiveTab: (tab: string) => void }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        priority: 'MEDIUM'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                notifications.show({
                    title: 'Success',
                    message: 'Ticket created successfully',
                    color: 'green'
                });
                close();
                fetchTickets();
                setFormData({ subject: '', message: '', priority: 'MEDIUM' });
                setActiveTab('tickets');
            }
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to create ticket',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };


    return <div>
        <form onSubmit={handleSubmit}>
            <TextInput
                maw={400}
                required
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                mb="md"
            />
            <Textarea
                maw={400}
                required
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                mb="md"
                minRows={4}
            />
            <Select
                maw={200}
                label="Priority"
                value={formData.priority}
                onChange={(value) => setFormData({ ...formData, priority: value || 'MEDIUM' })}
                data={[
                    { value: 'HIGH', label: 'High' },
                    { value: 'MEDIUM', label: 'Medium' },
                    { value: 'LOW', label: 'Low' }
                ]}
                mb="xl"
            />
            <Button type="submit" loading={loading} maw={200} leftSection={<IconSend size={20} />}>Submit Ticket</Button>
        </form>
    </div>;
};  