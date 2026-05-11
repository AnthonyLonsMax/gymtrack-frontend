import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuthStore } from "#/hooks/useAuthStore"
import { register } from "#/services/authService"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card"
import { Input } from "#/components/ui/input"
import { Label } from "#/components/ui/label"
import type { AppError } from "#/shared/mapError"

export const Route = createFileRoute("/auth/registration")({
  component: RegistrationPage,
})

const registerSchema = z.object({
  userName: z.string().min(4).max(68),
  picture: z.string().min(2).max(68),
  password: z.string().min(7).max(128),
})

type RegisterData = z.infer<typeof registerSchema>

function RegistrationPage() {
  const authenticate = useAuthStore(s => s.authenticate)
  const navigate = useNavigate()

  const { register: reg, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await register(data)
      const { accessToken, refreshToken, id, userName, picture } = res.data
      authenticate({ id, userName, picture }, accessToken, refreshToken)
      navigate({ to: "/dashboard" })
    } catch (err) {
      const appErr = err as AppError
      setError("root", { message: appErr.message })
    }
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            {errors.root && (
              <p className="text-destructive text-sm">{errors.root.message}</p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="userName">Username</Label>
              <Input id="userName" placeholder="username" {...reg("userName")} />
              {errors.userName && <p className="text-destructive text-sm">{errors.userName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="picture">Picture URL</Label>
              <Input id="picture" placeholder="https://example.com/avatar.png" {...reg("picture")} />
              {errors.picture && <p className="text-destructive text-sm">{errors.picture.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...reg("password")} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
