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