import { ProductDetailScreen } from '@/features/ProductDetail/ProductDetailScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/produto/$id')({
  loader: async ({ params }) => ({ id: params.id }),
  component: function RouteComponent() {
    const { id } = Route.useParams()
    return <ProductDetailScreen id={id} />
  },
})
