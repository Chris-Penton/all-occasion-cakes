import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Image } from "@shopify/hydrogen";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `All Occasion Cakes | Flavours `}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {storefront} = context;

  const flavourList = await storefront.query(SHOP_FLAVOURS);

  return defer({
    flavourList,
  });
}

export default function SearchPage() {
  /** @type {LoaderReturnData} */
  const {flavourList} = useLoaderData();

  const flavoursArray = JSON.parse(flavourList.metaobject.fields[0].value).flavour;

  return (
    <>
      <div className="bg-bray-100">
        <div className="mx-auto max-w-7xl pt-12 pb-8 px-4">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold tracking-tight text-aocBg1 sm:text-5xl lg:text-6xl">
              Flavours
            </p>
            <p className="mx-auto mt-5 text-lg text-gray-500">
              Treat your taste buds to a world of flavour with our extensive
              range of cake flavours!<br></br>
              <br></br> We also offer a variety of dietary options, including
              Gluten-free, so everyone can enjoy a slice of heaven*. <br></br>
              <br></br>
              Explore our range of flavours today and let us help you find your
              new favourite!
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="bg-white shadow sm:rounded-3xl">
          {/* change to white for better motion on load */}
          <div className="rounded-3xl bg-gray-200 shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            {flavoursArray.map((action, actionIdx) => (
              <div
                key={action.name}
                className={classNames(
                  actionIdx === 0
                    ? 'rounded-tl-3xl rounded-tr-3xl sm:rounded-tr-none'
                    : '',
                  actionIdx === 1 ? 'sm:rounded-tr-3xl' : '',
                  actionIdx === flavoursArray.length - 2
                    ? 'sm:rounded-bl-3xl'
                    : '',
                  actionIdx === flavoursArray.length - 1
                    ? 'rounded-bl-3xl rounded-br-3xl sm:rounded-bl-none'
                    : '',
                  'relative group bg-white h-full p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
                )}
              >
                <div>
                  <span
                    className={classNames(
                      'rounded-3xl inline-flex ring-4 ring-white',
                    )}
                  >
                    {action.premium ? (
                      <div
                        tooltip="Premium Flavour"
                        className="rounded-3xl mr-1 bg-primary"
                      >
                        <CurrencyDollarIcon
                          className="h-12 w-12 text-secondary"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {action.glutenfree ? (
                      <div
                        tooltip="Gluten Free Option Available"
                        className="rounded-3xl mr-1 bg-primary"
                      >
                        <Image
                          className="h-12 w-12 fill-secondary"
                          aria-hidden="true"
                          data={{
                            url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/gluten-free.png?v=1713795693',
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {action.containsNut &&
                    action.name === 'Choc Nutella Mud' ? (
                      <div
                        tooltip="Contains Hazelnut & May Contain Traces of Tree Nuts"
                        className="rounded-3xl mr-1 bg-primary"
                      >
                        <div className="align-middle">
                          <Image
                            className="h-12 w-12 fill-secondary"
                            aria-hidden="true"
                            data={{
                              url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/nuts.png?v=1713795692',
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {action.containsNut && action.name != 'Choc Nutella Mud' ? (
                      <div
                        tooltip="May Contain Traces of Tree Nuts"
                        className="rounded-3xl mr-1 bg-primary"
                      >
                        <Image
                          className="h-12 w-12 fill-secondary"
                          aria-hidden="true"
                          data={{
                            url: 'https://cdn.shopify.com/s/files/1/0646/3189/8304/files/nuts.png?v=1713795692',
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="mt-1">
                  <h3 className="text-lg font-medium">
                    <a className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span
                        className="text-bgPrimary inset-0"
                        aria-hidden="true"
                      />
                      {action.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
