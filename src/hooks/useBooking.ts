import { useMutation } from '@tanstack/react-query'
import { mockApi } from '@/api/mockApi'

export function useBooking() {
  return useMutation({
    mutationFn: (data: any) => mockApi.bookings.create(data)
  })
}
