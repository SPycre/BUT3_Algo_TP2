import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer, Card } from "tp-kit/components";
import { ReactNode } from "react";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {
    return (
        <SectionContainer>
            <Card>
            {children}
            </Card>
        </SectionContainer>
    )
}