import { useState, useEffect, Suspense } from 'react';
import { Footer } from './Footer';
import HeroSection from './mainsection/HeroSection';
import { MainSection } from './mainsection/mainsecion';
import { ErrorBoundary } from 'react-error-boundary';

export const LandingPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <Suspense
      fallback={
        <div role="alert" aria-busy="true" className="loading-state">
          Loading...
        </div>
      }
    >
      <ErrorBoundary
        fallback={
          <div role="alert" className="error-state">
            Something went wrong. Please try again.
          </div>
        }
      >
        <div className="min-h-screen flex flex-col bg-gray-900">
          <header>
            <HeroSection fontLoaded={fontLoaded} />
          </header>

          <main>
            <article>
              <MainSection />
            </article>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};
