import {Fragment, useState} from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  DialogBackdrop,
} from '@headlessui/react';
import {ChevronRightIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import {UsersIcon, XMarkIcon} from '@heroicons/react/24/outline';

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];

const recent = [people[5], people[4], people[2], people[10], people[16]];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

export function AsideSearch({children, heading, id = 'search-aside'}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)(console.log('hello world'));
        }}
      >
        Open Search
      </button>

      <Dialog
        className="relative z-10"
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery('');
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <Combobox
              onChange={(person) => {
                if (person) {
                  window.location = person.url;
                }
              }}
            >
              {({activeOption}) => (
                <>
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <ComboboxInput
                      autoFocus
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setQuery(event.target.value)}
                      onBlur={() => setQuery('')}
                    />
                  </div>

                  {(query === '' || filteredPeople.length > 0) && (
                    <ComboboxOptions
                      as="div"
                      static
                      hold
                      className="flex transform-gpu divide-x divide-gray-100"
                    >
                      <div
                        className={classNames(
                          'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                          activeOption && 'sm:h-96',
                        )}
                      >
                        {query === '' && (
                          <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                            Recent searches
                          </h2>
                        )}
                        <div className="-mx-2 text-sm text-gray-700">
                          {(query === '' ? recent : filteredPeople).map(
                            (person) => (
                              <ComboboxOption
                                as="div"
                                key={person.id}
                                value={person}
                                className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                <img
                                  src={person.imageUrl}
                                  alt=""
                                  className="h-6 w-6 flex-none rounded-full"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {person.name}
                                </span>
                                <ChevronRightIcon
                                  className="ml-3 hidden h-5 w-5 flex-none text-gray-400 group-data-[focus]:block"
                                  aria-hidden="true"
                                />
                              </ComboboxOption>
                            ),
                          )}
                        </div>
                      </div>

                      {activeOption && (
                        <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <img
                              src={activeOption.imageUrl}
                              alt=""
                              className="mx-auto h-16 w-16 rounded-full"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {activeOption.name}
                            </h2>
                            <p className="text-sm leading-6 text-gray-500">
                              {activeOption.role}
                            </p>
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Phone
                              </dt>
                              <dd>{activeOption.phone}</dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                URL
                              </dt>
                              <dd className="truncate">
                                <a
                                  href={activeOption.url}
                                  className="text-indigo-600 underline"
                                >
                                  {activeOption.url}
                                </a>
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Email
                              </dt>
                              <dd className="truncate">
                                <a
                                  href={`mailto:${activeOption.email}`}
                                  className="text-indigo-600 underline"
                                >
                                  {activeOption.email}
                                </a>
                              </dd>
                            </dl>
                            <button
                              type="button"
                              className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Send message
                            </button>
                          </div>
                        </div>
                      )}
                    </ComboboxOptions>
                  )}

                  {query !== '' && filteredPeople.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <UsersIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        No people found
                      </p>
                      <p className="mt-2 text-gray-500">
                        We couldn’t find anything with that term. Please try
                        again.
                      </p>
                    </div>
                  )}
                </>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a className="close" href="#" onChange={() => history.go(-1)}>
      <div className="ml-3 flex h-7 items-center">
        <button
          type="button"
          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </a>
  );
}

//   <button
//     className="close-outside"
//     onClick={() => {
//       history.go(-1);
//       window.location.hash = '';
//     }}
//   />

//   <aside>
//     <div className="relative z-10">
//       <div className="fixed inset-0">
//         <div className="absolute inset-0">
//           <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//             <div className="pointer-events-auto w-screen max-w-md">
//               <div className="flex h-full flex-col mt-6 mr-6 shadow rounded-3xl shadow-bgPrimary bg-white">
//                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                   <div className="flex items-start justify-between">
//                     <div className="text-lg font-medium text-gray-900">
//                       {heading}
//                     </div>
//                     <CloseAside />
//                   </div>{' '}
//                   <main>{children}</main>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </aside>
