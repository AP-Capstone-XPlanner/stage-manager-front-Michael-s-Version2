import { Scene3D } from './components/scene/Scene3D';
import { Sidebar } from './components/ui/Sidebar';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import './App.css';

function App() {
  useKeyboardShortcuts();

  return (
    <div className="app">
      <Sidebar />
      <main className="viewport">
        <Scene3D />
        <div className="viewport-badge">3D Preview</div>
      </main>
    </div>
  );
}

export default App;
