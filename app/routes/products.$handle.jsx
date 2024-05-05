import {Suspense, Fragment, useState} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';

import {getVariantUrl} from '~/lib/variants';
import {
  QuestionMarkCircleIcon,
  StarIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import {RadioGroup, Listbox, Transition} from '@headlessui/react';
import {ShieldCheckIcon} from '@heroicons/react/24/outline';

const sizeDescription = [
  {
    name: '6 Inch',
    portions: 20,
  },
  {
    name: '8 Inch',
    portions: 40,
  },
  {
    name: '6 Inch - Double Height',
    portions: 40,
  },
  {
    name: '8 Inch - Double Height',
    portions: 80,
  },
];

const XXXX = {
  name: 'Everyday Ruck Snack',
  href: '#',
  price: '$220',
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
  imageAlt:
    'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    {id: 1, name: 'Travel', href: '#'},
    {id: 2, name: 'Bags', href: '#'},
  ],
  sizes: [
    {name: '18L', description: 'Perfect for a reasonable amount of snacks.'},
    {name: '20L', description: 'Enough room for a serious amount of snacks.'},
  ],
};

const people = [
  {id: 1, name: 'Wade Cooper'},
  {id: 2, name: 'Arlene Mccoy'},
  {id: 3, name: 'Devon Webb'},
  {id: 4, name: 'Tom Cook'},
  {id: 5, name: 'Tanya Fox'},
  {id: 6, name: 'Hellen Schmidt'},
  {id: 7, name: 'Caroline Schultz'},
  {id: 8, name: 'Mason Heaney'},
  {id: 9, name: 'Claudie Smitham'},
  {id: 10, name: 'Emil Schaefer'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const meta = ({data, location}) => {
  return [{title: `All Occasion Cakes | ${data?.product.title ?? ''}`}];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  const productOptions = await storefront.query(PRODUCT_METAFIELDS, {
    variables: {id: 'gid://shopify/Metaobject/78347960604'},
  });

  const mainAOCFlavours = await storefront.query(SHOP_FLAVOURS);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants, productOptions, mainAOCFlavours});
}

function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, variants, productOptions, mainAOCFlavours} = useLoaderData();
  const {selectedVariant} = product;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div className="lg:max-w-lg lg:self-end">
        <div className="mt-4">
          <ProductMain
            selectedVariant={selectedVariant}
            product={product}
            variants={variants}
            productOptions={productOptions}
            mainAOCFlavours={mainAOCFlavours}
          />
        </div>
      </div>
      <ProductImage image={selectedVariant?.image} />
    </div>
  );
}

function ProductImage({image}) {
  if (!image) {
    return <div>Error Loading Image</div>;
  }

  return (
    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-3xl">
        <Image
          alt={image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          key={image.id}
          sizes="(min-width: 45em) 50vw, 100vw"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}

function ProductMain({
  selectedVariant,
  product,
  variants,
  productOptions,
  mainAOCFlavours,
}) {
  const {title, descriptionHtml} = product;

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      <ProductPrice selectedVariant={selectedVariant} />
      <div className="mt-4 space-y-6">
        <h3 className="sr-only">Description</h3>
        <div
          className="text-base text-gray-500"
          dangerouslySetInnerHTML={{__html: descriptionHtml}}
        />
      </div>

      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
            productOptions={productOptions}
            mainAOCFlavours={mainAOCFlavours}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
              productOptions={productOptions}
              mainAOCFlavours={mainAOCFlavours}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="flex items-center">
      <h2 className="sr-only">Product information</h2>
      <div className="inline-flex flex">
        {' '}
        {selectedVariant?.compareAtPrice ? (
          <p className="text-lg text-secondary sm:text-xl">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <p class="line-through text-gray-900 ">
              <Money data={selectedVariant.compareAtPrice} />
            </p>
          </p>
        ) : (
          <p className="text-lg text-gray-900 sm:text-xl">
            {selectedVariant?.price && <Money data={selectedVariant?.price} />}
          </p>
        )}{' '}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  selectedVariant,
  variants,
  productOptions,
  mainAOCFlavours,
}) {
  return (
    <>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>

      {productOptions.metaobject.fields.map((option) => {
        if (option.key === 'flavour' && option.value === 'true') {
          return (
            <FlavourSelector
              label={'Select a Flavour'}
              key={option.key}
              data={mainAOCFlavours}
            />
          );
        }
      })}

      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  attributes: [
                    {
                      key: 'Flavour',
                      value: 'Choc',
                    },
                    {
                      key: 'Name',
                      value: 'Chris',
                    },
                  ],
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold out'}
      </AddToCartButton>
    </>
  );
}

function ProductOptions({option}) {
  return (
    // <div className="mt-6">
    //   <div className="sm:flex sm:justify-between" key={option.name}>
    //     <h5 className="block text-sm font-medium text-gray-700">
    //       {option.name}
    //     </h5>
    //     <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3">
    //       {option.values.map(({value, isAvailable, isActive, to}) => {
    //         return (
    //           <Link
    //             key={option.name + value}
    //             prefetch="intent"
    //             preventScrollReset
    //             replace
    //             to={to}
    //             className={
    //               isActive
    //                 ? 'text-gray-900 bg-white ring-2 ring-secondary relative bg-white block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
    //                 : 'text-gray-900 relative bg-white block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
    //             }
    //             // style={{
    //             //   border: isActive
    //             //     ? '1px solid black'
    //             //     : '1px solid transparent',
    //             //   opacity: isAvailable ? 1 : 0.3,
    //             // }}
    //           >
    //             <p className="text-sm font-medium">{value}</p>

    //             {option.name === 'Size' && (
    //               <>
    //                 {sizeDescription.map((item) =>
    //                   value === item.name ? (
    //                     <p as="p" className="mt-1 text-sm">
    //                       {item.portions} Portions
    //                     </p>
    //                   ) : null,
    //                 )}
    //               </>
    //             )}

    //             <div
    //               className={
    //                 isActive
    //                   ? 'border border-secondary pointer-events-none absolute -inset-px rounded-lg'
    //                   : ' vorder-2 border-transparent pointer-events-none absolute -inset-px rounded-lg'
    //               }
    //             />
    //           </Link>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    <></>
  );
}

function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <div className="mt-10">
      <CartForm
        route="/cart"
        inputs={{lines}}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher) => (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              type="submit"
              onClick={onClick}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-secondary px-8 py-3 text-base font-medium text-white hover:bg-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-50"
              disabled={disabled ?? fetcher.state !== 'idle'}
            >
              {children}
            </button>
          </>
        )}
      </CartForm>
    </div>
  );
}

function FlavourSelector({label, data}) {
  const [selected, setSelected] = useState({name: 'Select -'});

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({open}) => (
        <>
          <Listbox.Label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-3xl bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-3xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {JSON.parse(data.metaobject.fields[0].value).flavour.map(
                  (flavourOption) => (
                    <Listbox.Option
                      key={flavourOption.name}
                      className={({active}) =>
                        classNames(
                          active ? 'bg-secondary text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-8 pr-4',
                        )
                      }
                      value={flavourOption}
                    >
                      {({selected, active}) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {flavourOption.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-secondary',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ),
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

const SHOP_FLAVOURS = `#graphql
query ShopInfo {
  metaobject(handle: { handle: "main-aoc-flavours", type: "flavours" }) {
    handle
    id
    fields {
      value
    }
  }
}
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    metafield(namespace: "custom", key: "product_options"){
      id
      value
    }
    
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

const PRODUCT_METAFIELDS = `#graphql
  query getMetaObjectById($id: ID!) {
    metaobject(id: $id) {
      id
      fields{
        value
        key
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
