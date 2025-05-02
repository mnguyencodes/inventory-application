import { Button, TextInput, PasswordInput, LoadingOverlay, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm, useWatch, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { IconPointFilled, IconCheck, IconX } from '@tabler/icons-react'
import styles from './_styles/SignUp.module.css'
import formStyles from './_styles/Form.module.css'

interface FormInputs {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const digits = /\d/
const lower = /[a-z]/
const upper = /[A-Z]/
const symbols = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/

const schema = z
  .object({
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
      .refine((password) => symbols.test(password)),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.confirmPassword !== val.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

function PasswordWatched({ control }: { control: Control<FormInputs> }) {
  const password = useWatch({
    control,
    name: 'password',
    defaultValue: 'default',
  })

  return password
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const [password] = watch(['password'])

  function checkLength(min: number, max: number) {
    return password.length >= min && password.length <= max
  }

  function checkRegex(regex: RegExp) {
    return regex.test(password)
  }

  function renderIcon(condition: boolean, text: string) {
    if (dirtyFields.password && condition) {
      return (
        <div className={styles.instructionContainer}>
          <IconCheck className={clsx(styles.icon, formStyles.valid)} />
          <p className={formStyles.valid}>{text}</p>
        </div>
      )
    } else if (dirtyFields.password && !condition) {
      return (
        <div className={styles.instructionContainer}>
          <IconX className={clsx(styles.icon, formStyles.invalid)} />
          <p className={formStyles.invalid}>{text}</p>
        </div>
      )
    } else {
      return (
        <div className={styles.instructionContainer}>
          <IconPointFilled className={styles.icon} />
          <p>{text}</p>
        </div>
      )
    }
  }

  // https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  // To start off, we are going to use the custom hook, useMutation, from @tanstack/react-query

  // Note: Set up a QueryClientProvider in the App component, much like how you had set up MantineProvider.
  // Details here:
  // https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider

  const [loadingSubmission, loadingSubmissionHandler] = useDisclosure(false)

  const mutation = useMutation({
    mutationFn: async (form: FormInputs) => {
      const response = await fetch('http://localhost:3000/users/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      return response.json()
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.currentTarget))
  }

  const [focusPassword, setfocusPassword] = useState(false)

  function handleFocus() {
    setfocusPassword(true)
  }

  return (
    <>
      <h1 className={formStyles.title}>Sign Up</h1>
      <form className={formStyles.form} onSubmit={onSubmit}>
        <TextInput
          {...register('firstName', { required: true })}
          label="First Name"
          placeholder="James"
        />
        {errors.firstName?.message && (
          <p className={formStyles.invalid}>{errors.firstName.message}</p>
        )}
        <TextInput
          {...register('lastName', { required: true })}
          label="Last Name"
          placeholder="Bond"
        />
        {errors.lastName?.message && (
          <p className={formStyles.invalid}>{errors.lastName.message}</p>
        )}
        <TextInput
          {...register('email', { required: true })}
          label="Email"
          placeholder="jb007@m16.com"
        />
        {errors.email?.message && <p className={formStyles.invalid}>{errors.email.message}</p>}
        <PasswordInput
          {...register('password', { required: true })}
          label="Password"
          placeholder="********"
          onFocus={handleFocus}
        />
        {focusPassword && (
          <div className={styles.passwordInstructions}>
            <p
              className={clsx(
                (dirtyFields.password && errors.password && styles.invalid) ||
                  (dirtyFields.password && !errors.password && styles.valid)
              )}
            >
              Your password must:
            </p>
            <ul>
              <li>{renderIcon(checkLength(8, 32), 'be between 8 and 32 characters.')}</li>
              <li>{renderIcon(checkRegex(digits), 'contain a number.')}</li>
              <li>{renderIcon(checkRegex(symbols), 'contain a symbol.')}</li>
              <li>{renderIcon(checkRegex(upper), 'contain an an uppercase letter.')}</li>
              <li>{renderIcon(checkRegex(lower), 'contain a lowercase letter.')}</li>
            </ul>
          </div>
        )}
        <PasswordInput
          {...register('confirmPassword', { required: true })}
          label="Confirm Password"
          placeholder="********"
        />
        {errors.confirmPassword?.message && (
          <p className={styles.invalid}>{errors.confirmPassword.message}</p>
        )}
        <Button type="submit" variant="filled" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  )
}
