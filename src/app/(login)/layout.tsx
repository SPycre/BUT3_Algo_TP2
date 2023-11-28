import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer, Card, ZodI18nProvider } from "tp-kit/components";
import { ReactNode } from "react";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {
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