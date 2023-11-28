"use client"

import { User } from "@supabase/supabase-js";
import { Button, Heading } from "tp-kit/components";
import { Flex } from "@mantine/core"
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type props = {
    user : User
}

export default function CompteData({user} : props) {

    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async() => {
        await supabase.auth.signOut()
        router.refresh()
    }

    //rien

    return (
        <>
            <Flex direction="column" gap="md">
                <Heading as={"h1"}>Mon Compte</Heading>
                Bonjour, {user.user_metadata.name}
                <Flex direction="column">
                    <div><strong>Nom: </strong>{user.user_metadata.name}</div>
                    <div><strong>Email: </strong>{user.email}</div>
                </Flex>
                <Button onClick={handleSignOut} variant="outline">Se déconnecter</Button>
            </Flex>
            
        </>
    )

}