"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProductLineData } from "../types";
import prisma from "../utils/prisma";
import { getUser } from "../utils/supabase";
import { cookies } from "next/headers";

export async function createOrder(lines : ProductLineData[]) {

    let total = 0;
    lines.forEach((line) => total += line.qty * line.product.price)

    const supabase = createServerComponentClient({ cookies })
    const user = await getUser(supabase)

    if (user) {
        if (lines.length > 0) {
            await prisma.order.create({
                data : {
                    userId: user.id,
                    createdAt: new Date(),
                    lines: {
                        create: lines.map((line) => {
                            return {
                                productId: line.product.id,
                                subtotal: line.product.price*line.qty
                            }
                        })
                    },
                    total: total
                }
            });
        
        }
        return {success:true}
    } else {
        return {error:"Utilisateur non connecté",success:false}
    }
    
}