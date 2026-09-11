import "./product.css"

interface Props {
    children: React.ReactNode
    size?: string
}

function Product({size = "large", children}: Props) {
    return <div className={`product ${size}`}>{children}</div>
}

export default Product