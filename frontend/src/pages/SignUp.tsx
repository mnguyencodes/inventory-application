import {Button, TextInput, PasswordInput} from "@mantine/core"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import styles from "./_styles/SignUp.module.css"

const schema = z.object({
    firstName: z.string()
        .min(2, "Must be at least 2 characters")
        .refine((name) => /^[a-zA-Z]+$/.test(name), "Must contain letters only"),
    lastName: z.string()
        .min(2, "Must be at least 2 characters")
        .refine((name) => /^[a-zA-Z]+$/.test(name), "Must contain letters only"),
    email: z.string()
        .email("Invalid email")
        .min(2),
    password: z.string()
        .min(8, "Must be at least 8 characters")
        .max(32, "Must be at most 32 characters")
})

export default function SignUp() {
    return (
        <>
            <h1>SignUp Component!</h1>
        </>
    )
}