import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/lib/variants';

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <CartEmpty hidden={linesCount} layout={layout} />
        <CartDetails cart={cart} layout={layout} />
      </div>
    </div>
  );
}

/**
 * @param {CartMainProps}
 */
function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <>
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   lines: CartApiQueryFragment['lines'] | undefined;
 * }}
 */
function CartLines({lines, layout}) {
  if (!lines) return null;

  return (
    <form className="mt-12">
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          {lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line} layout={layout} />
          ))}
        </ul>
      </section>
    </form>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li key={id} className="flex py-6">
      {image && (
        <div className="flex-shrink-0">
          <Image
            alt={title}
            data={image}
            loading="lazy"
            className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
          />
        </div>
      )}

      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <Link
                prefetch="intent"
                className="font-medium text-gray-700 hover:text-gray-800"
                to={lineItemUrl}
                onClick={() => {
                  if (layout === 'aside') {
                    // close the drawer
                    window.location.href = lineItemUrl;
                  }
                }}
              >
                {product.title}
              </Link>
            </h4>
            <CartLinePrice line={line} as="span" />
          </div>
          <ul>
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <p className="mt-1 text-sm text-gray-500">
                  {option.name}: {option.value}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <>
      <div className="mt-10">
        <a
          href={checkoutUrl}
          target="_self"
          className="block w-full text-center rounded-3xl border border-transparent bg-secondary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Checkout
        </a>
      </div>

      <div className="mt-6 text-center text-sm">
        <p>
          or{' '}
          <a
            href="/shop"
            className="font-medium text-secondary hover:text-bgPrimary"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </p>
      </div>
    </>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <section aria-labelledby="summary-heading" className="mt-10">
      <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>
      <dl className="space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Subtotal</dt>
          <dd className="ml-4 text-base font-medium text-gray-900">
            {' '}
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>
      <p className="mt-1 text-sm text-gray-500">
        Shipping and taxes will be calculated at checkout.
      </p>
      {children}
    </section>
  );
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <div className="ml-4">
        <button
          type="submit"
          className="text-sm font-medium text-secondary hover:text-bgPrimary"
        >
          <span>Remove</span>
        </button>
      </div>
    </CartForm>
  );
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="mt-4 flex flex-1 items-end justify-between">
      <p className="flex items-center space-x-2 text-sm text-gray-700">
        <span></span>
      </p>
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <p className="ml-4 text-sm font-medium text-gray-900">
      {' '}
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </p>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
      >
        Continue shopping →
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
