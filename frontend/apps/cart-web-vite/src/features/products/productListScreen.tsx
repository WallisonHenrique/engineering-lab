import { Link } from "@tanstack/react-router"
import "./productListScreen.css"
import { CART } from "../../utils/constants"
import { toCurrency } from "../../utils/helpers"
import { ProductCard } from "@/components/ProductCard"

function ProductListScreen() {
    const list = CART.map(item => (
        <Link
            className="product-item"
            to="/produto/$id" 
            params={{ id: String(item.id) }}
        >
            <ProductCard>
                <ProductCard.Image url={item.photo} alt={item.name} />
                <ProductCard.Name name={item.name} />
                <ProductCard.Price price={toCurrency(item.price)} />
            </ProductCard>
        </Link>
    ))

    return (
        <div className="product-list">{list}</div>
    )
}

export default ProductListScreen