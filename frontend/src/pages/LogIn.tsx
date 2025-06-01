// When the user signs in, they will receive a JWT token that they can use to access protected routes.
// TODO: Notify Navbar component to update the UI based on authentication status.

// Zustand may be a good choice for managing the authentication state globally.
// Continue reading from here:
// https://www.reddit.com/r/reactjs/comments/1ahe1he/now_learning_zustand_is_there_ever_a_situation/

// It seems that combining Zustand with React Context to share the store instance is a great solution.
// Article link:
// https://tkdodo.eu/blog/zustand-and-react-context

import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../context/AuthContext'
import formStyles from './_styles/Form.module.css'
import styles from './_styles/LogIn.module.css'

interface LogInResponse {
  message: string
  token: string
}

interface MutationError extends Error {
  response?: {
    data: {
      message: string
    }
  }
}

interface FormInputs {
  email: string
  password: string
}

export default function LogIn() {
  const { register } = useForm<FormInputs>()

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (formData: FormData): Promise<LogInResponse> => {
      const plainObject = Object.fromEntries(formData.entries())
      const response = await axios.post<LogInResponse>(
        'http://localhost:3000/users/log-in',
        plainObject
      )
      return response.data
    },
    onSuccess: (data) => {
      alert(`Success! ${data.message}`)

      localStorage.setItem('token', data.token)

      navigate('/dashboard')
    },
    onError: (error: MutationError) => {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert('An unexpected error occurred')
      }
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.currentTarget))
  }

  return (
    <>
      <h1 className={formStyles.title}>Log In</h1>
      <form className={formStyles.form} onSubmit={onSubmit}>
        <TextInput
          {...register('email', { required: true })}
          label="Email"
          placeholder="jb007@m16.com"
        />
        <PasswordInput
          {...register('password', { required: true })}
          label="Password"
          placeholder="********"
        />
        {mutation.isError && (
          <p className={formStyles.invalid}>
            {mutation.error.response?.data.message || 'An error occurred'}
          </p>
        )}
        <Button type="submit" variant="filled">
          {mutation.isPending ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </>
  )
}
