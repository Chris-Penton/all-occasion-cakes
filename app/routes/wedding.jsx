import React from 'react';
import {Link} from '@remix-run/react';

const metrics = [
  {
    id: 1,
    stat: '8K+',
    emphasis: 'Companies',
    rest: 'use laoreet amet lacus nibh integer quis.',
  },
  {
    id: 2,
    stat: '25K+',
    emphasis: 'Countries around the globe',
    rest: 'lacus nibh integer quis.',
  },
  {
    id: 3,
    stat: '98%',
    emphasis: 'Customer satisfaction',
    rest: 'laoreet amet lacus nibh integer quis.',
  },
  {
    id: 4,
    stat: '12M+',
    emphasis: 'Issues resolved',
    rest: 'lacus nibh integer quis.',
  },
];

const faqs = [
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  // More questions...
];

export default function WeddingPage() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-16 px-4">
          <div className="text-center">
            <h1>
              <p className="mt-1 text-4xl font-bold tracking-tight text-aocBg1 sm:text-5xl lg:text-6xl">
                Wedding & Engagement Cakes
              </p>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Crafted with Love, Devoured with Joy: Let our wedding cakes be the
              centrepiece of your reception, enchanting your guests with their
              impeccable taste, exquisite presentation, and unparalleled
              artistry.
            </p>
          </div>
        </div>
      </div>
      {/* Alternating Feature Sections */}
      <div className="relative pt-8 pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
        />
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-darkAoc"></span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-aocBg1">
                    Order your Dream Wedding Cake
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    We understand that your wedding day is one of the most
                    important days of your life. That's why we are dedicated to
                    making the process of ordering your wedding cake as easy and
                    stress-free as possible.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/shop"
                      state={{data: 4}}
                      className="rounded-3xl bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-bgPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Explore Our Wedding Cake Collection
                    </Link>
                    {/* Fix link here to wedding category */}
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <blockquote>
                  <div>
                    <p className="text-base text-gray-500">
                      "Absolutely amazing! Our original supplier fell through
                      and recommended All Occasion Cakes and we were not
                      disappointed. Our wedding cake was gorgeous and delicious
                      - there was hardly any left at the end of the night!
                      Rebekah incorporated our flowers beautifully and delivered
                      to our location. Thank you for taking us on at the last
                      minute and fulfilling our wedding cake dreams!"
                    </p>
                  </div>
                  <footer className="mt-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-base font-medium text-gray-700">
                        Brieanna Sloan
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding3-30ed366896a3b8a0c6dfa93a8b53936d.webp?v=1726494238"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-darkAoc">
                    {/* <lord-icon
                          target="div"
                          trigger="hover"
                          src="https://cdn.lordicon.com/xryjrepg.json"
                          colors="primary:#ffffff,secondary:#ffffff"
                          stroke="85"
                          style={{ width: "40px", height: "40px" }}
                        ></lord-icon> */}
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-aocBg1">
                    Memories Layered in Every Bite
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Let your love story be the centerpiece of your wedding
                    reception with a magnificent cake that reflects your journey
                    together. Unite your flavours of choice with exquisite
                    design to create a show-stopping masterpiece that's as
                    delicious as it is visually stunning.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/contact"
                      className="rounded-3xl bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-bgPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Start Designing Your Perfect Cake
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding1.1_1.webp?v=1726494961"
                  alt="Customer profile user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}

      <div className="pb-10 bg-gray-100 ">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight text-aocBg1 sm:text-4xl">
                Sample Flavour Box
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                From classic favourites to unique combinations, our flavour box
                holds the key to the perfect wedding cake experience. Let your
                love story inspire the taste journey of a lifetime, where every
                bite becomes a cherished memory.
              </p>

              <div className="mt-10 flex">
                <Link
                  to="/products/sample-box/"
                  className="rounded-3xl bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-bgPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Taste Your Wedding Cake Flavors
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                  src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding-page-3-8be3d4cc93d2afd58aa8847173e8726e.webp?v=1726494237"
                  alt=""
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-3xl bg-gray-50 object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="hidden sm:block order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding-page-1-b15786258231b9100d2b34f76b410d95.webp?v=1726494237"
                    alt=""
                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-3xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding-page-2-d6a62c35fdc48e2f00a3a0cbb325cda2.webp?v=1726494237"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-3xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0868/5355/0364/files/wedding-page-4-81e2087d5a9290e862497be5b548a288.webp?v=1726494237"
                    alt=""
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-3xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
