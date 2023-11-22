"use client"
import { z } from 'zod';
import { Metadata } from "next/types";
import { useForm, zodResolver } from '@mantine/form'
import { TextInput, PasswordInput, Flex } from '@mantine/core'
import { Button, Card, Heading, SectionContainer } from "tp-kit/components";
import Link from "next/link";

export const metadata:Metadata = {
    title: `Inscription - Starbucks`,
    description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
  }

  const schema = z.object({
    name: z.string().nonempty("Name can't be empty"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6,"Password must be at least 6 characters")
  })

export default function Inscription() {

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email:'',
            name:'',
            password:''
        },
      });

    return (
            <Flex direction='column' gap="md">
                    <Heading as={"h1"}>
                        Inscription
                    </Heading>
                    <label>Nom</label>
                    <TextInput {...form.getInputProps('name')}/>
                    <label>Adresse email</label>
                    <TextInput {...form.getInputProps('email')}/>
                    <label>Mot de passe<span className="text-red">*</span></label>
                    <PasswordInput {...form.getInputProps('password')}/>
                    <Button>
                        S'inscrire
                    </Button>
                    <Link href={'/login'} className="text-center text-green">Déjà un compte ? Se connecter</Link>
            </Flex>
    );
}