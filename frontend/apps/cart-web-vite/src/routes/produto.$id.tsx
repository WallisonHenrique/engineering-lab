import { createFileRoute } from '@tanstack/react-router'
import { ProductDetailScreen } from '@/features/ProductDetail'

export const Route = createFileRoute('/produto/$id')({
  loader: async ({ params }) => ({ id: params.id }),
  component: function RouteComponent() {
    const { id } = Route.useParams()
    return <ProductDetailScreen id={id} />
  },
})
