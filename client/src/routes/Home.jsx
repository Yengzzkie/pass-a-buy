import GlobeDemo from "../components/Globe";
import ShuffleHero from "../components/HeroSample";
import TextParallaxContentExample from "../components/HeroSample2";

function Home() {
  return (
    <div className="relative min-h-[90vh] bg-[#fff9e0] h-full overflow-hidden">
      <GlobeDemo />
      <ShuffleHero />
      <TextParallaxContentExample />
    </div>
  );
}

export default Home;
