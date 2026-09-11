import Product from "../../components/product/product"
import ProductImage from "../../components/product/product-image"
import ProductName from "../../components/product/product-name"
import ProductPrice from "../../components/product/product-price"
import NumberField from "../../components/NumberField"
import "./productDetailScreen.css"
import useProductDetailScreen from "./useProductDetailScreen"

interface Props {
    id: string
}

function ProductDetailScreen({ id }: Props) {
    const {
        product,
        priceTotal,
        handleAdd,
        handleQuantity
    } = useProductDetailScreen(id);

    if (!product) return <div>Produto não encontrado!</div>

    return (
        <div className="product-details">
            <Product>
                <ProductImage url={product.photo} alt={product.name} />
                <ProductName name={product.name} />
                <ProductPrice price={product.price} />
            </Product>
            <div className="product-add">
                <NumberField 
                    value={product.quantity} 
                    min={1} 
                    onChange={handleQuantity} 
                />
                <button 
                    className="product-add-btn" 
                    onClick={handleAdd}
                >
                    ADICIONAR <span className="product-priceTotal">{priceTotal}</span>
                </button>
            </div>
        </div>
    )
}

export default ProductDetailScreen