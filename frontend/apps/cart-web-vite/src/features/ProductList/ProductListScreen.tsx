import { Link } from "@tanstack/react-router"
import { ProductCard } from "@/components/ProductCard"
import "./ProductListScreen.css"
import { useProducts } from "@/hooks"

export function ProductListScreen() {
    const { products } = useProducts()

    if (!products) return <div>Produto não encontrado!</div>

    return (
        <div className="product-list">
            { products.map(i => (
                <Link
                    key={i.id}
                    className="product-item"
                    to="/produto/$id" 
                    params={{ id: String(i.id) }}
                >
                    <ProductCard>
                        <ProductCard.Image url={i.image} alt={i.name} />
                        <ProductCard.Name name={i.name} />
                        <ProductCard.Price price={i.price} />
                    </ProductCard>
                </Link>
            ))}
        </div>
    )
}