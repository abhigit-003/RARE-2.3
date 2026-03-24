import { useMutation } from '@tanstack/react-query'
import { mockApi } from '@/api/mockApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: mockApi.auth.login,
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.name}`)
      localStorage.setItem('ra_user', JSON.stringify(user))
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed')
    }
  })
}

export function useSignup() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: mockApi.auth.signup,
    onSuccess: (user) => {
      toast.success('Membership created successfully')
      localStorage.setItem('ra_user', JSON.stringify(user))
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed')
    }
  })
}
