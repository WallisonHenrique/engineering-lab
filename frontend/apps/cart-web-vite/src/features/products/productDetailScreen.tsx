import { ProductCard } from "@/components/ProductCard";
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
            <ProductCard>
                <ProductCard.Image url={product.photo} alt={product.name} />
                <ProductCard.Name name={product.name} />
                <ProductCard.Price price={product.price} />
            </ProductCard>
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