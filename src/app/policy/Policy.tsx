import { Header } from "@/components/layouts/main-layout/header/Header";
import PolicyNavBar from "./components/PolicyNavBar";
import Content from "./components/Content";
import { Footer } from "@/components/layouts/main-layout/footer/Footer";



export default function Policy() {
    return (
        <div className="bg-[#F9F9F9]">
            <Header/>
            <PolicyNavBar/>
            <Footer/>
        </div>
    )
}