export type ContentSection = {
    heading?: string;
    title?: string;
    content?: string;
    subtitle?: string;
    subContent?: string;
};

export type useOfData = {
    title?: string;
    subtitle?: string;
    subContent1?: string;
    subContent2?: string;
    subContent3?: string;
    subContent4?: string;
    subContent5?: string;
    subContent6?: string;
};

export type Content = {
    title: string;
    content: string;
};



export type ContactUs = {
    title: string;
    content: string;
    companyName: string;
    location: string;
    email: string;
}


export type ContentItem = {
    title: string;
    subtitle?: string;
    lastUpdated?: string; 
    contact?: string; 
    information: ContentSection[];
    useOfData: useOfData[];
    security: Content[];
    retention: Content[];
    sharingOfData: Content[];
    cookies: Content[];
    yourRights: Content[];
    changesPrivacyPolicy: Content[];
    contactUs: ContactUs[];
};

export const contentData: Record<string, ContentItem> = {

    privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: 12.03.2024",
        subtitle: `HAPPY LIFE GLOBAL S.R.L. ("we", "us", "our") operates the website paradiseproblems.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data`,
        contact: `
            Company Name: HAPPY LIFE GLOBAL S.R.L.
            Address: Str. Mihai Eminescu, Nr.120, Bl.02, Sc.1, Et.2, Ap.3, Sector 2, Bucharest
            Email: valery@life.com
        `,
        information: [
            {
                heading: "Information We Collect",
                title: "Personal Identification Information:",
                content: "Name, email address, phone number, and any other information you provide directly through forms on our Site",
                subtitle: "Usage Data:",
                subContent: "Information on how our Site is accessed and used, such as your IP address, browser type, and device information",

            }
        ],
        useOfData: [
            {
                title: "Use of data",
                subtitle: "HAPPY LIFE GLOBAL S.R.L. uses the collected data for various purposes:",
                subContent1: "To provide and maintain our services",
                subContent2: "To notify you about updates to our site",
                subContent3: "To allow toy to participate in interactive features when you shoose to do so",
                subContent4: "To provide customer support",
                subContent5: "To detect, prevent, and address technical issues",
                subContent6: "To communicate with you about your crowdfunding contributes",
            }
        ],
        
        security: [
            {
                title: "Data Protection and Security",
                content: "We are committed to ensuring that your information is secure. We use a variety of security measures, including encryption and access controls, to protect your personal data. However, no method of transmission over the internet is 100% secure"
            }
        ],

        retention: [
            {
                title: "Data Retention",
                content: "We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law"
            }
        ],

        sharingOfData: [
            {
                title: "Sharing of Data",
                content: "We do not sell or rent your personal information to third parties. We may share data with trusted third-party service providers who help us operate our Site, as long as those parties agree to keep this information confidential",
            }
        ],

        cookies: [
            {
                title: "Cookies",
                content: "Our Site uses cookies to enhance your experience. Cookies are small files that are stored on your browser or device. You can manage your cookie preferences through your browser settings",
            }
        ],

        yourRights: [
            {
                title: "Your Rights",
                content: "You have the right to access, update, and request deletion of your personal data. You can also withdraw consent for data processing at any time by contacting us at valery@fyne.com",
            }
        ],

        changesPrivacyPolicy: [
            {
                title: "Changes to This Privacy Policy",
                content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated 'Last updated' date",
            }
        ],

        contactUs: [
            {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us:",
                companyName: "Company Name: HAPPY LIFE GLOBAL S.R.L.",
                location: "Address: Sos. Mihai Bravu, nr. 122, bl. D27, sc. 1, et. 2, ap. 6, Sector 2, Bucharest",
                email: "Email: valery@fyne.com",
            }
        ]

    },

    faq: {
        title: "FAQ",
        lastUpdated: "Last updated: 12.03.2024",
        subtitle: `HAPPY LIFE GLOBAL S.R.L. ("we", "us", "our") operates the website paradiseproblems.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.`,
        contact: `
            Company Name: HAPPY LIFE GLOBAL S.R.L.
            Address: Str. Mihai Eminescu, Nr.120, Bl.02, Sc.1, Et.2, Ap.3, Sector 2, Bucharest
            Email: valery@life.com
        `,
        information: [
            {
                heading: "Information We Collect",
                title: "Personal Identification Information:",
                content: "Name, email address, phone number, and any other information you provide directly through forms on our Site",
                subtitle: "Usage Data:",
                subContent: "Information on how our Site is accessed and used, such as your IP address, browser type, and device information",

            }
        ],
        useOfData: [
            {
                title: "Use of data",
                subtitle: "HAPPY LIFE GLOBAL S.R.L. uses the collected data for various purposes:",
                subContent1: "To provide and maintain our services",
                subContent2: "To notify you about updates to our site",
                subContent3: "To allow toy to participate in interactive features when you shoose to do so",
                subContent4: "To provide customer support",
                subContent5: "To detect, prevent, and address technical issues",
                subContent6: "To communicate with you about your crowdfunding contributes",
            }
        ],
        
        security: [
            {
                title: "Data Protection and Security",
                content: "We are committed to ensuring that your information is secure. We use a variety of security measures, including encryption and access controls, to protect your personal data. However, no method of transmission over the internet is 100% secure"
            }
        ],

        retention: [
            {
                title: "Data Retention",
                content: "We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law"
            }
        ],

        sharingOfData: [
            {
                title: "Sharing of Data",
                content: "We do not sell or rent your personal information to third parties. We may share data with trusted third-party service providers who help us operate our Site, as long as those parties agree to keep this information confidential",
            }
        ],

        cookies: [
            {
                title: "Cookies",
                content: "Our Site uses cookies to enhance your experience. Cookies are small files that are stored on your browser or device. You can manage your cookie preferences through your browser settings",
            }
        ],

        yourRights: [
            {
                title: "Your Rights",
                content: "You have the right to access, update, and request deletion of your personal data. You can also withdraw consent for data processing at any time by contacting us at valery@fyne.com",
            }
        ],

        changesPrivacyPolicy: [
            {
                title: "Changes to This Privacy Policy",
                content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated 'Last updated' date",
            }
        ],

        contactUs: [
            {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us:",
                companyName: "Company Name: HAPPY LIFE GLOBAL S.R.L.",
                location: "Address: Sos. Mihai Bravu, nr. 122, bl. D27, sc. 1, et. 2, ap. 6, Sector 2, Bucharest",
                email: "Email: valery@fyne.com",
            }
        ]

    },

    return: {
        title: "Return",
        lastUpdated: "Last updated: 12.03.2024",
        subtitle: `HAPPY LIFE GLOBAL S.R.L. ("we", "us", "our") operates the website paradiseproblems.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.`,
        contact: `
            Company Name: HAPPY LIFE GLOBAL S.R.L.
            Address: Str. Mihai Eminescu, Nr.120, Bl.02, Sc.1, Et.2, Ap.3, Sector 2, Bucharest
            Email: valery@life.com
        `,
        information: [
            {
                heading: "Information We Collect",
                title: "Personal Identification Information:",
                content: "Name, email address, phone number, and any other information you provide directly through forms on our Site",
                subtitle: "Usage Data:",
                subContent: "Information on how our Site is accessed and used, such as your IP address, browser type, and device information",

            }
        ],
        useOfData: [
            {
                title: "Use of data",
                subtitle: "HAPPY LIFE GLOBAL S.R.L. uses the collected data for various purposes:",
                subContent1: "To provide and maintain our services",
                subContent2: "To notify you about updates to our site",
                subContent3: "To allow toy to participate in interactive features when you shoose to do so",
                subContent4: "To provide customer support",
                subContent5: "To detect, prevent, and address technical issues",
                subContent6: "To communicate with you about your crowdfunding contributes",
            }
        ],
        
        security: [
            {
                title: "Data Protection and Security",
                content: "We are committed to ensuring that your information is secure. We use a variety of security measures, including encryption and access controls, to protect your personal data. However, no method of transmission over the internet is 100% secure"
            }
        ],

        retention: [
            {
                title: "Data Retention",
                content: "We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law"
            }
        ],

        sharingOfData: [
            {
                title: "Sharing of Data",
                content: "We do not sell or rent your personal information to third parties. We may share data with trusted third-party service providers who help us operate our Site, as long as those parties agree to keep this information confidential",
            }
        ],

        cookies: [
            {
                title: "Cookies",
                content: "Our Site uses cookies to enhance your experience. Cookies are small files that are stored on your browser or device. You can manage your cookie preferences through your browser settings",
            }
        ],

        yourRights: [
            {
                title: "Your Rights",
                content: "You have the right to access, update, and request deletion of your personal data. You can also withdraw consent for data processing at any time by contacting us at valery@fyne.com",
            }
        ],

        changesPrivacyPolicy: [
            {
                title: "Changes to This Privacy Policy",
                content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated 'Last updated' date",
            }
        ],

        contactUs: [
            {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us:",
                companyName: "Company Name: HAPPY LIFE GLOBAL S.R.L.",
                location: "Address: Sos. Mihai Bravu, nr. 122, bl. D27, sc. 1, et. 2, ap. 6, Sector 2, Bucharest",
                email: "Email: valery@fyne.com",
            }
        ]

    },


    terms: {
        title: "Terms",
        lastUpdated: "Last updated: 12.03.2024",
        subtitle: `HAPPY LIFE GLOBAL S.R.L. ("we", "us", "our") operates the website paradiseproblems.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.`,
        contact: `
            Company Name: HAPPY LIFE GLOBAL S.R.L.
            Address: Str. Mihai Eminescu, Nr.120, Bl.02, Sc.1, Et.2, Ap.3, Sector 2, Bucharest
            Email: valery@life.com
        `,
        information: [
            {
                heading: "Information We Collect",
                title: "Personal Identification Information:",
                content: "Name, email address, phone number, and any other information you provide directly through forms on our Site",
                subtitle: "Usage Data:",
                subContent: "Information on how our Site is accessed and used, such as your IP address, browser type, and device information",

            }
        ],
        useOfData: [
            {
                title: "Use of data",
                subtitle: "HAPPY LIFE GLOBAL S.R.L. uses the collected data for various purposes:",
                subContent1: "To provide and maintain our services",
                subContent2: "To notify you about updates to our site",
                subContent3: "To allow toy to participate in interactive features when you shoose to do so",
                subContent4: "To provide customer support",
                subContent5: "To detect, prevent, and address technical issues",
                subContent6: "To communicate with you about your crowdfunding contributes",
            }
        ],
        
        security: [
            {
                title: "Data Protection and Security",
                content: "We are committed to ensuring that your information is secure. We use a variety of security measures, including encryption and access controls, to protect your personal data. However, no method of transmission over the internet is 100% secure"
            }
        ],

        retention: [
            {
                title: "Data Retention",
                content: "We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law"
            }
        ],

        sharingOfData: [
            {
                title: "Sharing of Data",
                content: "We do not sell or rent your personal information to third parties. We may share data with trusted third-party service providers who help us operate our Site, as long as those parties agree to keep this information confidential",
            }
        ],

        cookies: [
            {
                title: "Cookies",
                content: "Our Site uses cookies to enhance your experience. Cookies are small files that are stored on your browser or device. You can manage your cookie preferences through your browser settings",
            }
        ],

        yourRights: [
            {
                title: "Your Rights",
                content: "You have the right to access, update, and request deletion of your personal data. You can also withdraw consent for data processing at any time by contacting us at valery@fyne.com",
            }
        ],

        changesPrivacyPolicy: [
            {
                title: "Changes to This Privacy Policy",
                content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated 'Last updated' date",
            }
        ],

        contactUs: [
            {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us:",
                companyName: "Company Name: HAPPY LIFE GLOBAL S.R.L.",
                location: "Address: Sos. Mihai Bravu, nr. 122, bl. D27, sc. 1, et. 2, ap. 6, Sector 2, Bucharest",
                email: "Email: valery@fyne.com",
            }
        ]

    },
};
