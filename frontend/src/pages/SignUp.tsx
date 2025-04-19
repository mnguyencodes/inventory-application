import { Button, TextInput, PasswordInput } from '@mantine/core'
import { useForm, useWatch, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import styles from './_styles/SignUp.module.css'

interface FormInputs {
  firstName: string
  lastName: string
  email: string
  password: string
}

const digits = /\d/
const lower = /[a-z]/
const upper = /[A-Z]/
const symbols = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/

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
    .min(8)
    .max(32)
    .refine((password) => digits.test(password))
    .refine((password) => lower.test(password))
    .refine((password) => upper.test(password))
    .refine((password => symbols.test(password)))
})

function PasswordWatched({ control }: { control: Control<FormInputs> }) {
  const password = useWatch({
    control,
    name: "password",
    defaultValue: "default",
  })

  return password
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const [password] = watch(["password"])
  console.log(password)

  function check2(text: string, validator: RegExp) {
    return validator.test(text)
  }

  function checkRegex(validator: RegExp) {
    return validator.test(password) ? styles.valid : styles.invalid
  }

  function checkLength(min: number, max: number) {
    if (password.length >= min && password.length <= max) {
      return styles.valid
    }
    return styles.invalid
  }

  const form = async (data: FormInputs) => {
    await fetch('http://localhost:3000/authentication/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
  }

  const [focusPassword, setfocusPassword] = useState(false)

  function handleFocus() {
    setfocusPassword(true)
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
          onFocus={handleFocus}
        />
        {focusPassword && (
          <div>
            <p>Your password must:</p>
            <ul>
              <li className={checkLength(8, 32)}>be between 8 and 32 characters.</li>
              <li className={checkRegex(digits)}>contain a number.</li>
              <li className={checkRegex(symbols)}>contain a symbol.</li>
              <li className={checkRegex(upper)}>contain an uppercase letter.</li>
              <li className={checkRegex(lower)}>contain a lowercase letter.</li>
            </ul>
          </div>
        )}
        <h2><PasswordWatched control={control}/></h2>
        <Button type="submit" variant="filled" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  )
}