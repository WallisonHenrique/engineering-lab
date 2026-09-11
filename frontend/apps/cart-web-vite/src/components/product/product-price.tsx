interface Props {
    price: string
}

function ProductPrice({price}: Props) {
    return <div className="product-price">{price}</div>
}

export default ProductPrice