import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'All Occasion Cakes | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div>
      <Hero />
      <ShopCollection />
      <Wedding />
      <Contact />
      <Testimonials />
      <Discount />

      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      {/* <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="mt-6">
      <h2 className="sr-only">Recommended Products</h2>

      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Recommended Products
        </h2>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="group"
                  to={`/products/${product.handle}`}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-3xl bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Image
                      data={product.images.nodes[0]}
                      aspectRatio="1/1"
                      sizes="(min-width: 45em) 20vw, 50vw"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>

                  <Money
                    className="mt-1 text-lg font-medium text-gray-900"
                    data={product.priceRange.minVariantPrice}
                  />
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

function Hero() {
  return (
    <div className="mt-8 rounded-3xl bg-primary sm:pt-16 lg:pt-4 lg:pb-4 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">All Occasion Cakes</span>
                  <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary sm:pb-5">
                    Made with love.
                  </span>
                </h1>
                <p className="text-base text-darkAoc sm:text-xl lg:text-lg xl:text-xl">
                  Our cakes are handcrafted with love by our professional cake
                  artists who can create anything you can imagine. <br></br>
                  <br></br> All of our cakes are custom made with the finest
                  ingredients, care and attention to detail. We deliver in
                  Sydney, the Blue Mountains, Wollongong & Illawarra, Hunter
                  Valley, and the Southern Highlands. <br></br>
                  <br></br>{' '}
                  <i>
                    Your occasion is special why not have a cake to remember!
                  </i>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <Link
                      to="/shop"
                      className="rounded-3xl bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-bgPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Shop Now
                    </Link>
                    <Link
                      to="/contact"
                      className="text-sm font-semibold leading-6 text-secondary hover:text-bgPrimary"
                    >
                      Custom Cake? Contact Us <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl">
            <Image
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              data={{
                url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/home_page_banner.webp?v=1713578852',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopCollection() {
  const callouts = [
    {
      name: 'Make Her Dreams Come True with our Sweet Treats!',
      description: 'Birthday Cakes for Girls',

      imageAlt:
        'Unicorn cake with rainbow - a magical and colorful cake perfect for celebrations',
      href: 2,
      colour: 'lpOne',
    },
    {
      name: 'Level Up His Birthday with our Awesome Cakes!',
      description: 'Birthday Cakes for Boys',

      imageAlt:
        'Toy Story cake - a fun and playful cake featuring beloved characters from the movie',
      href: 3,
      colour: 'lpTwo',
    },
    {
      name: 'Every Birthday Deserves a Perfect Cake.',
      description: 'Birthday Cakes for All',

      imageAlt:
        'Pink cake with flowers with Anna cake topper and macarons - a stunning and delectable cake perfect for any celebration with elegant floral decorations and tasty macarons.',
      href: 1,
      colour: 'lpThree',
    },
    {
      name: 'Taking Cake Design to the Next Dimension',
      description: '3D Cakes',

      imageAlt:
        '3D TED the Movie cake - a fun and unique cake featuring the lovable and irreverent character.',
      href: 6,
      colour: 'lpFour',
    },
    {
      name: "Celebrate life's moments with our scrumptious cakes!",
      description: "What's Trending",

      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: 8,
      colour: 'lpFive',
    },
    {
      name: 'Indulge in the Sweetest Trends!',
      description: 'All Occasion',

      imageAlt:
        'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: 0,
      colour: 'lpSix',
    },
  ];

  return (
    <div className="mx-auto sm:mt-44 md:mt-44 lg:mt-0 max-w-2xl py-8 pt-24 sm:py-12 lg:max-w-none lg:py-16">
      <h2 className="text-2xl font-bold text-aocBg1">
        Shop Our Delicious Cakes Today
      </h2>

      <div className="mt-4 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
        {callouts.map((callout, index) => (
          <div key={callout.name} className="group relative">
            <div
              className={`bg-${callout.colour} relative h-80 w-full overflow-hidden rounded-3xl group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1`}
            >
              <Link to="/shop" state={{data: callout.href}}>
                <Image
                  data={{
                    url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/home_page_banner.webp?v=1713578852',
                  }}
                  alt={callout.imageAlt}
                  className="h-full w-full object-cover object-center object-scale-down"
                />
              </Link>
            </div>
            <h3 className="mt-4 text-sm text-gray-500">
              <Link to="/shop" state={{data: callout.href}}>
                <span className="absolute inset-0" />
                {callout.name}
              </Link>
            </h3>
            <p className="text-base font-semibold mb-4 text-aocBg1">
              {callout.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Wedding() {
  return (
    <div className="relative rounded-3xl bg-primary">
      <div className="relative rounded-3xl h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <Image
          data={{
            url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/homepage_wedding_section_image.webp?v=1713786222',
          }}
          className="h-full w-full object-cover"
        />

        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F5CDBE" />
              <stop offset={1} stopColor="#F5CDBE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <p className="mt-2 text-3xl font-bold tracking-tight text-aocBg1 sm:text-4xl">
            Say 'I Do' to Our <br />
            Beautiful Wedding Cakes
          </p>
          <p className="mt-6 text-base leading-7 text-aocBg1">
            Let us help you celebrate your big day with a beautifully crafted
            and delicious wedding cake that perfectly complements your style and
            theme. From classic designs to modern trends, we'll work with you to
            create a custom cake that is uniquely yours.
          </p>
          <div className="mt-8">
            <Link
              to="/wedding"
              className="inline-flex rounded-3xl bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-bgPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Wedding & Engagement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="relative mt-24 overflow-hidden rounded-3xl bg-primary lg:h-96">
      <div className="absolute inset-0">
        <Image
          data={{
            url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/homepage_contact_section_image.webp?v=1713786366',
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
      <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
      <div
        className="absolute z-50 inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-secondary bg-opacity-40 p-6 backdrop-blur backdrop-filter 
          sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none"
      >
        <div>
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <p className="mt-1 text-md text-white">
            Order a delicious custom cake for your special occasion. Contact us
            today to make your event even more memorable!
          </p>
        </div>
        <Link
          to="/contact"
          className="mt-6 z-auto flex flex-shrink-0 items-center justify-center rounded-3xl border border-white border-opacity-25 bg-white bg-opacity-0 py-3 px-4 text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

function Testimonials() {
  const featuredTestimonial = {
    body: 'The best in the cake business! We were wowwwwwwwd by our detailed stunning koala cake and cookies. Stunning immaculate detail and creativity mixed with rich mouth watering flavours. We have had 3 cakes from Bec and can’t recommend her enough! There is simply none else quite as high standard as these! Do yourself a favour and treat yourself to All occasion cakes for your next special occasion. Highly recommend as the best in Sydney! Thank you for being amazing and making our special occasion extra special!',
    author: {
      name: 'Vicki S',
      handle: 'Marketing Manager',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
      logoUrl:
        'https://img.rezdy.com/PRODUCT_IMAGE/30743/featherdale_logo_med.webp',
    },
  };
  const testimonials = [
    [
      [
        {
          body: `Highly recommend All Occasion Cakes.
          My sons birthday cake was more than I expected  and tasted better than any cake I have EVER eaten.
          Rebekah is  amazing at what she does 🙌
          10/10`,
          author: {
            name: 'Tray See',
            handle: 'Tray See',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `It is not often I'm left speechless, but when I saw the 3D cake Rebekah had made for my husbands 50th (from photos emailed to her), I was nearly in tears. Add to that, her efficiency, professionalism and the ease with which our transaction took place, I would definitely recommend All Occasion Cakes. It's a thumbs up 5-star rating from me!`,
          author: {
            name: 'Vicky Nonas',
            handle: 'Vicky Nonas',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },

        {
          body: 'All Occasion Cakes made our baby shower cake. It was delicious, and stunning.  So beautifully finished and detailed.  Thanks so much.  I thoroughly recommend and will use All Occasion Cakes again!',
          author: {
            name: 'Tracey Henry',
            handle: 'Tracey Henry',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },

        // More testimonials...
      ],
      [
        {
          body: 'Rebekah made my sons cake for his 4th birthday. And we absoultly loved it. She gave me an option for different cakes as it was something they wanted to try and it turned out perfect. 💕💕',
          author: {
            name: 'Aleisha Prowse',
            handle: 'Aleisha Prowse',
            imageUrl:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: 'The cake was exactly what we wanted, it looked amazing and tasted delicious. Thank you Rebekah xx',
          author: {
            name: 'Natalie Jones',
            handle: 'Natalie Jones',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
    ],
    [
      [
        {
          body: `We can’t thank Rebekah enough for the amazing Cocomelon cake she created for our son’s first birthday. We were absolutely blown away with her incredible work!
          All the communication was brilliant from start to finish and the process was so easy.
          All Occasion Cakes is where we will go to have all our cakes made from here on out. Thanks so much Rebekah!!!`,
          author: {
            name: 'Marnie Kelly-Grant ',
            handle: 'Marnie Kelly-Grant ',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: 'All Occasion Cakes did an amazing job on our elopement cake! Couldn’t have asked for more. A big thank you!',
          author: {
            name: 'Hayley Jones',
            handle: 'Hayley Jones',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
      [
        {
          body: `Your service is very personal from beginning to end Rebekah. Your design and eye for detail is amazing and your assistance in sourcing the flowers goes above and beyond. We can’t thank you enough for our wedding cake, it looked and tasted amazing. We are still receiving comments from our guests. We’ll be back for another cake and will highly recommend you to others as well. Big thanks 💐`,
          author: {
            name: 'Kerri Brown ',
            handle: 'Kerri Brown ',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: 'Rebekah was amazing. We had to organise an Engagement Cake last minute and she made exactly what we needed and delivered it to the venue. The cake was not only gorgeous, it tasted spectacular. I highly recommend.',
          author: {
            name: 'Karen Marsh ',
            handle: 'Karen Marsh',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `I had a great experience with Bek which was so important as I planned my wedding from interstate. We had a three tiered cake with three different flavours and it tastes amazing and fit the brief to a T.
          Highly recommend the passionfruit mudcake`,
          author: {
            name: 'Sinem Eda',
            handle: 'Sinem Eda',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
    ],
  ];

  return (
    <div className="relative isolate pt-6 mt-14 pb-16 sm:pt-4">
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
        <svg
          viewBox="0 0 1313 771"
          aria-hidden="true"
          className="ml-[max(50%,38rem)] w-[82.0625rem]"
        >
          <path
            id="bc169a03-3518-42d4-ab1e-d3eadac65edc"
            fill="url(#85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3)"
            d="M360.508 589.796 231.671 770.522 0 498.159l360.508 91.637 232.034-325.485c1.485 150.396 51.235 393.965 238.354 165.069C1064.79 143.261 1002.42-107.094 1171.72 46.97c135.44 123.252 148.51 335.641 138.11 426.428L971.677 339.803l24.062 411.461-635.231-161.468Z"
          />
          <defs>
            <linearGradient
              id="85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3"
              x1="1313.17"
              x2="-88.881"
              y1=".201"
              y2="539.417"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F5CDBE" />
              <stop offset={1} stopColor="#752424" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end">
        <svg
          viewBox="0 0 1313 771"
          aria-hidden="true"
          className="ml-[-22rem] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] xl:ml-0 xl:mr-[calc(50%-12rem)]"
        >
          <use href="#bc169a03-3518-42d4-ab1e-d3eadac65edc" />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-secondary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-bgPrimary sm:text-4xl">
            Sweet words from our satisfied cake lovers!
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-aocBg1 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="col-span-2 hidden sm:block sm:rounded-3xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-bgSecondary xl:col-start-2 xl:row-end-1">
            <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-aocBg1">
              {featuredTestimonial.body}
            </blockquote>
            <figcaption className="flex items-center gap-x-4 border-t border-aocBg1/10 py-4 px-6">
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
              </div>
              <img
                className="h-10 w-auto text-primary flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
              />
            </figcaption>
          </figure>

          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-bgSecondary"
                    >
                      <blockquote className="text-aocBg1">
                        {testimonial.body}
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <div>
                          <div className="text-aocBg1 font-semibold">
                            {testimonial.author.name}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Discount() {
  return (
    <div className="rounded-3xl relative overflow-hidden mt-6 bg-white pb-6">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
          <Image
            data={{
              url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/homepage_discount_section_image.webp?v=1713787740',
            }}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
      </div>

      {/* Callout */}
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="sale-heading"
            className="text-4xl font-bold tracking-tight text-aocBg1 sm:text-5xl lg:text-6xl"
          >
            Enjoy 10% Off Your Order!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            Don't miss out on this sweet offer! Place your order now and use
            code CAKE10 at checkout to enjoy 10% off any Cake.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block w-full rounded-3xl border border-transparent bg-secondary py-3 px-8 font-medium text-white hover:bg-bgPrimary sm:w-auto"
          >
            Order Now and Save 10%
          </Link>
        </div>
      </section>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
