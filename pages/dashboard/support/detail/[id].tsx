// pages/dashboard/support/detail/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
    Paper,
    Title,
    Text,
    Badge,
    Stack,
    Group,
    Textarea,
    Button,
    Card,
    Avatar,
    Divider,
    LoadingOverlay
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import styles from './detail.module.css';
interface Reply {
    id: string;
    message: string;
    createdAt: string;
    user: {
        name: string;
        image: string;
    };
}
interface Ticket {
    id: string;
    subject: string;
    message: string;
    priority: string;
    status: string;
    createdAt: string;
    replies: Reply[];
}

export default function TicketDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        if (id) fetchTicket();
    }, [id]);
    const fetchTicket = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/support/${id}`);
            if (!res.ok) throw new Error('Failed to fetch ticket');
            const data = await res.json();
            setTicket(data);
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to fetch ticket details',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };
    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim()) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/support/repply?id=${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: reply })
            });
            if (!res.ok) throw new Error('Failed to submit reply');
            notifications.show({
                title: 'Success',
                message: 'Reply sent successfully',
                color: 'green'
            });
            setReply('');
            fetchTicket(); // Refresh ticket data
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to send reply',
                color: 'red'
            });
        } finally {
            setSubmitting(false);
        }
    };
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
    if (loading) return <LoadingOverlay visible={true} />;
    if (!ticket) return null;


    return (
        <Stack gap="xl" className={styles.container}>
            <div className={styles.header}>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Title order={3}>{ticket.subject}</Title>
                        <Group>
                            <Badge color={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                            </Badge>
                            <Badge color={getStatusColor(ticket.status)}>
                                {ticket.status}
                            </Badge>
                        </Group>
                    </Group>
                    <Text size="sm" color="dimmed">
                        Created on {new Date(ticket.createdAt).toLocaleString()}
                    </Text>
                    <Text>{ticket.message}</Text>
                </Stack>
            </div>

            <Divider label="Replies" labelPosition="center" className={styles.divider} />
            <Stack gap="md" className={styles.reply}>
                {ticket.replies.map((reply) => (
                    <Card key={reply.id} padding="md" className={styles.replyCard} withBorder={false}>
                        <Group>
                            <Avatar src={reply.user.image} radius="xl" />
                            <div>
                                <Text fw={500}>{reply.user.name}</Text>
                                <Text size="xs" c="dimmed">{new Date(reply.createdAt).toLocaleString()}</Text>
                            </div>
                            
                        </Group>
                        <Text mt="sm">{reply.message}</Text>
                    </Card>
                ))}
            </Stack>
            {ticket.status !== 'CLOSED' && (
                <div className={styles.reply}>
                    <form onSubmit={handleReply}>
                        <Stack gap="md">
                            <Textarea
                                placeholder="Type your reply..."
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                minRows={3}
                                required
                                maw={700}
                            />

                            <Button
                                maw={300}
                                type="submit"
                                loading={submitting}
                                disabled={!reply.trim()}
                                className={styles.replyButton}
                            >
                                Send Reply
                            </Button>
                        </Stack>
                    </form>
                </div>
            )}
        </Stack>
    );
}
