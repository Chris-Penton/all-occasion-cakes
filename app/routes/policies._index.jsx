import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = Object.values(data.shop || {});

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return json({policies});
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const {policies} = useLoaderData();

  return (
    <div className="px-6 py-24 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Policies
        </h2>
      </div>

      <div className="pt-14">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {policies.map((policy) => {
            if (!policy) return null;
            return (
              <Link to={`/policies/${policy.handle}`}>
                <li
                  key={policy.id}
                  className="overflow-hidden rounded-3xl border border-gray-200"
                >
                  <div className="hover:bg-bgPrimary hover:text-white flex items-center gap-x-4 border-b border-gray-900/5 bg-white p-6">
                    <div className="text-sm font-medium leading-6 ">
                      {policy.title}
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
