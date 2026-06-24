import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import VisualsStrip from "../components/VisualsStrip";
import DjCourseTeaser from "../components/DjCourseTeaser";
// Instagram feed hidden until the account is connected to Behold.
// import InstagramFeed from "../components/InstagramFeed";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <VisualsStrip />
      <DjCourseTeaser />
      {/* <InstagramFeed /> */}
    </PageTransition>
  );
}
