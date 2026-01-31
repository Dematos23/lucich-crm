'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app as firebaseApp } from '@/firebase/firebase';
import { login } from '@/lib/auth/actions';


const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(firebaseApp);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const idToken = await userCredential.user.getIdToken();

      const result = await login(idToken);

      if (result.success) {
        toast({
          title: 'Inicio de sesión exitoso',
          description: 'Bienvenido de vuelta.',
        });
        router.push('/funnel');
      } else {
        throw new Error(result.error || 'El login ha fallado');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description:
          'El email o la contraseña son incorrectos.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-warm-gray p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
           <Image src="/logo-login.png" alt="Lucich CRM logo" width="64" height="64" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            Lucich CRM
          </h1>
          <p className="mt-2 text-muted-foreground">
            Inicia sesión para gestionar tus clientes y oportunidades.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Contraseña</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ingresar
            </Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
}
