import { POSITION_DATA } from "../constants/constants";


export default function Info() {
    return (
        <div className="py-8">
            <p className="text-sm text-neutral-600 mb-4 w-[615px]">By clicking the "Payment" button, you confirm that you have read, understand, and accept our <span className="text-[#0097FF]">Terms of Sale, Privacy Policy</span>, and <span className="text-[#0097FF]">{POSITION_DATA.termsPolicy2}</span></p>
        </div>
    )
}