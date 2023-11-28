import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer, Card, ZodI18nProvider } from "tp-kit/components";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUser } from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {

    const supabase = createServerComponentClient({ cookies })
    const user = await getUser(supabase)

    if (user) {
        redirect('/')
    }

    return (
        <ZodI18nProvider>
            <SectionContainer>
                <Card>
                    {children}
                </Card>
            </SectionContainer>
        </ZodI18nProvider>
    )
}