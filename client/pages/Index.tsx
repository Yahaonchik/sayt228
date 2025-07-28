import { useState } from 'react';
import SimpleRive from '../components/SimpleRive';

interface ProblemData {
  title: string;
  description: string;
  solution: string;
  color: string;
}

export default function Index() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const problemsData: Record<number, ProblemData> = {
    1: {
      title: "🚪 Проблема с дверцей",
      description: "Дверца не открывается или не закрывается",
      solution: "1. Проверьте блокировку замка\n2. Убедитесь что цикл стирки завершен\n3. Отключите машину на 10 минут\n4. Проверь��е уплотнитель дверцы",
      color: "from-red-500 to-red-700"
    },
    2: {
      title: "💧 Проблема с водой",
      description: "Не набирает воду или не сливает",
      solution: "1. Проверьте кран подачи воды\n2. Очистите фильтр сливного шланга\n3. Проверьте давление воды\n4. Осмотрите сливной насос",
      color: "from-blue-500 to-blue-700"
    },
    3: {
      title: "⚡ Проблема с отжимом",
      description: "Не отжимает белье или плохо отжимает",
      solution: "1. Равномерно распределите белье\n2. Проверьте баланс машины\n3. Очистите фильтр\n4. Уменьшите загрузку",
      color: "from-green-500 to-green-700"
    }
  };

  const openProblemOverlay = (problemId: number) => {
    console.log(`🔧 Opening problem ${problemId} overlay`);
    setActiveModal(problemId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };



  return (
    <div className="min-h-screen bg-white">
      {/* ORIGINAL WASHING MACHINE */}
      <div id="washer">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          style={{ display: 'none' }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>

        <div id="door">
          <div className="handle"></div>
          <div id="inner-door">
            <div id="page" className="page">
              <div id="water" className="water">
                <svg viewBox="0 0 560 20" className="water-wave water-wave-back">
                  <use xlinkHref="#wave"></use>
                </svg>
                <svg viewBox="0 0 560 20" className="water-wave water-wave-front">
                  <use xlinkHref="#wave"></use>
                </svg>

                <div className="water-inner">
                  <div className="bubble bubble1"></div>
                  <div className="bubble bubble2"></div>
                  <div className="bubble bubble3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIVE COMPONENT */}
      <div className="mt-8 flex justify-center">
        <SimpleRive />
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && problemsData[activeModal] && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className={`bg-gradient-to-br ${problemsData[activeModal].color} text-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-300 scale-100`}
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {problemsData[activeModal].title}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {problemsData[activeModal].description}
            </p>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-3">🔧 Решение:</h3>
              <pre className="text-base leading-relaxed whitespace-pre-wrap">
                {problemsData[activeModal].solution}
              </pre>
            </div>
            <p className="text-center mt-6 text-sm opacity-75">
              👆 Кликните на затемн��нную область чтобы закрыть
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
