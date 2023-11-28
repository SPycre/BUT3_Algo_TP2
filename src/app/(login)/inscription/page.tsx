"use client"
import { z } from 'zod';
import { Metadata } from "next/types";
import { useForm, zodResolver } from '@mantine/form'
import { TextInput, PasswordInput, Flex } from '@mantine/core'
import { Button, Heading, NoticeMessage, NoticeMessageData, SectionContainer, useZodI18n } from "tp-kit/components";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const metadata:Metadata = {
    title: `Inscription - Starbucks`,
    description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
  }

  const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6)
  })

export default function Inscription() {

  const supabase = createClientComponentClient()
  const router = useRouter()
  const [notices, setNotices] = useState<NoticeMessageData[]>([])
  
    useZodI18n(z);
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

      const handleSignUp = async(values) => {
        setNotices([])
        const result = form.validate()

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
        }

        const signup = await supabase.auth.signUp({
          email: form.values.email,
          password:form.values.password,
          options: {
            data: {
              name: form.values.name
            },
            emailRedirectTo: `${location.origin}/api/auth/callback`
          }
        })

        if (signup.error) {
          addError(signup.error.message)
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
                    <form onSubmit={form.onSubmit(values => handleSignUp(values))}>
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