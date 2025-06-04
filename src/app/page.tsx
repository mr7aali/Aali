// import Expertise2 from "@/components/HomePage/Expertise2";
// "use client";
import Project from "@/components/HomePage/Project";
import SectionDevider from "@/components/Sheared/Devider";
import dynamic from "next/dynamic";
import LoadingPage from "./loading";
const AboutMe = dynamic(() => import("@/components/HomePage/AboutMe"), {
  loading: () => <LoadingPage />,
  ssr: false,
});
const ContactWithMe = dynamic(() => import("@/components/HomePage/Contact"), {
  loading: () => <LoadingPage />,
  ssr: false,
});
const Expertise = dynamic(() => import("@/components/HomePage/Expertise"), {
  loading: () => <LoadingPage />,
  ssr: false,
});
const HeroSection = dynamic(() => import("@/components/HomePage/HeroSection"), {
  loading: () => <LoadingPage />,
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Sheared/Footer"), {
  loading: () => <LoadingPage />,
  ssr: false,
});
const Header = dynamic(() => import("@/components/Sheared/Header"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

const HomePage = () => {
  return (
    <div>
      <Header />

      <HeroSection />
      <SectionDevider />
      <AboutMe />
      <SectionDevider />
      <Expertise />
      <SectionDevider />
      <Project />
      <SectionDevider />
      <ContactWithMe />

      <Footer />

      {/* <div className="mb-[100px]"></div> */}
    </div>
  );
};

export default HomePage;
