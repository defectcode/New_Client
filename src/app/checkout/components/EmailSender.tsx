import emailjs from 'emailjs-com';

interface EmailData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  products: string;
  terms: string;
  status: string;
}

interface EmailSenderProps {
  emailData: EmailData;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export const EmailSender: React.FC<EmailSenderProps> = ({ emailData, onSuccess, onError }) => {
  const sendEmail = async () => {
    try {
      await emailjs.send(
        '8WNh8q5fJwjrpO4hD', 
        'JZUFiHA7X8XJpEdxJxfVV',
        {
          ...emailData,
          message: `Order Details: Shipping address - ${emailData.address}, ${emailData.city}, ${emailData.zip}, ${emailData.country}`,
        },
        'YOUR_USER_ID'
      );
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return null;
};
