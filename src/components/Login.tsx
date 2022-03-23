import React from 'react';
import "../styles/Home.css";
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


const Login = () => {

    const form = useForm<{ email: string; password: string }>({
        initialValues: {
            email: '',
            password: '',
        },
    });

    return (
        <>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        required
                        label="Email"
                        placeholder="tonmail@email.com"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        required
                        label="Mot de passe"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />

                    <Group position="right" mt="md">
                        <Button type="submit">Connecter</Button>
                    </Group>
                </form>
            </Box>
        </>
    )

}

export default Login;
