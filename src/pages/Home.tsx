import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import VisualsStrip from "../components/VisualsStrip";
import InstagramFeed from "../components/InstagramFeed";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <VisualsStrip />
      <InstagramFeed />
    </PageTransition>
  );
}
