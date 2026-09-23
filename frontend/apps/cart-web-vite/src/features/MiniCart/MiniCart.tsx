import { useCart, useCartDispatch } from '@/contexts'
import './MiniCart.css'
import { TotalPrice } from '@/components/TotalPrice'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ProductCard'
import type { CartItemModel } from '@/types'
import NumberField from '@/components/ui/NumberField'
import { memo } from 'react'
import { useCartTotalPrice } from '@/contexts/CartContext'

function MiniCartTotalPrice() {
    const total = useCartTotalPrice()
    return (
        <div className="mini-cart__total-price">
            Total
            <TotalPrice value={total} />
        </div>
    )
}

function MiniCartSummary() {
    return (
        <div className="mini-cart__summary">
            <div className="mini-cart__view-cart">
                <MiniCartTotalPrice />
                <Link to="/carrinho">
                    <Button>Ver Carrinho</Button>
                </Link>
            </div>
        </div>
    )
}

function MiniCartQuantityControl({ item }: { item: CartItemModel }) {
    const dispatch = useCartDispatch()

    const handleChange = (value: number) => {
        if (value === 0) {
            dispatch({ type: "REMOVE_ITEM", id: item.id })
            return
        }

        dispatch({ 
            type: "CHANGE_QUANTITY", 
            id: item.id, 
            quantity: value
        })
    }

    return (
        <div className="mini-cart__quantity-control">
            <NumberField 
                value={item.quantity} 
                min={0} 
                onChange={handleChange} 
            />
        </div>
    )
}

const MiniCartItem = memo(({ item }: { item: CartItemModel}) => (
    <ProductCard size="small">
        <ProductCard.Image url={item.image} alt={item.name} />
        <ProductCard.Name name={item.name} />
        <ProductCard.Price price={item.price} />
        <MiniCartQuantityControl item={item} />
    </ProductCard>
))

function MiniCartItems() {
    const cart = useCart()
    return (
        <div className="mini-cart__items">
            {cart.allIds.map(i => <MiniCartItem key={i} item={cart.byId[i]} />)}
        </div>
    )
}

export function MiniCart() {
    return (
        <div className="mini-cart">
            <MiniCartItems />
            <MiniCartSummary />
        </div>
    )
}