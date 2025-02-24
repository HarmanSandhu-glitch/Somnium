import PaymentPage from "./Payment";
import { Navbar } from "./components/Navbar";
import EventCards from "./components/EventCards";
import TextSection from "./components/TextSection";
import { ImagesSliderDemo } from "./components/ImageSlider";
import Chat from "./components/Chatbot";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="bg-[#ecebe7]">
      <div className="w-full font-mono  flex items-center justify-center">
        <Navbar />
      </div>
      <div className="flex mb-20 mt-40 flex-col items-center justify-center space-y-4">
        <ImagesSliderDemo />
        <TextSection />
      </div>
      <div className="mt-20 pb-20">
        <EventCards />
      </div>
      <div>
        <PaymentPage />
      </div>
      <div>
        <Chat />
      </div>
      <Footer />
    </div>
  );
}
