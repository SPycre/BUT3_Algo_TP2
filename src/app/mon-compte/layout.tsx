import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer } from "tp-kit/components";
import { Flex } from '@mantine/core'
import { ReactNode } from "react";
import { getUser } from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CompteData from "../../components/compte-data";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {

    const supabase = createServerComponentClient({ cookies })
    const user = await getUser(supabase)
    const orders = await prisma.order.findMany({
        where: {
            userId:user?.id
        }
    });
    

    if (!user) {
        redirect('/connexion')
    }

    return (
        <>
        <SectionContainer>
            <div className="flex gap-10 justify-center">
                <div className="rounded-2xl bg-white p-6 shadow-xl">
                    <CompteData user={user}/>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-xl">
                    <OrderTable orders={orders}/>
                </div>
            </div>
        </SectionContainer>
        {children}
        </>
    )
}