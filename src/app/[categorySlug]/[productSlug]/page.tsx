import {
  BreadCrumbs,
  FormattedPrice,
  ProductCardLayout,
  ProductGridLayout,
  ProductRating,
  ProductImage,
  SectionContainer
} from "tp-kit/components";
import { NextPageProps } from "../../../types";
import { Metadata } from "next";
import {
  ProductAttribute,
  ProductAttributesTable
} from "../../../components/product-attributes-table";
import AddToCartButton from "../../../components/add-cart-button";
import { getProduct } from "../../../utils/database";
import { notFound } from 'next/navigation'
import prisma from "../../../utils/prisma";

type Props = {
  categorySlug: string;
  productSlug: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: NextPageProps<Props>): Promise<Metadata> {
  const product = await getProduct(params.productSlug)

  if (product == null) {notFound();}

  return {
    title: product.name,
    description:
      product.desc ??
      `Succombez pour notre ${product.name} et commandez-le sur notre site !`,
  };
}

const productAttributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

export const dynamicParams = false

export async function generateStaticParams({
  params: { categorySlug, productSlug },
}: {
  params: { categorySlug: string, productSlug: string }
}) {
  const res = await prisma.product.findMany({
    select:{
      slug : true,
      category : {
        select :{
          slug : true
        }
      }
    },
  })

  return res.map((product) => ({
    categorySlug: product.category.slug,
    productSlug: product.slug
  }))
}

export default async function ProductPage({ params }: NextPageProps<Props>) {
  const product = await getProduct(params.productSlug)

  if (product == null) {notFound();}

  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <BreadCrumbs
        className="my-8"
        items={[
          {
            label: "Accueil",
            url: "/",
          },
          {
            label: product.category.name,
            url: `/${product.category.slug}`,
          },
          {
            label: product.name,
            url: `/${product.path}`,
          },
        ]}
      />

      {/* Produit */}
      <section className="flex flex-col md:flex-row justify-center gap-8">
        {/* Product Image */}
        <div className="relative">
          <ProductImage
            {...product}
            priority
            className="rounded-lg sticky top-12 object-cover sm:aspect-video md:aspect-auto w-full md:w-[300px]"
          />
        </div>

        {/* Product body */}
        <div className="flex-1">
          <div className="prose prose-lg">
            {/* Product Name */}
            <h1>{product.name}</h1>

            {/* Product Rating */}
            <ProductRating value={4} size={18} />

            {/* Desc */}
            <p>{product.desc}</p>

            {/* Prix et ajout au panier */}
            <div className="flex justify-between items-center gap-8">
              <p className="!my-0 text-xl">
                <FormattedPrice price={product.price} />
              </p>
              <AddToCartButton variant="primary" product={product}/>
            </div>
          </div>

          {/* Products attribute */}
          <ProductAttributesTable className="mt-6" data={productAttributes} />
        </div>
      </section>

      {/* Related products */}
      <section>
        <div className="mt-24">
          <div className="prose prose-lg mb-8">
            <h2>Vous aimerez aussi</h2>
          </div>

          <ProductGridLayout products={product.category.products}>
            {(product) => (
              <ProductCardLayout
                product={product}
                button={
                  <AddToCartButton variant="ghost" product={product}/>
                }
              />
            )}
          </ProductGridLayout>
        </div>
      </section>
      {/* /Related products */}
    </SectionContainer>
  );
}
