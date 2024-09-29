import {useState, useEffect} from 'react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import {Field, Label, Switch} from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    toEmail: 'chrispenton1504@gmail.com',
    firstName: 'John',
    lastName: 'Smith',
    phoneNumber: '0448059737',
    eventDate: '12 Dec 2024',
    eventType: 'Wedding',
    deliveryAddress: '123 Fake Street, NSW, 2745',
    guests: '123',
    budget: '$300',
    company: 'TEST Company PTY',
    source: 'Google',
    description: 'I would like a cake pls xx',
  });

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files).slice(0, 2); // Limit to 2 files
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  async function sendEmail() {
    if (!formData || typeof formData !== 'object') {
      console.error('formData is undefined or not an object');
      return;
    }

    if (!Array.isArray(selectedFiles)) {
      console.error('selectedFiles is not an array');
      return;
    }

    const data = new FormData();

    // Check if formData has the required properties before appending them
    if (formData.toEmail) data.append('toEmail', formData.toEmail);
    if (formData.firstName) data.append('firstName', formData.firstName);
    if (formData.lastName) data.append('lastName', formData.lastName);
    if (formData.phoneNumber) data.append('phoneNumber', formData.phoneNumber);
    if (formData.eventDate) data.append('eventDate', formData.eventDate);
    if (formData.eventType) data.append('eventType', formData.eventType);
    if (formData.deliveryAddress)
      data.append('deliveryAddress', formData.deliveryAddress);
    if (formData.guests) data.append('guests', formData.guests);
    if (formData.budget) data.append('budget', formData.budget);
    if (formData.company) data.append('company', formData.company);
    if (formData.source) data.append('source', formData.source);
    if (formData.description) data.append('description', formData.description);

    // Append attachments (formerly files)
    selectedFiles.forEach((file) => {
      console.log(`Attachment Name: ${file.name}`);
      console.log(`Attachment Size: ${file.size} bytes`);
      console.log(`Attachment Type: ${file.type}`);
      data.append('attachments', file);
    });

    try {
      const response = await fetch('https://nb07q6.buildship.run/file-upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || '', // Handle undefined values gracefully
    });
  };

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <button onClick={sendEmail}>test email</button>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          We would love to hear from you and can't wait to help you create your
          All Occasion Cake. Alternatively you can give us a call on{' '}
          <a
            className="text-secondary hover:text-bgPrimary"
            href="tel:+61499007784"
          >
            0499 007 784
          </a>
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="dropzone"
        encType="multipart/form-data"
        id="my-great-dropzone"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-3xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Company
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-2.5">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block bg-white rounded-3xl border border-gray-300 shadow-sm px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload cake design images (Max 2)
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              multiple
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Selected files:</p>
                <ul className="mt-1 grid grid-cols-1 gap-y-1">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex justify-between items-center"
                    >
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-2 p-1 bg-white rounded-full text-gray-500 hover:text-white hover:bg-secondary focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Field as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
                  )}
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="button"
            onClick={sendEmail}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}
