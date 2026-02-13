import Hero from "../components/landing/hero";
import Story from "../components/landing/story";
import Works from "../components/landing/works";
import Header from "../components/layout/header";

export default function Home() {
  return (
    <main>
      <Header />

      <Hero />

      <Story />

      <Works />
    </main>
  );
}
