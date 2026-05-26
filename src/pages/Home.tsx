import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import VisualsStrip from "../components/VisualsStrip";
import DjCourseTeaser from "../components/DjCourseTeaser";
import InstagramFeed from "../components/InstagramFeed";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <VisualsStrip />
      <DjCourseTeaser />
      <InstagramFeed />
    </PageTransition>
  );
}
