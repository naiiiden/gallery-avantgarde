"use client";
import Link from "next/link";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function AddToCartButton({ productToAdd }) {
    const { cart, addToCart } = useContext(CartContext);
    const [buttonText, setButtonText] = useState("Add to cart");

    useEffect(() => {
        const isProductInCart = cart.some(item => item.id === productToAdd.id);

        if (isProductInCart) {
            setButtonText("Go to cart");
        } else {
            setButtonText("Add to cart");
        }
    }, [cart, productToAdd]);

    return buttonText === "Add to cart" ? 
        <button onClick={() => addToCart(productToAdd)} className="mt-4 font-semibold outline outline-1 w-full p-4 lg:p-2.5 uppercase flex items-center justify-center gap-2">
                {buttonText} <span className="text-sm opacity-65">[ €{productToAdd.attributes.price} ]</span>
        </button>
        :    
        <Link className="block text-center mt-4 font-semibold outline outline-1 w-full p-4 lg:p-2.5 uppercase" href="/cart">{buttonText}</Link>
}