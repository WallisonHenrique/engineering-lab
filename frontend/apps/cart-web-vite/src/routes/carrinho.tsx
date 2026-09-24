import { CartScreen } from '@/features/Cart/CartScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/carrinho')({
  component: () => <CartScreen />,
})