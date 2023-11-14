"use server"

import { OrdersResult } from "../types";
import prisma from "../utils/prisma";


export async function getOrders() {
    let result = await prisma.order.findMany();
    return result;
}