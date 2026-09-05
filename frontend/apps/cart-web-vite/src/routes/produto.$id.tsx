import { createFileRoute } from '@tanstack/react-router'
import ProductDetailScreen from '../features/products/productDetailScreen'

export const Route = createFileRoute('/produto/$id')({
  loader: async ({ params }) => {
    return { id: params.id }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()

  return <ProductDetailScreen id={id} />
}
