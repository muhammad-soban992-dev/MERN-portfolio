import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../context/ThemeContext';
import useMode from '../hooks/useMode';
import { profileApi, expertiseApi, skillsApi, highlightsApi, educationApi, projectsApi } from '../api';
import useFetch from '../hooks/useFetch';
import { initReveal } from '../utils/reveal';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hud from '../components/layout/Hud';
const Scene3D = lazy(() => import('../components/dolls/Scene3D'));
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Expertise from '../components/sections/Expertise';
import Skills from '../components/sections/Skills';
import Highlights from '../components/sections/Highlights';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { mode, setMode } = useMode();
  const [hud, setHud] = useState({ label: 'Intro', progress: 0 });
  const profile = useFetch(profileApi.get, []);
  const expertise = useFetch(expertiseApi.list, []);
  const skills = useFetch(skillsApi.list, []);
  const highlights = useFetch(highlightsApi.list, []);
  const education = useFetch(educationApi.list, []);
  const projects = useFetch(projectsApi.list, []);
  useEffect(() => { const cleanup = initReveal(); return cleanup; }, [profile.data, expertise.data, skills.data, highlights.data, education.data, projects.data]);
  return (
    <>
      <Helmet>
        <title>Sheeza Ansar — Portfolio</title>
        <meta name="description" content="Sheeza Ansar — BS Software Engineering graduate. Portfolio of academic results, web and mobile development coursework, UI/UX and software quality engineering." />
        <meta property="og:title" content="Sheeza Ansar — Portfolio" />
        <meta property="og:description" content="BS Software Engineering graduate (CGPA 3.45) — web, mobile, UI/UX and software quality." />
        <meta property="og:type" content="website" />
      </Helmet>
      {mode === '3d' && (
        <Suspense fallback={null}>
          <Scene3D mode={mode} theme={theme} onSection={(label, progress) => setHud({ label, progress })} />
        </Suspense>
      )}
      <Navbar mode={mode} onModeChange={setMode} />
      <Hero profile={profile.data} loading={profile.loading} error={profile.error} onRetry={profile.retry} />
      <main>
        <About profile={profile.data} loading={profile.loading} error={profile.error} onRetry={profile.retry} />
        <Expertise items={expertise.data} loading={expertise.loading} error={expertise.error} onRetry={expertise.retry} />
        <Skills items={skills.data} loading={skills.loading} error={skills.error} onRetry={skills.retry} />
        <Highlights items={highlights.data} loading={highlights.loading} error={highlights.error} onRetry={highlights.retry} />
        <Projects items={projects.data} loading={projects.loading} error={projects.error} onRetry={projects.retry} />
        <Education items={education.data} loading={education.loading} error={education.error} onRetry={education.retry} />
        <Contact />
      </main>
      <Footer />
      {mode === '3d' && <Hud label={hud.label} progress={hud.progress} />}
    </>
  );
}
