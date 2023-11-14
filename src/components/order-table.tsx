"use client"

import { useState, useEffect } from "react"
import { getOrders } from "../actions/get-orders"
import { OrdersResult } from "../types"
import { OrderTableLayout } from "tp-kit/components"
import { useRouter } from "next/navigation"

type Props = {
    orders : OrdersResult[]
}

export default function OrderTable({orders} : Props) {

    const router = useRouter();

    return (
        <>
            <OrderTableLayout onRowClick={(order) => { router.push(`/mon-compte/commandes/${order.id}`) }} orders={orders} />
        </>
        
    )


}