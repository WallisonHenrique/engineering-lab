interface Props {
    name: string
}

function ProductName({name}: Props) {
    return <div className="product-name">{name}</div>
}

export default ProductName