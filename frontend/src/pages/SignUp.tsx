import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import styles from './_styles/SignUp.module.css'

interface FormInputs {
  firstName: string
  lastName: string
  email: string
  password: string
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'Must be at least 2 characters')
    .refine((name) => /^[a-zA-Z]+$/.test(name), 'Must contain letters only'),
  lastName: z
    .string()
    .min(2, 'Must be at least 2 characters')
    .refine((name) => /^[a-zA-Z]+$/.test(name), 'Must contain letters only'),
  email: z.string().email('Invalid email').min(2),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .max(32, 'Must be at most 32 characters'),
})

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
mode: 'onChange',
    resolver: zodResolver(schema),
  })
  const [password] = watch(["password"])
  console.log(password)


  const form = async (data: FormInputs) => {
    await fetch('http://localhost:3000/authentication/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
  }

  return (
    <>
      <h1>SignUp Component!</h1>
      <form className={styles.form} onSubmit={handleSubmit(form)}>
        <TextInput
          {...register('firstName', { required: true })}
          label="First Name"
          placeholder="James"
        />
        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}

        <TextInput
          {...register('lastName', { required: true })}
          label="Last Name"
          placeholder="Bond"
        />
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}

        <TextInput
          {...register('email', { required: true })}
          label="Email"
          placeholder="jb007@m16.com"
        />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <PasswordInput
          {...register('password', { required: true })}
          label="Password"
          placeholder="********"
        />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <Button type="submit" variant="filled">
          Submit
        </Button>
      </form>
    </>
  )
}
