"use client"

import { type } from "os";
import { Button } from "tp-kit/components";
import { ProductData } from "tp-kit/types";
import { addLine } from "../hooks/use-cart";
import { Loader } from '@mantine/core';
import { useState } from "react";

type Props = {
    product : ProductData,
    variant : "primary" | "ghost" | "white" | "outline" | "light" | "danger" | null | undefined
}

export default function AddToCartButton({product, variant} : Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (!isLoading) {
            setIsLoading(true);
            addLine(product)
                .then(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Une erreur s\'est produite :', error);
                });
        }
    };

    return (
        <Button variant={variant} className="flex-1 !py-4" onClick={handleClick}>
            {isLoading ? <Loader size={20}/> : 'Ajouter au panier'}
        </Button>
    )
}