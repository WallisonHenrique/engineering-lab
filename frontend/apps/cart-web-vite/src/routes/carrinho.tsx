import { createFileRoute } from '@tanstack/react-router'
import { CartScreen } from '@/features/Cart'

export const Route = createFileRoute('/carrinho')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CartScreen />
}
