import dynamic from "next/dynamic";
const AboutMe = dynamic(() => import("@/components/HomePage/AboutMe"));
const ContactWithMe = dynamic(() => import("@/components/HomePage/Contact"));
const Expertise = dynamic(() => import("@/components/HomePage/Expertise"));
const HeroSection = dynamic(() => import("@/components/HomePage/HeroSection"));
const Footer = dynamic(() => import("@/components/Sheared/Footer"));
const Header = dynamic(() => import("@/components/Sheared/Header"));


const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Expertise />
      <AboutMe />
      <ContactWithMe />
      <Footer />

      {/* <div className="mb-[100px]"></div> */}
    </div>
  );
};

export default HomePage;
