import { useEffect, useRef, useState } from 'react';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';
import WashingMachine from './WashingMachine';

interface ProblemOverlay {
  id: number;
  title: string;
  description: string;
  visible: boolean;
  type: 'door' | 'water' | 'electricity';
}

export default function RiveInteractive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<Rive | null>(null);
  const [useRive, setUseRive] = useState(true);
  const [riveLoaded, setRiveLoaded] = useState(false);
  const [washingMachineRunning, setWashingMachineRunning] = useState(false);
  const [problems, setProblems] = useState<ProblemOverlay[]>([
    { id: 5, title: 'Problema della Porta', description: 'La porta non si chiude correttamente', visible: false, type: 'door' },
    { id: 6, title: 'Problema dell\'Acqua', description: 'L\'acqua non si scarica bene', visible: false, type: 'water' },
    { id: 7, title: 'Problema Elettrico', description: 'Interruzione dell\'alimentazione', visible: false, type: 'electricity' }
  ]);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    if (!canvasRef.current || !useRive) return;

    console.log('🍕 Initializing Rive application...');
    
    // Use the provided Rive file URL
    const riveFileUrl = 'https://cdn.builder.io/o/assets%2F44fc5594513c45f09bca42145600622d%2F311df0dbc1a54f2c9bb8de4eac932faa?alt=media&token=cb5f26de-4846-420f-8484-3f8638cf3ea4&apiKey=44fc5594513c45f09bca42145600622d';
    
    const riveInstance = new Rive({
      src: riveFileUrl,
      canvas: canvasRef.current,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      autoplay: true,
      onLoad: () => {
        console.log('🇮🇹 Rive loaded successfully!');
        setRiveLoaded(true);
        setDebugInfo(prev => [...prev, 'Rive loaded successfully']);
      },
      onLoadError: (error) => {
        console.error('❌ Rive load error:', error);
        setDebugInfo(prev => [...prev, `Load error: ${error}`]);
        // Fall back to original washing machine
        setUseRive(false);
      },
    });

    riveInstanceRef.current = riveInstance;

    // Add comprehensive state change debugging
    riveInstance.on('statechange', (event) => {
      console.log('🔄 FULL STATE CHANGE EVENT:', {
        event,
        type: typeof event,
        keys: Object.keys(event || {}),
        data: event
      });

      // Log all properties of the event
      if (event && typeof event === 'object') {
        for (const [key, value] of Object.entries(event)) {
          console.log(`  📋 ${key}:`, value);
        }
      }

      setDebugInfo(prev => [...prev.slice(-15), `StateChange: ${JSON.stringify(event)}`]);

      // Check for Timeline events (EXACTLY as specified - capital T Timeline)
      if (event && typeof event === 'object') {
        const eventStr = String(event.name || event.stateName || '');
        
        console.log('🔍 Checking event name:', eventStr);
        
        // Look for Timeline 5, 6, 7 events (with capital T)
        if (eventStr.includes('Timeline 5')) {
          console.log('🚪 Timeline 5 triggered - Door problem!');
          setProblems(prev => prev.map(p => p.id === 5 ? { ...p, visible: true } : p));
        } else if (eventStr.includes('Timeline 6')) {
          console.log('💧 Timeline 6 triggered - Water problem!');
          setProblems(prev => prev.map(p => p.id === 6 ? { ...p, visible: true } : p));
        } else if (eventStr.includes('Timeline 7')) {
          console.log('⚡ Timeline 7 triggered - Electricity problem!');
          setProblems(prev => prev.map(p => p.id === 7 ? { ...p, visible: true } : p));
        }
      }
    });

    // Add touch event support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      console.log('👆 Touch start detected');
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      console.log('👆 Touch end detected');
      e.preventDefault();
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvasRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('touchstart', handleTouchStart);
        canvasRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [useRive]);

  const closeProblem = (id: number) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, visible: false } : p));
  };

  const getItalianColors = (type: string) => {
    switch (type) {
      case 'door': return 'from-green-500 to-green-700'; // Green from Italian flag
      case 'water': return 'from-white to-gray-100'; // White from Italian flag  
      case 'electricity': return 'from-red-500 to-red-700'; // Red from Italian flag
      default: return 'from-green-500 to-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 rive-container">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
        🍕 Lavatrice Interattiva 🇮🇹
      </h1>

      {/* Toggle Button */}
      <div className="mb-4">
        <button
          onClick={() => setUseRive(!useRive)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-red-500 text-white rounded-lg font-bold"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {useRive ? '🎮 Usa Originale' : '🎯 Usa Rive'}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative">
        {useRive ? (
          <>
            {/* Rive Canvas */}
            <canvas
              ref={canvasRef}
              className="rive-canvas border-4 border-gray-300 rounded-lg shadow-2xl"
              width={1600}
              height={1600}
            />
            {!riveLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p style={{ fontFamily: 'Georgia, serif' }}>Caricamento Rive...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Original Washing Machine */
          <div className="flex flex-col items-center">
            <WashingMachine
              isRunning={washingMachineRunning}
              onToggle={() => setWashingMachineRunning(!washingMachineRunning)}
            />
            <p className="mt-4 text-center text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
              🔄 Clicca la manopola per avviare/fermare
            </p>
          </div>
        )}

        {/* Problem Overlays */}
        {problems.map((problem) => (
          problem.visible && (
            <div
              key={problem.id}
              className={`absolute mobile-overlay top-4 left-4 right-4 bg-gradient-to-r ${getItalianColors(problem.type)} 
                         p-4 md:p-6 rounded-lg shadow-xl transform transition-all duration-500 
                         spring-animation z-10`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <h3 className="mobile-title text-lg md:text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="mobile-text text-sm md:text-base opacity-90">{problem.description}</p>
                </div>
                <button
                  onClick={() => closeProblem(problem.id)}
                  className="text-white hover:text-gray-200 text-xl md:text-2xl font-bold touch-button"
                  aria-label="Chiudi"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Debug Information */}
      <div className="mt-8 w-full max-w-2xl">
        <details className="bg-gray-100 p-4 rounded-lg">
          <summary className="font-bold cursor-pointer" style={{ fontFamily: 'Georgia, serif' }}>
            🔧 Debug Information (События Rive)
          </summary>
          <div className="mt-4 text-xs font-mono max-h-40 overflow-y-auto">
            {debugInfo.map((info, index) => (
              <div key={index} className="border-b border-gray-200 py-1">
                {info}
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Instructions */}
      <div className="mt-8 max-w-2xl text-center">
        <p className="text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
          👆 {useRive ? 'Tocca il Rive per attivare eventi Timeline' : 'Clicca la manopola per testare'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          🎯 Timeline 5 = Porta | Timeline 6 = Acqua | Timeline 7 = Elettricità
        </p>
        {useRive && (
          <p className="text-xs text-gray-400 mt-2">
            Rive URL: {riveLoaded ? '✅ Caricato' : '⏳ Caricamento...'}
          </p>
        )}
      </div>
    </div>
  );
}
