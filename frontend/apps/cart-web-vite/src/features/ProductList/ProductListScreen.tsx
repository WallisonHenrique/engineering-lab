import { Link } from "@tanstack/react-router"
import { ProductCard } from "@/components/ProductCard"
import "./ProductListScreen.css"
import { useProducts } from "@/hooks"

export function ProductListScreen() {
    const { products } = useProducts()

    if (!products) return <div>Produto não encontrado!</div>

    return (
        <div className="product-list">
            { products.map(item => (
                <Link
                    className="product-item"
                    to="/produto/$id" 
                    params={{ id: String(item.id) }}
                >
                    <ProductCard>
                        <ProductCard.Image url={item.image} alt={item.name} />
                        <ProductCard.Name name={item.name} />
                        <ProductCard.Price price={item.price} />
                    </ProductCard>
                </Link>
            ))}
        </div>
    )
}