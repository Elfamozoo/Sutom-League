import React from 'react';
import "../styles/Home.css";
import { registerWithEmailAndPassword, logInWithEmailAndPassword } from '../firebase-config'
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


const SignUp = () => {

    const form = useForm<{ login: string; email: string; password: string }>({
        initialValues: {
            login: '',
            email: '',
            password: '',
        },

        validate: {
            login: (value: any) => value.length < 3 ? 'Pseudo trop court' : null,
            email: (value: any) => (/^\S+@\S+$/.test(value) ? null : 'Mail invalide'),
            Password: (value: any) => (/^(.{0,7}|[^a-z]{1,}|[^A-Z]{1,}|[^\d]{1,}|[^\W]{1,})$|[\s]/.test(value) ? 'Mot de passe invalide' : null),
        },
    });

    return (
        <>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => registerWithEmailAndPassword(values.login, values.email, values.password))}>
                    <TextInput
                        required
                        label="Pseudo"
                        placeholder="PseudoDu93"
                        {...form.getInputProps('login')}
                    />

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
                        <Button type="submit">S'inscrire</Button>
                    </Group>
                </form>
            </Box>
        </>
    )

}

export default SignUp;
