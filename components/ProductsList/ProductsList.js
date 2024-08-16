import Link from "next/link";
import Image from "next/image";
import CatalogueProductsViewForm from "@/components/CatalogueProductsViewForm/CatalogueProductsViewForm";
import CatalogueSortProductsForm from "@/components/CatalogueSortProductsForm/CatalogueSortProductsForm";

export default function ProductsList({ searchParams, data }) {

    if (!searchParams.view) {
        searchParams.view = 'index';
    }

    if (!searchParams.sortBy) {
        searchParams.sortBy = 'alphabeticalAtoZ';
    }

    switch (searchParams.sortBy) {
        case "alphabeticalAtoZ":
            data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
            break;
        case "alphabeticalZtoA":
            data.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
            break;
        case "priceAscending":
            data.sort((a, b) => a.attributes.price - b.attributes.price);
            break;
        case "priceDescending":
            data.sort((a, b) => b.attributes.price - a.attributes.price);
            break;
        default:
            break;
    }

    return (
        <>
            <div className="flex flex-wrap justify-between gap-4 text-sm">
                <p className="w-fit">{data.length} {data.length > 1 ? 'products' : 'product'}</p>
                <CatalogueSortProductsForm currentView={searchParams.sortBy}/>
                <CatalogueProductsViewForm currentView={searchParams.view}/>
            </div>
            {searchParams.view === "grid" &&
                <ul className="products-list-reveal grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data.map((item, index) =>
                        <li key={index} className="relative group">
                            <Link href={`product/${item.attributes.urlHandle}`}>
                                <Image className="group-hover:opacity-[.0225] group-focus-within:opacity-[.0225] transition-opacity duration-500" unoptimized src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} priority width={1000} height={1000} alt=""/>
                                <div className="p-1.5 grid gap-2 text-sm absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
                                    <h2><span className="font-semibold">{item.attributes.name}</span> by {item.attributes.creator}</h2>
                                    <p aria-hidden="true"><span className="font-semibold">Year:</span> {item.attributes.date}</p> 
                                    <p aria-hidden="true"><span className="font-semibold">Material(s):</span> {item.attributes.medium}</p>
                                    <p aria-hidden="true"><span className="font-semibold">Dimensions: </span>{item.attributes.dimensions}</p>
                                </div>
                                <div aria-hidden="true" className="top-0 p-1.5 text-xs font-bold text-end">{(index + 1).toString().padStart(2, '0')}</div>
                            </Link>
                        </li>
                    )}
                </ul>
            }
            {searchParams.view === "index" &&
                <>
                    <div className="flex font-semibold">
                        <div className="min-w-24 sm:min-w-32 lg:min-w-40"></div>
                        <div className="px-1.5 flex flex-grow gap-2 md:gap-4 xl:gap-6 2xl:gap-8">
                            <p className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">Piece:</p>
                            <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">Designer:</p>
                            <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">Material(s):</p>
                            <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">Dimensions:</p>
                            <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">Price:</p>
                        </div>
                    </div>
                    <ul className="products-list-reveal grid">
                        {data.map((item, index) =>
                            <li key={index} className="border-b last:border-b-0 border-black transition-all duration-500 group">
                                <Link className="flex py-2 text-sm" href={`product/${item.attributes.urlHandle}`}>
                                    <Image unoptimized className="max-w-24 sm:max-w-32 lg:max-w-40 group-hover:max-w-28 group-hover:sm:max-w-44 group-hover:lg:max-w-56 group-focus-within:max-w-28 group-focus-within:sm:max-w-44 group-focus-within:lg:max-w-56 transition-all duration-500" src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} priority width={200} height={200} alt="" />
                                    <div className="p-1.5 flex gap-2 md:gap-4 xl:gap-6 2xl:gap-8 flex-grow">
                                        <h2 className="w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.name}</h2>
                                        <p className="hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.creator}</p>
                                        <p className="hidden md:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.medium}</p>
                                        <p className="hidden lg:block sm:w-1/3 md:w-1/4 lg:w-1/5">{item.attributes.dimensions}</p>
                                        <p className="w-2/5 text-end sm:w-1/3 md:w-1/4 lg:w-1/5">€{item.attributes.price}</p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </>
            }
        </>
    )
}