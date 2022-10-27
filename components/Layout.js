import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Store } from "../utils/Store";
import {useSession} from "next-auth/react"

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const {state }= useContext(Store) //
  const {cart} = state;
 
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + "- Ecommerce" : "Ecommerce"}</title>
        <meta name="description" content="Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1}/>
      <div className="flex flex-col min-h-screen  min-w-full justify-between">
        <header className="">
          <nav className="flex h-12 justify-between items-center px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Ecommerce</a>
            </Link>
            <div>
                <Link href='/cart'><a className="p-2">Cart{cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
      
                </a></Link>
                {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">Copyright @2022 <Link href='https://localhostweb.vercel.app/'><a>LocalHost</a></Link></footer>
      </div>
    </>
  );
}
