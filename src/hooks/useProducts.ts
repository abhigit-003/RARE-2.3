import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/api/mockApi'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => mockApi.products.list(),
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => mockApi.products.get(id),
    enabled: !!id,
  })
}
