import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + "- Ecommerce" : "Ecommerce"}</title>
        <meta name="description" content="Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen  min-w-full justify-between">
        <header className="">
          <nav className="flex h-12 justify-between items-center px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Ecommerce</a>
            </Link>
            <div>
                <Link href=''><a className="p-2">Cart</a></Link>
                <Link href=''><a className="p-2">Login</a></Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">Copyright @2022 <Link href='https://localhostweb.vercel.app/'><a>LocalHost</a></Link></footer>
      </div>
    </>
  );
}
