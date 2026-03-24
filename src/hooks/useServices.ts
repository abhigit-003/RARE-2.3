import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/api/mockApi'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => mockApi.services.list(),
  })
}
