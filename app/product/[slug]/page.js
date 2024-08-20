import Image from "next/image";
import { getData } from "@/app/utilities/getData";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";

export async function generateMetadata({ params }) {
    let currentProduct;

    try {
        currentProduct = await getData(`http://localhost:1337/api/products?filters[urlHandle][$eq]=${params.slug}&populate=image`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    if (!currentProduct || currentProduct.data.length === 0) {
        return {
            title: 'Product Not Found | Avantgarde',
        };
    }

    return {
        title: `${currentProduct.data[0].attributes.name} by ${currentProduct.data[0].attributes.creator} | Avantgarde`,
    };
}

export default async function Page({ params }) {
    let currentProduct;

    try {
        currentProduct = await getData(`http://localhost:1337/api/products?filters[urlHandle][$eq]=${params.slug}&populate=image`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    if (!currentProduct || currentProduct.data.length === 0) {
        notFound();
    }

    return (
        <main className="px-4 pb-4 flex flex-col gap-4 lg:flex-row lg:pl-0 lg:pb-0 mt-auto">
            {currentProduct.data[0].attributes?.image?.data?.attributes?.url ? (
                <Image blurDataURL={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} placeholder="blur" unoptimized className="w-auto lg:max-w-[50%] 2xl:max-w-6xl" priority src={`http://localhost:1337${currentProduct.data[0].attributes.image.data.attributes.url}`} width={2000} height={2000} alt=""/>
            ) : (
                <div className="text-center text-xs w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-2xl mx-auto ">
                    <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#0c0c0c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
                    Image not available
                </div>
            )}
            <div className={`max-w-96 grid ml-auto lg:pl-1 text-sm flex-grow mt-auto lg:sticky lg:bottom-4 ${!currentProduct.data[0].attributes?.image?.data?.attributes?.url ? 'lg:pb-4' : ''}`}>
                <h1 className="text-base"><span className="font-semibold">{currentProduct.data[0].attributes.name}</span> by {currentProduct.data[0].attributes.creator}</h1>
                <p className="my-4">“MT”, the acronym defining this collection designed by Ron Arad, in english is pronounced “empty” that means “vacuum” and emptiness is really the key element of this project. The volume is hollowed and presents provoctively its interior, finished in two colours. This is possible thanks to a double step in the rotational molding. First of all the polyethylene of the outer shell color is placed in the mold. once formed this layer, the second color is inserted and adhere to the first without merging the two polymers, even though this process takes place in blast furnaces. Once extracted from the mold, a five-axis laser will cut off the lateral ends of the product, revealing the two-tone side of the MT. From the typological point of view is also reported the presence of a rocking chair, a rarity in the contemporary world.</p>
                <p><span className="font-semibold">Year:</span> {currentProduct.data[0].attributes.date}</p> 
                <p><span className="font-semibold">Material(s):</span> {currentProduct.data[0].attributes.medium}</p>
                <p><span className="font-semibold">Dimensions: </span>{currentProduct.data[0].attributes.dimensions}</p>
                <AddToCartButton productToAdd={currentProduct.data[0]}/>
            </div>
        </main>
    )
}