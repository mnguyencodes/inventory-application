import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import formStyles from './_styles/Form.module.css'
import styles from './_styles/LogIn.module.css'

interface LogInResponse {
  message: string
}

interface FormInputs {
  email: string
  password: string
}

export default function LogIn() {
  const { register, handleSubmit, reset } = useForm<FormInputs>()

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
    },
    onError: (error) => {
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

  const form = async (data: FormInputs) => {
    await fetch('http://localhost:3000/authentication/log-in', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
  }

  return (
    <>
      <h1 className={formStyles.title}>Log In</h1>
      <form className={formStyles.form} onSubmit={handleSubmit(form)}>
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
        <Button type="submit" variant="filled">
          Log in
        </Button>
      </form>
    </>
  )
}
