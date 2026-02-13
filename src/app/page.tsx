import IntroSection from "../components/landing/about";
import Hero from "../components/landing/hero";
import Header from "../components/layout/header";

export default function Home() {
  return (
    <main>
      <Header />
      
      <Hero />

      <IntroSection />
    </main>
  );
}
