'use client';
import Image from 'next/image';
import { contentData, ContentItem } from '../constants/contentData';
import type { Content } from '../constants/contentData';
import Link from 'next/link';

type ContentKeys = keyof typeof contentData;

interface ContentProps {
    activeButton: ContentKeys;
}

export default function ContentComponent({ activeButton }: ContentProps) {
    const currentContent: ContentItem = contentData[activeButton];

    return (
        <div className="md:mt-5 p-5 border border-transparent w-full max-w-2xl bg-transparent text-[#1E1E1E] md:text-center text-start font-heebo ">
            <h1 className="text-4xl font-bold md:text-center text-start mb-4 leading-[1]">{currentContent.title}</h1>
            {currentContent.lastUpdated && (
                <p className="md:text-center text-start text-[16px] text-[#575757] mb-6 leading-[1]">{currentContent.lastUpdated}</p>
            )}


            {currentContent.subtitle && (
                <p className="md:text-center text-start text-[16px] text-[#575757] mb-8 leading-[1]">
                    {currentContent.subtitle}
                </p>
            )}

            <div className='flex items-center justify-center md:mb-10 md:mt-5'>
                <Image src="/images/policy.svg" alt='image' width={40} height={58} className='md:w-10 md:h-[58px] w-[26px] h-[38px]'/>
            </div>

            {currentContent.information.map((info, index) => (
                <div key={index} className="mb-8">
                    <h2 className="md:text-[26px] text-[24px] font-semibold mb-5 text-[#1E1E1E]">{info.heading}</h2>
                    <p className="text-md mb-1 text-[#575757]">
                        <strong className='text-[#1E1E1E] leading-[1]'>{info.title}</strong> {info.content}
                    </p>
                    {info.subtitle && (
                        <p className="text-md text-[#575757]">
                            <strong className='text-[#1E1E1E]'>{info.subtitle}</strong> {info.subContent}
                        </p>
                    )}
                </div>
            ))}

            {currentContent.useOfData.map((use, index) => (
                <div key={index} className="mb-8">
                    <h2 className="md:text-[26px] text-[24px] font-semibold mb-5 text-[#1E1E1E] leading-[1]">{use.title}</h2>
                    <p className="text-[16px] mb-5 text-[#1E1E1E]">{use.subtitle}</p>
                    <ul className="list-inside text-[16px] text-[#575757] space-y-[10px]">
                        <li>{use.subContent1}</li>
                        <li>{use.subContent2}</li>
                        <li>{use.subContent3}</li>
                        <li>{use.subContent4}</li>
                        <li>{use.subContent5}</li>
                        <li>{use.subContent6}</li>
                    </ul>
                </div>
            ))}

            {([
                { key: 'security', label: 'Data Protection and Security' },
                { key: 'retention', label: 'Data Retention' },
                { key: 'sharingOfData', label: 'Sharing of Data' },
                { key: 'cookies', label: 'Cookies' },
                { key: 'yourRights', label: 'Your Rights' },
                { key: 'changesPrivacyPolicy', label: 'Changes to This Privacy Policy' },
            ] as const).map((section) => {
                const contentArray = currentContent[section.key as keyof ContentItem] as Content[] | undefined;

                return contentArray?.map((content, index) => (
                    <div key={index} className="mb-10 text-[#1E1E1E]">
                        <h2 className="md:text-[26px] text-[24px] font-semibold mb-5 leading-[1]">{content.title}</h2>
                        <p className="text-[16px]">{content.content}</p>
                    </div>
                ));
            })}

            {currentContent.contactUs?.map((contact, index) => (
                <div key={index} className="mt-8 md:text-center text-start">
                    <h2 className="md:text-[26px] text-[24px] font-semibold mb-5">{contact.title}</h2>
                    <p className="text-[16px] font-ekMukta mb-[10px]">{contact.content}</p>
                    <p className="text-[16px] font-ekMukta text-[#575757] mb-[10px]">{contact.companyName}</p>
                    <p className="text-[16px] font-ekMukta text-[#575757] mb-[10px]">{contact.location}</p>
                    <p className="text-[16px] font-ekMukta text-[#575757]">
                        <Link href={`mailto:${contact.email}`} className="">
                            {contact.email}
                        </Link>
                    </p>
                </div>
            ))}
        </div>
    );
}
