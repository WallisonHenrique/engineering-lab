import "./product-image.css"

interface Props {
    url: string
    alt: string
}

function ProductImage({url, alt}: Props) {
    return (
        <div className="product-image">
            <img src={url} alt={alt} />
        </div>
    )
}

export default ProductImage