import Link from "next/link";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from 'next-auth/react';
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginScreen() {

  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }

  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHanlder = async ({email, password}) =>{
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHanlder)}>
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">Don&apos;t have account? &nbsp;</div>
        <div className="mb-4">
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
