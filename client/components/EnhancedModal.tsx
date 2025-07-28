import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface ProblemData {
  title: string;
  description: string;
  color: string;
}

interface SpecificProblem {
  id: string;
  name: string;
  description: string;
  probability: number;
  cost: string;
  solution: string;
}

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemData: ProblemData;
  problemId: number;
}

// Mock data for ages and brands
const ageOptions = [
  'Менее 1 года',
  '1-3 года', 
  '3-5 лет',
  '5-10 лет',
  'Более 10 лет'
];

const brandOptions = [
  'Samsung',
  'LG', 
  'Bosch',
  'Indesit',
  'Whirlpool',
  'Ariston',
  'Atlant',
  'Candy',
  'Другая марка'
];

// Mock specific problems data based on main problem type
const getSpecificProblems = (problemId: number, age: string, brand: string): SpecificProblem[] => {
  const problemSets: Record<number, SpecificProblem[]> = {
    1: [ // Door problems
      {
        id: 'door_1',
        name: 'Нет холодной воды',
        description: 'Проверить наличие холодной воды в системе водоснабжения',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Проверьте подачу холодной воды в квартире\n2. Осмотрите входной кран\n3. Проверьте фильтр на входе\n4. Убедитесь что нет засора в шланге'
      },
      {
        id: 'door_2', 
        name: 'Неисправен датчик уровня воды',
        description: 'Замена датчика уровня воды',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Д��агностика датчика прессостата\n2. Проверка трубки датчика\n3. Замена датчика при необходимости\n4. Калибровка системы'
      },
      {
        id: 'door_3',
        name: 'Неисправность системы залива воды', 
        description: 'Ремонт системы залива воды',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Проверка электромагнитных клапанов\n2. Осмотр системы залива\n3. Очистка или замена клапанов\n4. Проверка электрических соединений'
      },
      {
        id: 'door_4',
        name: 'Засор в системе подачи воды',
        description: 'Чистка системы подачи воды', 
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Очистка фильтра входного шланга\n2. Промывка системы подачи\n3. Проверка на засоры\n4. Замена фильтров при необходимости'
      }
    ],
    2: [ // Water problems
      {
        id: 'water_1',
        name: 'Засорен сливной фильтр',
        description: 'Очистка сливного фильтра от загрязнений',
        probability: 30,
        cost: 'от 800грн',
        solution: '1. Откройте люк внизу машины\n2. Выкрутите фильтр против часовой стрелки\n3. Очистите от мусора и промойте\n4. Установите обратно и закрутите'
      },
      {
        id: 'water_2',
        name: 'Неисправен сливной насос',
        description: 'Замена сливного насоса',
        probability: 25,
        cost: 'от 1500грн', 
        solution: '1. Диагностика помпы слива\n2. Проверка крыльчатки насоса\n3. Замена насоса при поломке\n4. Тестирование работы системы слива'
      },
      {
        id: 'water_3',
        name: 'Засор сливного шланга',
        description: 'Прочистка сливного шланга',
        probability: 25,
        cost: 'от 900грн',
        solution: '1. Отсоедините сливной шланг\n2. Промойте под сильным напором\n3. Используйте трос ��ля прочистки\n4. Подсоедините обратно и проверьте'
      },
      {
        id: 'water_4',
        name: 'Проблема с датчиком воды',
        description: 'Замена датчика уровня воды',
        probability: 20,
        cost: 'от 1200грн',
        solution: '1. Проверка прессостата\n2. Осмотр соединительной трубки\n3. Замена датчика\n4. Настройка уровней воды'
      }
    ],
    3: [ // Spin problems
      {
        id: 'spin_1',
        name: 'Дисбаланс белья в барабане',
        description: 'Неравномерное распределение белья',
        probability: 35,
        cost: 'от 0грн',
        solution: '1. Остановите машину и откройте дверцу\n2. Перераспределите белье равномерно\n3. Не загружайте слишком много или мало\n4. Запустите отжим повторно'
      },
      {
        id: 'spin_2',
        name: 'Износ подшипников барабана',
        description: 'Замена подшипников и сальников',
        probability: 25,
        cost: 'от 2500грн',
        solution: '1. Демонтаж барабана\n2. Замена подшипников и сальников\n3. Смазка новых подшипников\n4. Сборка и тестирование'
      },
      {
        id: 'spin_3',
        name: 'Ослабление ремня привода',
        description: 'Регулировка или замена ремня',
        probability: 20,
        cost: 'от 800грн',
        solution: '1. Снятие задней панели\n2. Проверка натяжения ремня\n3. Регулировка или замена ремня\n4. Проверка работы двигателя'
      },
      {
        id: 'spin_4',
        name: 'Неисправность двигателя',
        description: 'Ремонт или замена двигателя',
        probability: 20,
        cost: 'от 3000грн',
        solution: '1. Диагностика двигателя\n2. Проверка обмоток и щеток\n3. Ремонт или замена двигателя\n4. Настройка и тестирование'
      }
    ],
    4: [ // Noise problems  
      {
        id: 'noise_1',
        name: 'Посторонние предметы в барабане',
        description: 'Удаление посторонних предметов',
        probability: 40,
        cost: 'от 500грн',
        solution: '1. Осмотрите барабан на предмет монет, пуговиц\n2. Проверьте карманы перед стиркой\n3. Удалите найденные предметы\n4. Проверьте отсутствие повреждений'
      },
      {
        id: 'noise_2',
        name: 'Износ амортизаторов',
        description: 'Замена амортизаторов',
        probability: 25,
        cost: 'от 1800грн',
        solution: '1. Демонтаж старых амортизаторов\n2. Установка новых амортизаторов\n3. Проверка балансировки\n4. Тестирование на всех режимах'
      },
      {
        id: 'noise_3',
        name: 'Разбалансировка барабана',
        description: 'Балансировка барабана',
        probability: 20,
        cost: 'от 1500грн',
        solution: '1. Проверка креплений барабана\n2. Регулировка положения\n3. Добавление балансировочных грузов\n4. Финальное тестирование'
      },
      {
        id: 'noise_4',
        name: 'Износ подшипников',
        description: 'Замена подшипников',
        probability: 15,
        cost: 'от 2500грн',
        solution: '1. Полная разборка барабана\n2. Замена изношенных подшипников\n3. Установка новых сальников\n4. Сборка и настройка'
      }
    ],
    5: [ // Heating problems
      {
        id: 'heat_1',
        name: 'Неисправен ТЭН',
        description: 'Замена нагревательного элемента',
        probability: 45,
        cost: 'от 1800грн',
        solution: '1. Диагностика ТЭНа мультиметром\n2. Демонтаж старого ТЭНа\n3. Установка нового нагревателя\n4. Проверка герметичности и работы'
      },
      {
        id: 'heat_2',
        name: 'Накипь на ТЭНе',
        description: 'Очистка от накипи',
        probability: 30,
        cost: 'от 1200грн',
        solution: '1. Демонтаж ТЭНа\n2. Очистка от накипи специальными средствами\n3. Промывка системы\n4. Установка обратно'
      },
      {
        id: 'heat_3',
        name: 'Неисправен датчик температуры',
        description: 'Замена термодатчика',
        probability: 15,
        cost: 'от 900грн',
        solution: '1. Локализация термодатчика\n2. Проверка сопротивления\n3. Замена неисправного датчика\n4. Калибровка температурных режимов'
      },
      {
        id: 'heat_4',
        name: 'Проблема с управляющим модулем',
        description: 'Ремонт платы управления',
        probability: 10,
        cost: 'от 2200грн',
        solution: '1. Диагностика управляющего модуля\n2. Ремонт или замена платы\n3. Перепрошивка при необходимости\n4. Тестирование всех функций'
      }
    ],
    6: [ // Program problems
      {
        id: 'prog_1',
        name: 'Сбой программного обеспечения',
        description: 'Сброс настроек до заводских',
        probability: 35,
        cost: 'от 800г��н',
        solution: '1. Выполните сброс к заводским настройкам\n2. Отключите от сети на 15 минут\n3. Включите и запрограммируйте заново\n4. Проверьте работу всех программ'
      },
      {
        id: 'prog_2',
        name: 'Неисправность панели управления',
        description: 'Ремонт панели управления',
        probability: 25,
        cost: 'от 2000грн',
        solution: '1. Диагностика панели управления\n2. Замена неисправных кнопок или дисплея\n3. Проверка контактов\n4. Тестирование всех функций'
      },
      {
        id: 'prog_3',
        name: 'Проблема с блокировкой дверцы',
        description: 'Ремонт замка дверцы',
        probability: 25,
        cost: 'от 1300грн',
        solution: '1. Проверка механизма блокировки\n2. Очистка контактов замка\n3. Замена УБЛ при необходимости\n4. Настройка корректной работы'
      },
      {
        id: 'prog_4',
        name: 'Н��исправность модуля управления',
        description: 'Замена управляющего модуля',
        probability: 15,
        cost: 'от 3500грн',
        solution: '1. Полная диагностика модуля\n2. Замена управляющей платы\n3. Программирование нового модуля\n4. Комплексное тестирование'
      }
    ]
  };

  return problemSets[problemId] || [];
};

export default function EnhancedModal({ isOpen, onClose, problemData, problemId }: EnhancedModalProps) {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const specificProblems = getSpecificProblems(problemId, selectedAge, selectedBrand);
  const showProblems = selectedAge && selectedBrand;

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ageDropdownRef.current && !ageDropdownRef.current.contains(event.target as Node)) {
        setShowAgeDropdown(false);
      }
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false);
      }
    };

    if (showAgeDropdown || showBrandDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAgeDropdown, showBrandDropdown]);

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age);
    setShowAgeDropdown(false);
    setExpandedProblem(null);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setShowBrandDropdown(false);
    setExpandedProblem(null);
  };

  const toggleProblemSolution = (problemId: string) => {
    setExpandedProblem(expandedProblem === problemId ? null : problemId);
  };

  const handleClose = () => {
    setSelectedAge('');
    setSelectedBrand('');
    setExpandedProblem(null);
    setShowAgeDropdown(false);
    setShowBrandDropdown(false);
    onClose();
  };

  const handleBack = () => {
    if (expandedProblem) {
      setExpandedProblem(null);
    } else if (showProblems) {
      setSelectedAge('');
      setSelectedBrand('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="bg-[#F8F5ED] border border-[#DADADA] rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.09),-5px_-5px_15px_rgba(255,255,255,0.69)] w-full max-w-4xl my-8 relative"
        >
          
          {/* Header */}
          <div className="bg-[#E9DCD1] px-6 py-6 rounded-t-2xl relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-[#474A6F] hover:text-[#333] transition-colors p-2"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
            
            {(showProblems || expandedProblem) && (
              <button
                onClick={handleBack}
                className="absolute left-4 top-4 text-[#474A6F] hover:text-[#333] transition-colors p-2"
                aria-label="Назад"
              >
                ← Назад
              </button>
            )}
            
            <h2 className="text-[#474A6F] text-center text-xl md:text-2xl font-normal tracking-[2px] font-georgia px-16">
              {problemData.title}
            </h2>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showProblems && (
              <div className="space-y-6">
                <p className="text-[#434343] text-center text-base md:text-lg tracking-[-0.18px] font-nunito opacity-90">
                  Узнать вероятность конкретной неисправности и примерную стоимость ремонта
                </p>
                
                <div className="space-y-4 max-w-2xl mx-auto">
                  {/* Age Selection */}
                  <div className="relative" ref={ageDropdownRef}>
                    <button
                      onClick={() => {
                        setShowAgeDropdown(!showAgeDropdown);
                        setShowBrandDropdown(false);
                      }}
                      className="flex items-center justify-between w-full h-14 px-6 bg-[#E9E3D1] border border-[#DADADA] rounded-lg shadow-[3px_3px_6px_rgba(0,0,0,0.1)] hover:bg-[#E5DEC8] transition-colors"
                    >
                      <span className="text-[#353535] font-nunito tracking-[0.64px]">
                        {selectedAge || 'Выберите возраст'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-[#353535] transition-transform ${showAgeDropdown ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {showAgeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DADADA] rounded-lg shadow-xl z-[1000] max-h-60 overflow-y-auto">
                        {ageOptions.map((age) => (
                          <button
                            key={age}
                            onClick={() => handleAgeSelect(age)}
                            className="w-full px-6 py-3 text-left text-[#353535] hover:bg-[#F5F5F5] transition-colors border-b border-[#EEEEEE] last:border-b-0 text-sm"
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brand Selection */}
                  <div className="relative" ref={brandDropdownRef}>
                    <button
                      onClick={() => {
                        setShowBrandDropdown(!showBrandDropdown);
                        setShowAgeDropdown(false);
                      }}
                      className="flex items-center justify-between w-full h-14 px-6 bg-[#E9E3D1] border border-[#DADADA] rounded-lg shadow-[3px_3px_6px_rgba(0,0,0,0.1)] hover:bg-[#E5DEC8] transition-colors"
                    >
                      <span className="text-[#353535] font-nunito tracking-[0.64px]">
                        {selectedBrand || 'Выберите марку'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-[#353535] transition-transform ${showBrandDropdown ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {showBrandDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DADADA] rounded-lg shadow-xl z-[1000] max-h-60 overflow-y-auto">
                        {brandOptions.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => handleBrandSelect(brand)}
                            className="w-full px-6 py-3 text-left text-[#353535] hover:bg-[#F5F5F5] transition-colors border-b border-[#EEEEEE] last:border-b-0 text-sm"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {showProblems && (
              <div className="space-y-4 animate-slide-in-from-bottom">
                <div className="text-center mb-6 p-4 bg-[#E8F4F8] rounded-lg">
                  <p className="text-[#434343] text-sm font-nunito">
                    Возраст: <span className="font-semibold text-[#2B5F75]">{selectedAge}</span> | 
                    Марка: <span className="font-semibold text-[#2B5F75]">{selectedBrand}</span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  {specificProblems.map((problem) => (
                    <div key={problem.id} className="bg-[#F5F0E8] border border-[#E0D5C7] rounded-lg overflow-hidden">
                      {/* Problem Header */}
                      <button
                        onClick={() => toggleProblemSolution(problem.id)}
                        className="w-full p-4 hover:bg-[#F0EBE3] transition-colors text-left"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[#2B5F75] font-semibold text-base mb-1">
                              {problem.name}
                            </h3>
                            <p className="text-[#666] text-sm text-left">
                              {problem.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-6 flex-shrink-0">
                            <div className="text-center">
                              <div className="text-xl font-bold text-[#2B5F75]">{problem.probability}%</div>
                              <div className="text-xs text-[#666] uppercase tracking-wide">Вероятность</div>
                            </div>
                            <div className="text-center">
                              <div className="text-base font-semibold text-[#2B5F75]">{problem.cost}</div>
                              <div className="text-xs text-[#666] uppercase tracking-wide">Стоимость</div>
                            </div>
                            <ChevronDown 
                              size={18} 
                              className={`text-[#2B5F75] transition-transform ${expandedProblem === problem.id ? 'rotate-180' : ''}`} 
                            />
                          </div>
                        </div>
                      </button>
                      
                      {/* Expanded Solution */}
                      {expandedProblem === problem.id && (
                        <div className="border-t border-[#E0D5C7] bg-white bg-opacity-60 p-6 animate-slide-in-from-bottom">
                          <h4 className="text-lg font-bold mb-4 text-[#474A6F] flex items-center gap-2">
                            🔧 Пошаговое решение:
                          </h4>
                          <pre className="text-sm leading-relaxed whitespace-pre-wrap text-[#333] font-nunito">
                            {problem.solution}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
