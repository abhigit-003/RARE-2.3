import { useMutation } from '@tanstack/react-query'
import { mockApi } from '@/api/mockApi'

export function useCheckout() {
  return useMutation({
    mutationFn: (data: any) => mockApi.orders.checkout(data)
  })
}
