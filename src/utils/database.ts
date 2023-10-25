import prisma from "./prisma";
import { cache } from 'react'


export const getCategory = cache(async (categorySlug : string) => {
    return await prisma.productCategory.findFirst({
        include:{
          products:true,
        },
        where:{
          slug:categorySlug
        }
      })
})

export const getProduct = cache(async (productSlug : string) => {
    return await prisma.product.findFirst({
        include:{
            category: {
                include:{
                    products:true
                }
            }
        },
        where:{
            slug:productSlug
        }
    })
})