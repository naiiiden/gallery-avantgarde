"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CatalogueSortProductsForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleSort(type) {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', type);
        console.log("params: ", params.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="pb-4 flex flex-wrap gap-x-2 justify-end">
            <p className="font-semibold">Sort by:</p>
            <label>
                <input checked={searchParams.get('sortBy') === "alphabeticalAtoZ"} onChange={(e) => handleSort(e.target.id)} name="sort-by" id="alphabeticalAtoZ" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, A-Z</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={searchParams.get('sortBy') === "alphabeticalZtoA"} onChange={(e) => handleSort(e.target.id)} name="sort-by" id="alphabeticalZtoA" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">alphabetical, Z-A</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={searchParams.get('sortBy') === "priceAscending"} onChange={(e) => handleSort(e.target.id)} name="sort-by" id="priceAscending" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price ascending</span>
                <span aria-hidden="true">,</span>
            </label>
            <label>
                <input checked={searchParams.get('sortBy') === "priceDescending"} onChange={(e) => handleSort(e.target.id)} name="sort-by" id="priceDescending" className="peer opacity-0 absolute" type="radio"/>
                <span className="peer-checked:underline peer-hover:underline decoration-2 peer-focus:outline ">price descending</span>
            </label>
        </form>
    )
}