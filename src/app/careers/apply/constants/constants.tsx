export interface PositionData {
  id: number;
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
  termsPolicy1: string;
  termsPolicy2: string;
  applyButton: string;
}

export const POSITION_DATA: PositionData[] = [
  {
    id: 1,
    title: "Специалист по цифровой рекламе",
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
      'By clicking the "Apply" button, you confirm that you have read, understand, and accept our Terms of Sale, Privacy Policy, and ',
    termsPolicy1: "Terms of Sale, Privacy Policy",
    termsPolicy2: "Return Policy",
    applyButton: "Apply",
  },
  {
    id: 2,
    title: "Specialist în Publicitate Digitală",
    subtitle: "You Respond To",
    location: "Moldova",
    team: "IT Development",
    workType: "Full Time",
    position: "Employee",
    fullName: "Full name",
    email: "Email",
    phoneNumber: "Phone number",
    country: "Country",
    resumeLabel: "CV / Resume (pdf, doc, docx)",
    termsText:
      'By clicking the "Apply" button, you confirm that you have read, understand, and accept our Terms of Sale, Privacy Policy, and ',
    termsPolicy1: "Terms of Sale, Privacy Policy",
    termsPolicy2: "Return Policy",
    applyButton: "Apply",
  },
];
