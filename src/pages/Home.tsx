import Autocomplete from 'components/Autocomplete';
import { ChangeEvent, FormEvent, useState, type ReactElement } from 'react';
import { CountryType } from '../types';

export default function HomePage(): ReactElement {
  const [country, setCountry] = useState<CountryType>();
  const [inputValues, setInputValues] = useState({ username: '', taxId: '' });
  const [errorMessage, setErrorMessage] = useState({ username: '', taxId: '' });
  const [apiResponse, setApiResponse] = useState({ type: '', message: '' });
  const countries: CountryType[] = [
    { id: 'us', name: 'United States', },
    { id: 'ca', name: 'Canada', },
    { id: 'co', name: 'Colombia', },
    { id: 'ar', name: 'Argentina', },
    { id: 'uk', name: 'United Kingdom', },
    { id: 'sp', name: 'Spain', },
    { id: 'jp', name: 'Japan', },
    { id: 'ko', name: 'South Korea', },
    { id: 'eg', name: 'Egypt', },
    { id: 'ni', name: 'Nigeria', },
    { id: 'az', name: 'Australia', },
    { id: 'nz', name: 'New Zealand', },
  ];

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const validTaxId = () => {
    const usRegex = /^\d{4}-[a-zA-Z]{3}-(\d{5}|\d{7})$/;
    const caRegex = /^[0-9ABD]{10}-[A-Za-z]{2}$/;
    if (country && country.id === 'us' && usRegex.test(inputValues.taxId)) return true;
    if (country && country.id === 'ca' && caRegex.test(inputValues.taxId)) return true;
    if (country?.id !== 'us' && country?.id !== 'ca') return true;
    return false;
  };

  const submitForm = () => {
    const content = {
      country: country?.name,
      username: inputValues.username,
      taxId: inputValues.taxId
    };
    // https://app.wiremock.cloud/
    fetch('https://1zle5.wiremockapi.cloud/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setApiResponse({ type: 'success', message: 'Success!' });
      })
      .catch((error) => {
        setApiResponse({ type: 'danger', message: 'Error!' });
      });
  };

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement;
    const usernameElement = form.querySelector('.username') as HTMLInputElement;
    const taxIdElement = form.querySelector('.tax-identifier');
    let messages = { taxId: '', username: '' };
    event.preventDefault();

    setApiResponse({ type: '', message: '' });

    if (usernameElement?.value.length < 3) {
      usernameElement?.classList.remove('is-valid');
      usernameElement?.classList.add('is-invalid');
      messages.username = 'User name is required, and should be at least 3 characters';
    } else {
      usernameElement?.classList.remove('is-invalid');
      usernameElement?.classList.add('is-valid');
    }

    if (!validTaxId()) {
      taxIdElement?.classList.remove('is-valid');
      taxIdElement?.classList.add('is-invalid');
      messages.taxId = 'You Need a Valid Tax ID';
    } else {
      taxIdElement?.classList.remove('is-invalid');
      taxIdElement?.classList.add('is-valid');
    }

    setErrorMessage(messages);

    if (messages.username.length === 0 && messages.taxId.length === 0) {
      submitForm();
    }
  };

  return (
    <div className="home container text-center">
      <div className="row justify-content-md-center">
        <div className="col-12">
          <form className='needs-validation' noValidate onSubmit={validateForm}>
            <div className="form-floating mb-3">
              <input
                className="form-control username"
                placeholder="User name"
                type="text"
                name="username"
                value={inputValues.username}
                onChange={handleOnChange}
                required
                minLength={3}
              />
              <label>User Name</label>
              <div className="invalid-feedback">
                {errorMessage.username}
              </div>
            </div>

            <Autocomplete label="Country" suggestions={countries} placeholder="Country" setValue={setCountry} />

            <div className="form-floating mb-3">
              <input
                className="form-control tax-identifier"
                placeholder="Tax Identifier"
                type="text"
                name="taxId"
                value={inputValues.taxId}
                onChange={handleOnChange}
                required
              />
              <label>Tax Identifier</label>
              <div className="invalid-feedback">
                {errorMessage.taxId}
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
          <p className='mt-3'>
            <small>
              To test an error case, just use <mark>Error</mark> as an username.
            </small>
          </p>
          {
            apiResponse.message.length > 0
              ? (
                <div className={`alert alert-${apiResponse.type}`} role="alert">
                  {apiResponse.message}
                </div>
              ) : null
          }
        </div>
      </div>
    </div>
  );
}
