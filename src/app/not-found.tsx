import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <section className="flex h-full items-center justify-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-red-600 dark:text-red-500 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Il manque quelque chose.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Nous sommes désolés, mais nous ne parvenons pas à trouver cette
            page.
          </p>
          <Link href="/">
            <button className=" sm rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Retour à l'accueil
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
