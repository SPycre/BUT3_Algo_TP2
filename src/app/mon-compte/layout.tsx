import prisma from "../../utils/prisma"
import OrderTable from "../../components/order-table";
import { SectionContainer } from "tp-kit/components";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {

    const orders = await prisma.order.findMany();

    return (
        <>
        <SectionContainer>
            <OrderTable orders={orders}/>
        </SectionContainer>
        {children}
        </>
    )
}