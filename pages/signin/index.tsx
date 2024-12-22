import {
    Anchor,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Image,
    Center
} from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import classes from './signin.module.css';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import router from 'next/router';

const SignInPage = () => {

    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: { 
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null)
        }
    })

    const handleLogin = async () => {
        setLoading(true);
        const result = await signIn("credentials", {
            redirect: false,
            email: form.values.email,
            password: form.values.password,
        });
    
        if (result?.ok) {
            router.push("/dashboard"); // Gunakan router.push untuk redirect
        } else {
            // Handle error tanpa memanggil signIn lagi
            console.error(result?.error);
        }
        setLoading(false);
    };
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Center><Image src="/images/xstream-logo.png" alt="logo" w={200} height="auto" /></Center>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>Welcome Back XStreamer!</Title>
                <form onSubmit={form.onSubmit(() => handleLogin())}>
                    <TextInput required label="Email address" placeholder="hello@gmail.com" size="md" c="white" {...form.getInputProps('email')} />
                    <PasswordInput required label="Password" placeholder="Your password" mt="md" size="md" c="white" {...form.getInputProps('password')} />
                    <Button 
                    type="submit" 
                        fullWidth mt="xl"
                         size="md" bg="#fb2244" c="white" leftSection={<IconLock size={16} />} loading={loading}>Login</Button>
                </form>
                <Text ta="center" mt="md" c="white">
                    Don&apos;t have an account?{' '}
                    <Anchor<'a'> href="/signup" fw={700} c="white">
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
}

export default SignInPage;