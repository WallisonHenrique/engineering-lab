import { toCurrency } from "@/utils/helpers"
import "./ProductCard.css"

interface ProductCardProps {
    children: React.ReactNode
    size?: string
}

function ProductCardImage({url, alt}: { url: string, alt: string }) {
    return (
        <div className="product-card__image">
            <img src={url} alt={alt} />
        </div>
    )
}

function ProductCardName({name}: { name: string }) {
    return <div className="product-card__name">{name}</div>
}

function ProductCardPrice({price}: { price: number }) {
    return <div className="product-card__price">{toCurrency(price)}</div>
}

export function ProductCard({size = "large", children}: ProductCardProps) {
    const cardClassName = `product-card product-card--${size}`
    return <div className={cardClassName}>{children}</div>
}

ProductCard.Image = ProductCardImage
ProductCard.Name = ProductCardName
ProductCard.Price = ProductCardPrice