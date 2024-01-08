import { notFound, useRouter } from "next/navigation";
import { OrderDetailsLayout } from "tp-kit/components";
import prisma from "../../../../utils/prisma";
import { NextPageProps } from "../../../../types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUser } from "../../../../utils/supabase";

type Props = {
    orderId: number;
  };

export default async function CommandePage({params}: NextPageProps<Props>) {
    const supabase = createServerComponentClient({cookies})
    const user = await getUser(supabase)
    const orderId = params.orderId
    const order = await prisma.order.findUnique({
        include: {
            lines : {
                include : {
                    product : true
                }
            }
        },
        where: {
            id: +orderId,
            userId: user?.id
        }
    })
    if (!order) notFound();

    return (
        <OrderDetailsLayout order={order}/>
    )
}