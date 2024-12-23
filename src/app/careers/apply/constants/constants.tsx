// ✅ Definirea interfeței pentru PositionData
export interface PositionData {
    title: string;
    subtitle: string;
    location: string;
    team: string;
    workType: string;
    position: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    country: string;
    resumeLabel: string;
    termsText: string;
    applyButton: string;
    termsPolicy1: string;
    termsPolicy2: string;
  }
  
  // ✅ Obiectul de constante
  export const POSITION_DATA: PositionData = {
    title: "CTO (Chief Technology Officer)",
    subtitle: "You Respond To",
    location: "Moldova",
    team: "Marketing and PR",
    workType: "Part Time",
    position: "Volunteer",
    fullName: "Full name",
    email: "Email",
    phoneNumber: "Phone number",
    country: "Country",
    resumeLabel: "CV / Resume (pdf, doc, docx)",
    termsText:
      'By clicking the "Payment" button, you confirm that you have read, understand, and accept our Terms of Sale, Privacy Policy, and ',
    termsPolicy1: "Terms of Sale, Privacy Policy",
    termsPolicy2: "Return Policy",
    applyButton: "Apply",
  };
  