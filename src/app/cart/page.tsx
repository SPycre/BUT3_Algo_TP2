"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
let total = 0;

export default function DevCartPage() {
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={<Button variant={"ghost"} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
        {products.map((product) => (
          <>
          {total += product.price}
            <ProductCartLine
              product={product}
              qty={1}
              onDelete={() => {}}
              onQtyChange={() => {}}
            />
          </>
        ))}
				<div className="font-bold flex justify-between"><span>Total : </span><span>{total} €</span></div>
        <Button fullWidth>Commander</Button>
				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}