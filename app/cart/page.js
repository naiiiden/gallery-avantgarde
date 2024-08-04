import ProductsInCart from "@/components/ProductsInCart/ProductsInCart";

export const metadata = {
    title: "Cart | Avantgarde",
    description: "Generated by create next app",
};

export default function Page({ params }) {
    return (
        <main className="px-4 pb-4 font-medium">
            <h1 className="sr-only">Cart</h1>
            <ProductsInCart/>
        </main>
    )
}