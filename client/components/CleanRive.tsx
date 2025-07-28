import { useEffect, useRef, useState } from 'react';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';

interface ProblemOverlay {
  id: number;
  title: string;
  description: string;
  visible: boolean;
  type: 'door' | 'water' | 'electricity';
}

export default function CleanRive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<Rive | null>(null);
  const [problems, setProblems] = useState<ProblemOverlay[]>([
    { id: 5, title: 'Problema della Porta', description: 'La porta non si chiude correttamente', visible: false, type: 'door' },
    { id: 6, title: 'Problema dell\'Acqua', description: 'L\'acqua non si scarica bene', visible: false, type: 'water' },
    { id: 7, title: 'Problema Elettrico', description: 'Interruzione dell\'alimentazione', visible: false, type: 'electricity' }
  ]);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log('🍕 Initializing Rive...');
    
    const riveFileUrl = '/untitled.riv';
    
    const riveInstance = new Rive({
      src: riveFileUrl,
      canvas: canvasRef.current,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      autoplay: true,
      onLoad: () => {
        console.log('🇮🇹 Rive loaded!');
        setDebugInfo(prev => [...prev, 'Rive loaded']);
      },
      onLoadError: (error) => {
        console.error('❌ Rive error:', error);
        setDebugInfo(prev => [...prev, `Error: ${error}`]);
      },
    });

    riveInstanceRef.current = riveInstance;

    // STATE CHANGE DEBUGGING
    riveInstance.on('statechange', (event) => {
      console.log('🔄 STATE CHANGE:', event);
      
      if (event && typeof event === 'object') {
        for (const [key, value] of Object.entries(event)) {
          console.log(`📋 ${key}:`, value);
        }
      }

      setDebugInfo(prev => [...prev.slice(-10), `StateChange: ${JSON.stringify(event)}`]);

      // Check for Timeline 5, 6, 7 events
      if (event && typeof event === 'object') {
        const eventName = String(event.name || event.stateName || '');
        
        console.log('🔍 Event name:', eventName);
        
        if (eventName.includes('Timeline 5')) {
          console.log('🚪 Timeline 5 - Door!');
          setProblems(prev => prev.map(p => p.id === 5 ? { ...p, visible: true } : p));
        } else if (eventName.includes('Timeline 6')) {
          console.log('💧 Timeline 6 - Water!');
          setProblems(prev => prev.map(p => p.id === 6 ? { ...p, visible: true } : p));
        } else if (eventName.includes('Timeline 7')) {
          console.log('⚡ Timeline 7 - Electricity!');
          setProblems(prev => prev.map(p => p.id === 7 ? { ...p, visible: true } : p));
        }
      }
    });

    // Touch support
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      console.log('👆 Touch detected');
    };

    canvasRef.current.addEventListener('touchstart', handleTouch, { passive: false });
    canvasRef.current.addEventListener('touchend', handleTouch, { passive: false });

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('touchstart', handleTouch);
        canvasRef.current.removeEventListener('touchend', handleTouch);
      }
    };
  }, []);

  const closeProblem = (id: number) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, visible: false } : p));
  };

  const getItalianColors = (type: string) => {
    switch (type) {
      case 'door': return 'from-green-500 to-green-700';
      case 'water': return 'from-white to-gray-100';
      case 'electricity': return 'from-red-500 to-red-700';
      default: return 'from-green-500 to-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
        🍕 Lavatrice Interattiva 🇮🇹
      </h1>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-4 border-gray-300 rounded-lg shadow-2xl"
          style={{
            width: '60vw',
            maxWidth: '600px',
            height: '60vw',
            maxHeight: '600px',
          }}
          width={1600}
          height={1600}
        />

        {problems.map((problem) => (
          problem.visible && (
            <div
              key={problem.id}
              className={`absolute top-4 left-4 right-4 bg-gradient-to-r ${getItalianColors(problem.type)} 
                         p-6 rounded-lg shadow-xl z-10 spring-animation`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-base opacity-90">{problem.description}</p>
                </div>
                <button
                  onClick={() => closeProblem(problem.id)}
                  className="text-white hover:text-gray-200 text-2xl font-bold touch-button"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      <details className="mt-8 bg-gray-100 p-4 rounded-lg max-w-2xl w-full">
        <summary className="font-bold cursor-pointer" style={{ fontFamily: 'Georgia, serif' }}>
          🔧 Debug События
        </summary>
        <div className="mt-4 text-xs font-mono max-h-40 overflow-y-auto">
          {debugInfo.map((info, index) => (
            <div key={index} className="border-b border-gray-200 py-1">
              {info}
            </div>
          ))}
        </div>
      </details>

      <p className="mt-4 text-center text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
        👆 Tocca per attivare Timeline 5, 6, 7
      </p>
    </div>
  );
}
