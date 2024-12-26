import React from "react";

export default function NotFound() {
  return (
    <section className="bg-white absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div className="py-8 px-4 m-auto max-w-screen-xl lg:py-16 lg:px-6 h-full ">
        <div className="m-auto max-w-screen-sm text-center h-full">
          <h1 className="mb-4 text-7xl tracking-tight md:font-extrabold font-bold lg:text-9xl text-primary-600 font-lato">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl font-lato">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <a
            href="/"
            className="font-creato inline-flex text-[#FF6F61] md:font-extrabold font-bold bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center  my-4"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
}
