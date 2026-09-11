import "./ProductCard.css"

interface ProductCardProps {
    children: React.ReactNode
    size?: string
}

interface ProductCardImageProps {
    url: string
    alt: string
}

interface ProductCardNameProps {
    name: string
}

interface ProductCardPriceProps {
    price: string
}

function ProductCardImage({url, alt}: ProductCardImageProps) {
    return (
        <div className="product-card__image">
            <img src={url} alt={alt} />
        </div>
    )
}

function ProductCardName({name}: ProductCardNameProps) {
    return <div className="product-card__name">{name}</div>
}

function ProductCardPrice({price}: ProductCardPriceProps) {
    return <div className="product-card__price">{price}</div>
}

export function ProductCard({size = "large", children}: ProductCardProps) {
    return <div className={`product-card ${size}`}>{children}</div>
}

ProductCard.Image = ProductCardImage;
ProductCard.Name = ProductCardName;
ProductCard.Price = ProductCardPrice;