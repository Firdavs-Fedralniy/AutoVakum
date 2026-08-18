import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import BeforeAfter from "../../components/BeforeAfter/BeforeAfter";
import Gallery from "../../components/Gallery/Gallery";
import Reviews from "../../components/Reviews/Review";
import Contacts from "../../components/Contacts/Contacts";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <BeforeAfter />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}

export default Home;