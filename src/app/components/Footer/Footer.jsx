import Networking from "./Components/Networking";
import Information from "./Components/Information"; 

const Footer = () => {
    return (
        <div className="relative h-[561px] max-lg:h-auto flex flex-col items-center justify-between py-10 max-md:py-0 max-md:pb-10 bg-[#EBEBF0]">
            <div className="absolute top-4 w-full"></div>
            {/* <div className="relative w-[1536px] max-w-[1300px]">
                <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]"></div>
            </div> */}
            <div className="mt-24 w-full flex flex-col items-center max-lg:mt-10">
                <Information />
                <Networking />
            </div>
        </div>
    );
}

export default Footer;
