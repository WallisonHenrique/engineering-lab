import { Link } from "@tanstack/react-router"
import Product from "../../components/product/product"
import ProductImage from "../../components/product/product-image"
import ProductName from "../../components/product/product-name"
import ProductPrice from "../../components/product/product-price"
import "./productListScreen.css"
import { CART } from "../../utils/constants"
import { toCurrency } from "../../utils/helpers"

function ProductListScreen() {
    const list = CART.map(item => (
        <Link
            className="product-item"
            to="/produto/$id" 
            params={{ id: String(item.id) }}
        >
            <Product>
                <ProductImage url={item.photo} alt={item.name} />
                <ProductName name={item.name} />
                <ProductPrice price={toCurrency(item.price)} />
            </Product>
        </Link>
    ))

    return (
        <div className="product-list">{list}</div>
    )
}

export default ProductListScreen