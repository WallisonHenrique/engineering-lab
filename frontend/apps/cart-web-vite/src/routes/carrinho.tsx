import { CartScreen } from '@/modules/checkout/features/CartScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/carrinho')({
  component: () => <CartScreen />,
})