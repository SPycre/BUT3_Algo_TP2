import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer';
import { PRODUCTS_CATEGORY_DATA } from 'tp-kit/data'
import { ProductList } from '../src/components/product-list';
const categories = PRODUCTS_CATEGORY_DATA;

const prisma = new PrismaClient()

async function main() {
    categories.forEach(async category => {
        await prisma.productCategory.create({
            data : {
                id: category.id,
                slug: category.slug,
                name: category.name
            },
        })
        category.products.forEach(async product => {
            await prisma.product.create({
                data : {
                    id: product.id,
                    slug: product.slug,
                    path: product.path,
                    name: product.name,
                    desc: product.desc,
                    img: product.img,
                    price: product.price,
                    categoryId: category.id
                }
            })
        });
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })