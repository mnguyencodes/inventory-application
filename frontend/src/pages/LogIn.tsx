import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import formStyles from './_styles/Form.module.css'
import styles from './_styles/LogIn.module.css'

interface FormInputs {
  email: string
  password: string
}

export default function LogIn() {
  const { register, handleSubmit, reset } = useForm<FormInputs>()

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
