import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {CurrencyDollarIcon} from '@heroicons/react/24/outline';
import {Image} from '@shopify/hydrogen';
import {MyDatePicker} from '../components/DatePicker';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [
    {
      title: `All Occasion Cakes | Shop 
   `,
    },
  ];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {storefront} = context;

  //   const flavourList = await storefront.query(SHOP_FLAVOURS);

  const flavourList = 'hello world';
  return defer({
    flavourList,
  });
}

export default function ShopPage() {
  /** @type {LoaderReturnData} */
  //   const {flavourList} = useLoaderData();

  //   const flavoursArray = JSON.parse(flavourList.metaobject.fields[0].value).flavour;

  return (
    <>
      <MyDatePicker />
      Shop TEST
    </>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
