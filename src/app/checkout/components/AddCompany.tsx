import Image from "next/image";
import { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'; 


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


export default function AddCompany() {
    const [showCompanyInput, setShowCompanyInput] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const validatePhoneNumber = (phone: string, country: string) => {
       const countryCode = country.toUpperCase() as CountryCode;
       try {
         const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
         return phoneNumber?.isValid() || false;
       } catch (error) {
         return false;
       }
    };

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

    const getInputStyles = (error: string) => {
        return `border ${error ? 'border-red-500 bg-red-100 text-red-500 placeholder-red-500' : 'border-[#6F6F6F]'} focus:bg-blue-100 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out`;
    };
    
    
    

    const handleToggleCompanyInput = () => {
        setShowCompanyInput(!showCompanyInput);
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




    return (
        <>
          <div 
            className={`flex items-center cursor-pointer text-[#6F6F6F] text-[14px] md:hidden font-heebo transition-all duration-200`}
            onClick={handleToggleCompanyInput}
          >
            {!showCompanyInput && (
              <div className="flex items-center relative mt-2">
                <span className="mr-1">+</span>
                <span>Add Company Name</span>
                <span
                  className="ml-2 cursor-pointer relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Image src="/images/question-icon.svg" alt="info" width={22} height={22} className='' />
                  {showTooltip && (
                    <div className="absolute bg-gray-100 text-gray-700 text-sm p-3 rounded-[10px] shadow-lg w-[250px] -left-1/2 transform -translate-x-1/2 bottom-full mb-2 z-50">
                      The sales tax listed on the checkout page is only an estimate. Your invoice will contain the final sales tax, including state and local taxes, as well as any applicable rebates or fees.
                    </div>
                  )}
                </span>
              </div>
            )}
          </div>
      
          {showCompanyInput && (
            <div className="w-full md:hidden">
              <FloatingLabelInput
                type="text"
                id="company"
                name="company"
                value={shippingData.company}
                onChange={handleChange}
                placeholder="Company Name (optional)"
                error={errors.company}
                required
                getInputStyles={getInputStyles}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1 mb-6">{errors.company}</p>
              )}
            </div>
          )}
      
          <div className="flex items-center cursor-pointer text-[#6F6F6F] text-[14px] font-heebo md:mb-0 md:block hidden" onClick={handleToggleCompanyInput}>
            {!showCompanyInput && (
              <div className='flex items-center relative mt-[10px]'>
                <span className="mr-2">+</span>
                <span>Add Company Name</span>
                <span
                  className="ml-2 cursor-pointer relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Image src="/images/question-icon.svg" alt="info" width={18} height={18} className='' />
                  {showTooltip && (
                    <div className="absolute bg-gray-100 text-gray-700 text-sm p-3 rounded-[10px] shadow-lg w-[250px] -left-1/2 transform -translate-x-1/2 bottom-full mb-2 z-50">
                      The sales tax listed on the checkout page is only an estimate. Your invoice will contain the final sales tax, including state and local taxes, as well as any applicable rebates or fees.
                    </div>
                  )}
                </span>
              </div>
            )}
          </div>
      
          {showCompanyInput && (
            <div className="w-full md:block hidden">
              <FloatingLabelInput
                type="text"
                id="company"
                name="company"
                value={shippingData.company}
                onChange={handleChange}
                placeholder="Company Name (optional)"
                error={errors.company}
                required
                getInputStyles={getInputStyles}
              />
            </div>
          )}
        </>
      );
}
      