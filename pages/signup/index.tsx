import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Image,
    Center
} from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';
import classes from './signin.module.css';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useState } from 'react';
import router from 'next/router';

const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            referralCode: ''
        },
        validate: { 
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
            referralCode: (value) => (value.length < 1 ? 'Referral Code is required' : null)
        }
    })

    const signIn = async (values: { email: string; password: string }) => {

        try {
            const response = await axios.post('/api/auth', values);
            if(response.status === 201) {
                router.push('/signin');
            } else {
                console.error('Sign in error:', response);
            }
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Center><Image src="/images/xstream-logo.png" alt="logo" w={200} height="auto" /></Center>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>Register Your Account!</Title>
                <form onSubmit={form.onSubmit((values) => signIn(values))}>
                    <TextInput required label="Name" placeholder="John Doe" size="md" c="white" {...form.getInputProps('name')} />
                    <TextInput required label="Email address" placeholder="hello@gmail.com" size="md" mt="xs"c="white" {...form.getInputProps('email')} />
                    <PasswordInput required label="Password" placeholder="Your password" mt="xs" size="md" c="white" {...form.getInputProps('password')} />
                    <PasswordInput required label="Confirm Password" placeholder="Confirm password" mt="xs" size="md" c="white" {...form.getInputProps('confirmPassword')} />   
                    <TextInput required label="Referral Code" placeholder="Referral Code" mt="xs" size="md" c="white" {...form.getInputProps('referralCode')} />
                    <Button loading={loading} type="submit" fullWidth mt="xl" size="md" bg="#fb2244" c="white" leftSection={<IconUserPlus size={16} />}>Sign Up</Button>
                </form>
                <Text ta="center" mt="md" c="white">
                    Don&apos;t have an account?{' '}
                    <Anchor<'a'> href="/signin" fw={700} c="white">
                        Sign In
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
}

export default SignInPage;