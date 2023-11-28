"use client"
import { z } from 'zod';
import { Metadata } from "next/types";
import { useForm, zodResolver } from '@mantine/form'
import { TextInput, PasswordInput, Flex } from '@mantine/core'
import { Button, Card, Heading, NoticeMessage, NoticeMessageData, SectionContainer } from "tp-kit/components";
import Link from "next/link";
import { useState } from 'react';

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

    const [notices, setNotices] = useState<NoticeMessageData[]>([])
    const form = useForm({
        validate: (values) => {
          return zodResolver(schema)(values)
        },
        initialValues: {
            email:'',
            name:'',
            password:''
        },
        
      });

      function addError(message : string) {
        setNotices(n => [...n, {type:"error", message: message}])
      }

      function addSuccess(message : string) {
        setNotices(n => [...n, {type:"success", message: message}])
      }

      function removeNotice(index : number) {
        setNotices(n => {
          delete(n[index]);
          return Object.values(n);
      });
      }

      function onSubmit(values) {
        values.preventDefault()
        setNotices([])
        const result = form.validate(values)

        if (result.hasErrors) {
          if (result.errors.name) {
            addError(result.errors.name)
          }
          if (result.errors.email) {
            addError(result.errors.email)
          }
          if (result.errors.password) {
            addError(result.errors.password)
          }
        } else {
          addSuccess('Votre inscription a bien été prise en compte. Validez votre adresse mail pour vous connecter.')
        }
      }

    return (
            <Flex direction='column' gap="md">
                    <Heading as={"h1"}>
                        Inscription
                    </Heading>
                    <ul>
                      {notices.map((notice, i) => <NoticeMessage
                      key={i}
                      {...notice}
                      onDismiss={() => removeNotice(i)}/>)}
                    </ul>
                    <form onSubmit={values => onSubmit(values)}>
                      <TextInput id='name' label="Nom" {...form.getInputProps('name')}/>
                      <TextInput id='email' label="Adresse mail" {...form.getInputProps('email')}/>
                      <PasswordInput id='password' label="Mot de passe" {...form.getInputProps('password')}/>
                      <Button type='submit'>
                          S'inscrire
                      </Button>
                    </form>
                    
                    <Link href={'/login'} className="text-center text-green">Déjà un compte ? Se connecter</Link>
            </Flex>
    );
}