import { useState } from "react";
import AddCompany from "./AddCompany";
import FloatingLabelInput from "./FloatingLabelInput";
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'; 
import { useCart } from "@/hooks/useCart";
import { CountrySelect } from "./CountrySelect";




interface ShippingData {
    company: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    zip: string;
    email: string;
    phone: string;
}

export default function InputInfo() {
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const { items } = useCart();
    
    const [shippingData, setShippingData] = useState<ShippingData>({
        company: '',
        firstName: '',
        lastName: '',
        country: 'MD',
        address: '',
        city: '',
        zip: '',
        email: '',
        phone: '',
    });
    
    const [errors, setErrors] = useState({
        company: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        email: '',
        phone: '',
    });


    const validatePhoneNumber = (phone: string, country: string) => {
      const countryCode = country.toUpperCase() as CountryCode;
      try {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
        return phoneNumber?.isValid() || false;
      } catch (error) {
        return false;
      }
    };


    const validateInput = (name: string, value: string) => {
      switch (name) {
        case 'firstName':
        case 'lastName':
        case 'address':
        case 'city':
        case 'country':
          return value.length > 0;
        case 'zip':
          return value.length >= 4;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        case 'phone':
          return validatePhoneNumber(value, shippingData.country); 
        default:
          return true;
      }
    };

    const fetchCountryFromZip = async (zip: string) => {
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) {
          throw new Error('Invalid ZIP code or no data found.');
        }
        const data = await response.json();
        return data.country_abbreviation;
      } catch (error) {
        console.error('Error fetching country from ZIP code:', error);
        return null;
      }
    };


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setShippingData({
        ...shippingData,
        [name]: value,
      });

      const isValid = validateInput(name, value);
      setErrors({
        ...errors,
        [name]: isValid ? '' : `${name} is not valid`,
      });

      if (name === 'zip') {
        const countryAbbreviation = await fetchCountryFromZip(value);
        if (countryAbbreviation) {
          setShippingData((prevData) => ({
            ...prevData,
            country: countryAbbreviation,
          }));
        }
      }
    };

    const getInputStyles = (error: string) => {
      return `border ${error ? 'border-red-500 bg-red-100 text-red-500 placeholder-red-500' : 'border-[#6F6F6F]'} focus:bg-blue-100 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out`;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isFormValid) return;

      const products = items.map((item) => ({
          name: item.product,
          quantity: item.quantity,
          price: item.price,
      }));

      const emailData = {
          email: shippingData.email,
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          products, 
      };

      try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to send email:', errorData);
            throw new Error(`Email sending failed: ${response.statusText}`);
        }
        console.log('Email sent successfully');
      } catch (error) {
          console.error('Error while sending email:', error);
      }
    

      setIsSubmitted(true);
      setIsEditing(false);
      setIsPaymentVisible(true);
    };


    const handleCountryChange = (country: string) => {
      setShippingData({
        ...shippingData,
        country,
      });
    };

    return (
        <>
            <h2 className="font-Heebo-24-- mb-5 text-[#1E1E1E] mt-[40px] md:block hidden">Where should we send your order?</h2>
              <h2 className="font-Heebo-18-med mb-5 text-[#1E1E1E] mt-[40px] md:hidden block">When will your order arrive?</h2>
              <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-5 h-full">
                <div className="flex md:gap-5 gap-[10px] md:h-[56px] max-w-[520px] md:flex-row flex-col">
                    <div className="w-full md:h-full h-[56px] md:block hidden">
                        <FloatingLabelInput
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={shippingData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            error={errors.firstName}
                            required
                            getInputStyles={getInputStyles}
                        />
                    </div>
                    <div className="w-full md:h-full h-[56px] md:block hidden">
                        <FloatingLabelInput
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={shippingData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            error={errors.lastName}
                            required
                            getInputStyles={getInputStyles}
                        />

                    </div>
                </div>

                <div className='md:hidden'>
                  <FloatingLabelInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    error={errors.firstName}
                    required
                    getInputStyles={getInputStyles}
                    
                  />
                </div>

                <div className='md:hidden'>
                  <FloatingLabelInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      error={errors.lastName}
                      required
                      getInputStyles={getInputStyles}
                  />
                </div>
              
                <div className="w-full">
                    <FloatingLabelInput
                        type="text"
                        id="address"
                        name="address"
                        value={shippingData.address}
                        onChange={handleChange}
                        placeholder="Street address"
                        error={errors.address}
                        required
                        getInputStyles={getInputStyles}
                    />
                </div>

                <div className="flex md:gap-[20px] gap-[10px] max-w-[520px] flex-col sm:flex-row">
                    <div className="w-full h-[56px] mb-0 md:hidden">
                        <FloatingLabelInput
                            type="text"
                            id="city"
                            name="city"
                            value={shippingData.city}
                            onChange={handleChange}
                            placeholder="City/Town"
                            required
                            getInputStyles={getInputStyles}
                        />
                        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                    </div>
                    <div className="w-full h-[56px] mb-0 md:block hidden">
                        <FloatingLabelInput
                            type="text"
                            id="city"
                            name="city"
                            value={shippingData.city}
                            onChange={handleChange}
                            placeholder="City/Town"
                            error={errors.city}
                            required
                            getInputStyles={getInputStyles}
                        />
                    </div>
                    <div className={`w-full h-[56px] flex items-center py-2 rounded-[10px] text-[14px] font-heebo placeholder-[#6F6F6F] ${getInputStyles(errors.country)}`}>
                        <CountrySelect
                            selectedCountry={shippingData.country}
                            onCountryChange={handleCountryChange}
                        />
                    </div>
                    <div className="w-full">
                        <FloatingLabelInput
                            type="text"
                            id="zip"
                            name="zip"
                            value={shippingData.zip}
                            onChange={handleChange}
                            placeholder="Zip code"
                            error={errors.zip}
                            required
                            getInputStyles={getInputStyles}
                        />
                    </div>
                </div>

                <AddCompany/>

                <h2 className="font-Heebo-24-- text-[#1E1E1E] md:pt-5 pt-[30px] md:block hidden">How can we reach you?</h2>
                <h2 className="font-Heebo-18-med text-[#1E1E1E] md:pt-5 pt-[20px] md:hidden">How can we reach you?</h2>
                <FloatingLabelInput
                    type="email"
                    id="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    error={errors.email}
                    required
                    getInputStyles={getInputStyles}
                />
                <div className='text-[14px] font-heebo text-[#1E1E1E] md:mt-[520px] md:hidden font-Heebo-reg-12'>
                    <p className='mb-5'>We’ll send your receipt and updates by email.</p>
                </div>  

                <FloatingLabelInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    error={errors.phone}
                    required
                    getInputStyles={getInputStyles}
                />
              <div className='text-[14px] font-heebo text-[#1E1E1E] md:hidden font-Heebo-reg-12 '>
                <p className='mb-[30px]'>Make sure your phone number is correct. It can’t be changed.</p>
              </div>

              <button
                  type="submit"
                  className={`bg-[#E5E5E5] py-2 h-[56px] rounded-[10px] w-full font-Heebo-16 text-[#9E9EA0] ${isFormValid ? 'bg-black text-white' : 'opacity-50 cursor-not-allowed text-white'}`}
                  disabled={!isFormValid}
              >
                  Continue to Payment
              </button>
            </form>
        </>
    )
}