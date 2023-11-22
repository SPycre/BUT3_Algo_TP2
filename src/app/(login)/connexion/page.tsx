"use client"
import { z } from 'zod';
import { Metadata } from "next/types";
import { TextInput, PasswordInput, Flex } from '@mantine/core'
import { Button, Card, Heading, SectionContainer } from "tp-kit/components";
import { useForm } from '@mantine/form'
import Link from "next/link";

export const metadata:Metadata = {
    title: `Connexion - Starbucks`,
    description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
  }

  export default function Connexion() {

    const form = useForm({
        initialValues: {
            email:'',
            password:''
        },
      });

    return (
                <Flex direction='column' gap="md">
                    <Heading as={"h1"}>
                        Connexion
                    </Heading>
                    <label>Adresse email</label>
                    <TextInput {...form.getInputProps('email')}/>
                    <label>Mot de passe<span className="text-red">*</span></label>
                    <PasswordInput {...form.getInputProps('password')}/>
                    <Button>
                        Se connecter
                    </Button>
                    <Link href={'/inscription'} className="text-center text-green">Créer un compte</Link>
                </Flex>
    );
}