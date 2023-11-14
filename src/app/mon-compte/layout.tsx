import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer } from "tp-kit/components";
import { ReactNode } from "react";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {

    const orders = await prisma.order.findMany();

    return (
        <>
        <SectionContainer>
            <div className="rounded-2xl bg-white p-6 shadow-xl">
                <OrderTable orders={orders}/>
            </div>
        </SectionContainer>
        {children}
        </>
    )
}