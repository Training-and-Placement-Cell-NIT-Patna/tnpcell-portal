import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Not Found</title>
      </Head>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center text-4xl pt-9  max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <div className="font-extrabold text-yellow-500 uppercase tracking-wide ">
                <div className="">
                  <Link href="/">
                    <span className="text-9xl ">
                      4
                      <Image
                        className="mx-auto animate-pulse"
                        width={100}
                        height={100}
                        alt="NIT Patna"
                        src="/images/logo.png"
                      />
                      4
                    </span>
                  </Link>
                </div>{" "}
                error!
              </div>
              <h1 className="mt-2 text-5xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Sorry!! we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/" className="">
                  <button className="transition text-slate-200 text-sm rounded-lg ease-in-out p-3 delay-150 bg-yellow-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
