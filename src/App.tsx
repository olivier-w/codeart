import { useEffect } from 'react';
import { Canvas } from './components/Canvas/Canvas';
import { ControlPanel } from './components/Controls/ControlPanel';
import { CodeEditor } from './components/Editor/CodeEditor';
import { Header } from './components/Header';
import { useStore } from './hooks/useStore';

function App() {
  const mode = useStore((state) => state.mode);
  const loadPresetsFromStorage = useStore((state) => state.loadPresetsFromStorage);
  const randomizeSeed = useStore((state) => state.randomizeSeed);

  useEffect(() => {
    loadPresetsFromStorage();
  }, [loadPresetsFromStorage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        randomizeSeed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [randomizeSeed]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#09090b]">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {mode === 'visual' ? (
          <>
            <Canvas />
            <ControlPanel />
          </>
        ) : (
          <>
            <div className="flex-1 min-w-0 flex">
              <div className="w-1/2 border-r border-white/[0.04]">
                <CodeEditor />
              </div>
              <div className="w-1/2">
                <Canvas />
              </div>
            </div>
            <ControlPanel />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
