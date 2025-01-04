'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { CountrySelect } from './components/CountrySelect'; 
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'; 
import Order from '../../components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/order/Order';
import { InfoHeader } from '@/components/layouts/main-layout/header/InfoHeader';
import { CheckoutCartHeader } from '@/components/layouts/main-layout/header/header-menu/header-cart/CheckoutCartHeader';
import FooterCheckout from './components/FooterCheckout';
import FloatingLabelInput from './components/FloatingLabelInput';

import '../../../src/components/layouts/main-layout/header/header-menu/header-cart/cart-item/PayPal.css'
import PayPalButton from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/PayPalButton';
import ExpressCheckoutVisible from './components/ExpressCheckoutVisible';
import AddCompany from './components/AddCompany';
import InfoDelivery from './components/InfoDelivery';

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

export default function Checkout() {
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

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

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

  const handleCountryChange = (country: string) => {
    setShippingData({
      ...shippingData,
      country,
    });
  };


  useEffect(() => {
    const { firstName, lastName, country, address, city, zip, email, phone } = shippingData;
    if (firstName && lastName && country && address && city && zip && email && phone) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [shippingData]);

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

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.2; 
  const totalAmount = subtotal + subtotal * taxRate; 

  
  const getInputStyles = (error: string) => {
    return `border ${error ? 'border-red-500 bg-red-100 text-red-500 placeholder-red-500' : 'border-[#6F6F6F]'} focus:bg-blue-100 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out`;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSubmitted(false); 
  };
  if (isSubmitted && !isEditing) {
    return (
      <div className='bg-[#F9F9F9] min-h-screen flex flex-col'>
        <div className='md:block hidden'>
          <InfoHeader />  
        </div> 
  
        <div className="flex-grow max-w-[1400px] mx-auto w-full md:px-0 ">
          <div className="w-full lg:w-1/3 md:p-4 md:hidden block p-0 m-0">
            <CheckoutCartHeader />
          </div>
  
          <div className="flex flex-col lg:flex-row justify-center items-start pt-6 flex-grow md:px-0 px-5">
            <div className="w-full max-w-[620px] flex flex-col gap-10 justify-center items-center py-4 mb-6 lg:mb-0">
              <div className="w-full max-w-[520px]">
                <div className="mb-4">
                  <h2 className="font-Heebo-24-- mb-5 text-[#1E1E1E]">When will your order arrive?</h2>
                  <div className="flex items-center justify-between border border-[#1E1E1E] p-5 rounded-[10px] mb-5 h-[56px]">
                    <h3 className="text-[#1E1E1E] font-Heebo-16">Arrives Wed, Oct 22 - Oct 29</h3>
                    <p className="text-[#8C8C8C] font-heebo font-medium text-[14px] leading-[14px]">FREE</p>
                  </div>
                </div>
  
                <div className="w-full lg:w-1/3 md:p-4 pb-10 md:hidden block border-b">
                  <div className="md:py-5">
                    <h1 className="font-Heebo-14 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
                    <ul className="list-disc pl-4">
                      <li className="md:mb-2 mb-[5px] md:font-Heebo-reg-14 font-Heebo-reg-12">
                        <span className='font-Heebo-14-bolt'>Signature: </span>
                        You may need to sign for your delivery.
                      </li>
                      <li className="max-w-[437px] w-full md:font-Heebo-reg-14 font-Heebo-reg-12">
                        <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                        Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                      </li>
                    </ul>
                  </div>
                </div>
  
                <ExpressCheckoutVisible />
  
                {selectedPaymentMethod === 'PayPal' && (
                  <div className="w-full">
                    <PayPalButton totalAmount={totalAmount} />
                  </div>
                )}
  
                <div className="mt-6 flex justify-between items-center mb-10">
                  <h2 className="font-Heebo-bold-20">Shipping Address</h2>
                  <button className="text-[#8C8C8C] font-semibold font-heebo text-[16px] underline" onClick={handleEdit}>Edit</button>
                </div>
  
                <div className='text-[#8C8C8C] font-Heebo-reg-16-0'>
                  <p className='font-Heebo-16 text-[#8C8C8C]'>{shippingData.firstName} {shippingData.lastName}</p>
                  <p>{shippingData.address}, {shippingData.city}, {shippingData.country}, {shippingData.zip}</p>
                  <p className='mt-5'>{shippingData.email}</p>
                  {shippingData.company && (
                    <p>{shippingData.company}</p>
                  )}
                  <p>{shippingData.phone}</p>
                  <p className='border-t border-[#BDBDBD] mt-10 mb-5 h-[1px]'></p>
                </div>
  
                {isPaymentVisible && (
                  <Order items={items} />
                )}
              </div>
            </div>
  
            <div className="w-full lg:w-1/3 md:p-4 md:block hidden">
              <div className="p-4 text-[14px] font-heebo leading-[14px]">
                <h1 className="font-Heebo-16 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
                <ul className="list-disc pl-4 text-[#6F6F6F]">
                  <li className="mb-2 font-Heebo-reg-14">
                    <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Signature: </span>
                    You may need to sign for your delivery.
                  </li>
                  <li className="max-w-[437px] w-full font-Heebo-reg-14 text-[#1E1E1E]">
                    <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                    Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>  
        <FooterCheckout />
      </div>
    );
  }
  
  
  return (
     <div className='bg-[#F9F9F9] min-h-screen flex flex-col'>
       <div className='md:block hidden'>
         <InfoHeader />  
       </div> 
       
       <div className="flex-grow max-w-[1400px] mx-auto w-full">
         <div className="w-full lg:w-1/3 md:p-4 md:hidden block p-0 m-0">
           <CheckoutCartHeader />
         </div>
 
         <div className="flex flex-col lg:flex-row justify-center items-start pt-6 flex-grow md:px-0 px-5">
           <div className="w-full max-w-[620px] flex flex-col gap-10 justify-center items-center py-4 mb-6 lg:mb-0">
             <div className="w-full max-w-[520px]">
               <div className="mb-4">
                 <h2 className="font-Heebo-24-- mb-5 text-[#1E1E1E] md:block hidden">When will your order arrive?</h2>
                 <h2 className="font-Heebo-18-med mb-5 text-[#1E1E1E] md:hidden">When will your order arrive?</h2>
                 <div className="flex items-center justify-between border border-[#1E1E1E] p-5 rounded-[10px] md:mb-10 mb-5 h-[56px]">
                   <h3 className="text-[#1E1E1E] font-Heebo-16">Arrives Wed, Oct 22 - Oct 29</h3>
                   <p className="text-[#8C8C8C] font-heebo font-medium text-[14px] leading-[14px]">FREE</p>
                 </div>
               </div>
 
               <div className="w-full lg:w-1/3 md:p-4 pb-10 md:hidden block border-b">
                 <div className="md:py-5">
                   <h1 className="font-Heebo-14 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
                   <ul className="list-disc pl-4">
                     <li className="md:mb-2 mb-[5px] md:font-Heebo-reg-14 font-Heebo-reg-12">
                       <span className='font-Heebo-14-bolt'>Signature: </span>
                       You may need to sign for your delivery.
                     </li>
                     <li className="max-w-[437px] w-full md:font-Heebo-reg-14 font-Heebo-reg-12">
                       <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                       Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                     </li>
                   </ul>
                 </div>
               </div>
 
               <ExpressCheckoutVisible />
 
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
 
               <div className='mt-10'>
                 <p className='border-b border-[#BDBDBD]'></p>
                 <h1 className='font-Heebo-24-- md:block hidden text-[#BDBDBD] mt-5'>Payment</h1>
                 <h1 className='md:hidden font-Heebo-18-pay text-[#BDBDBD] mt-5'>Payment</h1>
               </div>
             </div>
           </div>
           <InfoDelivery />
         </div>
       </div>
       <FooterCheckout />
     </div>
   );
}
 