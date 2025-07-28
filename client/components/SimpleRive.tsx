import { useEffect, useRef, useState } from 'react';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';
import EnhancedModal from './EnhancedModal';

interface ProblemData {
  title: string;
  description: string;
  color: string;
}

export default function SimpleRive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<Rive | null>(null);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const problemsData: Record<number, ProblemData> = {
    1: {
      title: "🚪 Проблема с дверцей",
      description: "Дверца не открывается или не закрывается",
      color: "from-red-500 to-red-700"
    },
    2: {
      title: "💧 Проблема с водой",
      description: "Не набирает воду или не сливает",
      color: "from-blue-500 to-blue-700"
    },
    3: {
      title: "⚡ Проблема с отжимом",
      description: "Не отжимает белье или плохо отжимает",
      color: "from-green-500 to-green-700"
    },
    4: {
      title: "🔇 Проблема с шумом",
      description: "Машина издает странные звуки",
      color: "from-purple-500 to-purple-700"
    },
    5: {
      title: "🌡️ Проблема с нагревом",
      description: "Вода не нагревается или перегревается",
      color: "from-orange-500 to-orange-700"
    },
    6: {
      title: "⏰ Проблема с программами",
      description: "Программы не запускаются или зависают",
      color: "from-indigo-500 to-indigo-700"
    }
  };

  const openProblemOverlay = (problemId: number) => {
    console.log(`🔧 Opening problem ${problemId} overlay`);
    setActiveModal(problemId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const riveInstance = new Rive({
      src: '/untitled.riv',
      canvas: canvasRef.current,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      autoplay: true,
      stateMachines: 'State Machine 1',
      onLoad: () => {
        console.log('🎯 Rive загружен с state machine');
      },
      onLoadError: (error) => {
        console.error('❌ Ошибка загрузки Rive:', error);
      },
    });

    riveInstanceRef.current = riveInstance;

    // МАКСИМАЛЬНО ПОДРОБНАЯ ОТЛАДКА statechange событий
    riveInstance.on('statechange', (event) => {
      console.log('🚨 ===== RIVE STATECHANGE EVENT START =====');
      console.log('🔄 Raw event:', event);
      console.log('🔄 Event type:', typeof event);
      console.log('🔄 Event constructor:', event?.constructor?.name);
      console.log('🔄 Event is array:', Array.isArray(event));

      if (event) {
        console.log('🔄 Event keys:', Object.keys(event));
        console.log('🔄 Event values:', Object.values(event));
        console.log('🔄 Event entries:', Object.entries(event));
      }

      // Проверяем все возможные свойства
      if (event && typeof event === 'object') {
        console.log('📋 event.name:', event.name);
        console.log('📋 event.stateName:', event.stateName);
        console.log('📋 event.state:', event.state);
        console.log('📋 event.data:', event.data);
        console.log('📋 event.type:', event.type);
        console.log('📋 event.target:', event.target);
        console.log('📋 event.detail:', event.detail);
        console.log('📋 event.machine:', event.machine);
        console.log('📋 event.stateMachine:', event.stateMachine);

        // Проверяем если event это массив
        if (Array.isArray(event)) {
          console.log('📋 Event is array, length:', event.length);
          event.forEach((item, index) => {
            console.log(`📋 Array item ${index}:`, item);
            if (item && typeof item === 'object') {
              console.log(`📋 Array item ${index} keys:`, Object.keys(item));
              console.log(`📋 Array item ${index} name:`, item.name);
              console.log(`📋 Array item ${index} stateName:`, item.stateName);
            }
          });
        }

        // Глубокая проверка всех свойств
        for (const [key, value] of Object.entries(event)) {
          console.log(`📋 ${key} (${typeof value}):`, value);
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            console.log(`📋 ${key} properties:`, Object.keys(value));
          }
        }
      }

      // Собираем все строковые представления
      const eventStrings = [];
      if (event?.name) eventStrings.push(String(event.name));
      if (event?.stateName) eventStrings.push(String(event.stateName));
      if (event?.state) eventStrings.push(String(event.state));

      // ВАЖНО: Обрабатываем event.data как массив (реальный формат данных)
      if (event?.data && Array.isArray(event.data)) {
        console.log('🎯 Processing event.data array:', event.data);
        event.data.forEach(item => {
          if (typeof item === 'string') {
            eventStrings.push(item);
            console.log('🎯 Added from data:', item);
          }
        });
      }

      if (Array.isArray(event)) {
        event.forEach(item => {
          if (item?.name) eventStrings.push(String(item.name));
          if (item?.stateName) eventStrings.push(String(item.stateName));
        });
      }

      console.log('🔍 All event strings:', eventStrings);

      // Ищем Timeline события (только Timeline 22-30 для модальных окон)
      eventStrings.forEach(str => {
        if (str.includes('Timeline')) {
          console.log('🎯 TIMELINE FOUND:', str);

          // Timeline 22-30 для модальных окон (НЕ Timeline 5-7 которые срабатывают при наведении)
          if (str === 'Timeline 22') {
            console.log('🚪 Timeline 22 - Opening problem 1!');
            openProblemOverlay(1);
          } else if (str === 'Timeline 23') {
            console.log('💧 Timeline 23 - Opening problem 2!');
            openProblemOverlay(2);
          } else if (str === 'Timeline 24') {
            console.log('⚡ Timeline 24 - Opening problem 3!');
            openProblemOverlay(3);
          } else if (str === 'Timeline 25') {
            console.log('🔇 Timeline 25 - Opening problem 4!');
            openProblemOverlay(4);
          } else if (str === 'Timeline 26') {
            console.log('🌡️ Timeline 26 - Opening problem 5!');
            openProblemOverlay(5);
          } else if (str === 'Timeline 27') {
            console.log('⏰ Timeline 27 - Opening problem 6!');
            openProblemOverlay(6);
          } else if (str.match(/Timeline (2[8-9]|30)/)) {
            // Timeline 28-30 для будущих дополнительных проблем
            const timelineNum = str.match(/Timeline (\d+)/)?.[1];
            console.log(`📊 Timeline ${timelineNum} - Reserved for future problems`);
          } else {
            console.log('📊 Other Timeline (ignored):', str);
          }
        }
      });

      console.log('🚨 ===== RIVE STATECHANGE EVENT END =====');
    });

    // Handle mouse movement for Rive interactivity
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current || !riveInstanceRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const normalizedX = x / rect.width;
      const normalizedY = y / rect.height;

      const stateMachine = riveInstanceRef.current.stateMachineInputs('State Machine 1');
      if (stateMachine) {
        const mouseXInput = stateMachine.find(input => input.name === 'mouseX' || input.name === 'Mouse X');
        const mouseYInput = stateMachine.find(input => input.name === 'mouseY' || input.name === 'Mouse Y');

        if (mouseXInput) {
          mouseXInput.value = normalizedX;
        }
        if (mouseYInput) {
          mouseYInput.value = normalizedY;
        }
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="rive-canvas"
        style={{
          width: '750px',
          height: '750px',
        }}
        width={1500}
        height={1500}
      />

      {/* ENHANCED MODAL */}
      {activeModal && problemsData[activeModal] && (
        <EnhancedModal
          isOpen={!!activeModal}
          onClose={closeModal}
          problemData={problemsData[activeModal]}
          problemId={activeModal}
        />
      )}
    </>
  );
}
