import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    if (loading)
        return <LoadingComponent message="Loading products..." />

    return (
        <> <ProductList products={products} /></>
    )
}
