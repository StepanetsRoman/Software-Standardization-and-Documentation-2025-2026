/**
 * Движок вікторини: фільтрація запитань за налаштуваннями та накопичення статистики раунду.
 * @module useQuizEngine
 */
import { useCallback, useMemo, useState } from "react";

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const MOCK_QUESTIONS = [
  // HISTORY
  {
    id: 1,
    category: "history",
    difficulty: "easy",
    question: "Хто був першим президентом США?",
    answers: [
      { id: "a", text: "Джордж Вашингтон", isCorrect: true },
      { id: "b", text: "Авраам Лінкольн", isCorrect: false },
      { id: "c", text: "Томас Джефферсон", isCorrect: false },
      { id: "d", text: "Бенджамін Франклін", isCorrect: false }
    ]
  },
  {
    id: 2,
    category: "history",
    difficulty: "medium",
    question:
      "У якому році відбулася Французька революція, що призвела до падіння монархії?",
    answers: [
      { id: "a", text: "1789", isCorrect: true },
      { id: "b", text: "1812", isCorrect: false },
      { id: "c", text: "1914", isCorrect: false },
      { id: "d", text: "1848", isCorrect: false }
    ]
  },
  {
    id: 3,
    category: "history",
    difficulty: "easy",
    question: "Яке місто було столицею Київської Русі?",
    answers: [
      { id: "a", text: "Київ", isCorrect: true },
      { id: "b", text: "Новгород", isCorrect: false },
      { id: "c", text: "Чернігів", isCorrect: false },
      { id: "d", text: "Львів", isCorrect: false }
    ]
  },
  {
    id: 4,
    category: "history",
    difficulty: "medium",
    question:
      "Хто був гетьманом, що очолив Національно-визвольну війну українського народу середини XVII століття?",
    answers: [
      { id: "a", text: "Богдан Хмельницький", isCorrect: true },
      { id: "b", text: "Іван Мазепа", isCorrect: false },
      { id: "c", text: "Петро Дорошенко", isCorrect: false },
      { id: "d", text: "Пилип Орлик", isCorrect: false }
    ]
  },

  {
    id: 5,
    category: "history",
    difficulty: "hard",
    question: "Який мирний договір завершив Першу світову війну для Німеччини?",
    answers: [
      { id: "a", text: "Версальський договір", isCorrect: true },
      { id: "b", text: "Брест-Литовський договір", isCorrect: false },
      { id: "c", text: "Потсдамська угода", isCorrect: false },
      { id: "d", text: "Парижський мирний договір", isCorrect: false }
    ]
  },

  // SCIENCE
  {
    id: 6,
    category: "science",
    difficulty: "easy",
    question: "Яка планета Сонячної системи найбільша за розміром?",
    answers: [
      { id: "a", text: "Земля", isCorrect: false },
      { id: "b", text: "Юпітер", isCorrect: true },
      { id: "c", text: "Сатурн", isCorrect: false },
      { id: "d", text: "Марс", isCorrect: false }
    ]
  },
  {
    id: 7,
    category: "science",
    difficulty: "medium",
    question: "Який хімічний елемент має хімічний символ O?",
    answers: [
      { id: "a", text: "Кисень", isCorrect: true },
      { id: "b", text: "Золото", isCorrect: false },
      { id: "c", text: "Срібло", isCorrect: false },
      { id: "d", text: "Олово", isCorrect: false }
    ]
  },
  {
    id: 8,
    category: "science",
    difficulty: "medium",
    question: "Хто сформулював три закони руху, що стали основою класичної механіки?",
    answers: [
      { id: "a", text: "Ісаак Ньютон", isCorrect: true },
      { id: "b", text: "Альберт Ейнштейн", isCorrect: false },
      { id: "c", text: "Галілео Галілей", isCorrect: false },
      { id: "d", text: "Нікола Тесла", isCorrect: false }
    ]
  },
  {
    id: 9,
    category: "science",
    difficulty: "easy",
    question: "Який орган людського тіла перекачує кров по всьому організму?",
    answers: [
      { id: "a", text: "Серце", isCorrect: true },
      { id: "b", text: "Легені", isCorrect: false },
      { id: "c", text: "Печінка", isCorrect: false },
      { id: "d", text: "Шлунок", isCorrect: false }
    ]
  },

  {
    id: 10,
    category: "science",
    difficulty: "hard",
    question: "Яка фізична константа позначається літерою c у формулі E = mc²?",
    answers: [
      { id: "a", text: "Швидкість світла у вакуумі", isCorrect: true },
      { id: "b", text: "Гравітаційна стала", isCorrect: false },
      { id: "c", text: "Постійна Планка", isCorrect: false },
      { id: "d", text: "Електричний заряд електрона", isCorrect: false }
    ]
  },

  // MOVIES
  {
    id: 11,
    category: "movies",
    difficulty: "easy",
    question: "Хто зіграв головну роль у фільмі «Пірати Карибського моря»?",
    answers: [
      { id: "a", text: "Джонні Депп", isCorrect: true },
      { id: "b", text: "Леонардо Ді Капріо", isCorrect: false },
      { id: "c", text: "Бред Пітт", isCorrect: false },
      { id: "d", text: "Орландо Блум", isCorrect: false }
    ]
  },
  {
    id: 12,
    category: "movies",
    difficulty: "medium",
    question: "Хто є режисером фільму «Початок» (Inception)?",
    answers: [
      { id: "a", text: "Крістофер Нолан", isCorrect: true },
      { id: "b", text: "Стівен Спілберг", isCorrect: false },
      { id: "c", text: "Джеймс Кемерон", isCorrect: false },
      { id: "d", text: "Рідлі Скотт", isCorrect: false }
    ]
  },
  {
    id: 13,
    category: "movies",
    difficulty: "easy",
    question: "У якому кінофільмі вперше з'явився персонаж Гаррі Поттер?",
    answers: [
      {
        id: "a",
        text: "Гаррі Поттер і філософський камінь",
        isCorrect: true
      },
      { id: "b", text: "Гаррі Поттер і таємна кімната", isCorrect: false },
      { id: "c", text: "Гаррі Поттер і в'язень Азкабану", isCorrect: false },
      { id: "d", text: "Гаррі Поттер і келих вогню", isCorrect: false }
    ]
  },
  {
    id: 14,
    category: "movies",
    difficulty: "medium",
    question: "Який фільм отримав премію «Оскар» за найкращий фільм у 1994 році?",
    answers: [
      { id: "a", text: "Форрест Ґамп", isCorrect: true },
      { id: "b", text: "Втеча з Шоушенка", isCorrect: false },
      { id: "c", text: "Кримінальне чтиво", isCorrect: false },
      { id: "d", text: "Титанік", isCorrect: false }
    ]
  },
  {
    id: 15,
    category: "movies",
    difficulty: "hard",
    question:
      "У якому фільмі Крістофера Нолана час у різних шарах сну йде з різною швидкістю, а головний герой — Домінік Кобб?",
    answers: [
      { id: "a", text: "Початок (Inception)", isCorrect: true },
      { id: "b", text: "Престиж", isCorrect: false },
      { id: "c", text: "Интерстеллар", isCorrect: false },
      { id: "d", text: "Темний лицар", isCorrect: false }
    ]
  },

  // EXTRA
  {
    id: 16,
    category: "history",
    difficulty: "hard",
    question: "Яка країна першою здійснила висадку людини на Місяць?",
    answers: [
      { id: "a", text: "США", isCorrect: true },
      { id: "b", text: "Китай", isCorrect: false },
      { id: "c", text: "Франція", isCorrect: false },
      { id: "d", text: "Японія", isCorrect: false }
    ]
  },
  {
    id: 17,
    category: "science",
    difficulty: "hard",
    question:
      "Як називається процес перетворення рідкого стану речовини на газоподібний по всьому обʼєму?",
    answers: [
      { id: "a", text: "Кипіння", isCorrect: true },
      { id: "b", text: "Випаровування", isCorrect: false },
      { id: "c", text: "Конденсація", isCorrect: false },
      { id: "d", text: "Сублімація", isCorrect: false }
    ]
  },
  {
    id: 18,
    category: "movies",
    difficulty: "medium",
    question: "Який режисер зняв трилогію «Володар перснів»?",
    answers: [
      { id: "a", text: "Пітер Джексон", isCorrect: true },
      { id: "b", text: "Джордж Лукас", isCorrect: false },
      { id: "c", text: "Девід Фінчер", isCorrect: false },
      { id: "d", text: "Гільєрмо дель Торо", isCorrect: false }
    ]
  },
  {
    id: 19,
    category: "history",
    difficulty: "medium",
    question: "У якому році Україна проголосила незалежність у сучасних кордонах?",
    answers: [
      { id: "a", text: "1991", isCorrect: true },
      { id: "b", text: "1989", isCorrect: false },
      { id: "c", text: "1994", isCorrect: false },
      { id: "d", text: "2001", isCorrect: false }
    ]
  },
  {
    id: 20,
    category: "science",
    difficulty: "easy",
    question: "Який газ є основним компонентом повітря, яким ми дихаємо?",
    answers: [
      { id: "a", text: "Азот", isCorrect: true },
      { id: "b", text: "Кисень", isCorrect: false },
      { id: "c", text: "Вуглекислий газ", isCorrect: false },
      { id: "d", text: "Водень", isCorrect: false }
    ]
  },
  {
    id: 21,
    category: "movies",
    difficulty: "easy",
    question: "Який мультфільм студії Pixar розповідає історію іграшок, що оживають?",
    answers: [
      { id: "a", text: "Історія іграшок", isCorrect: true },
      { id: "b", text: "У пошуках Немо", isCorrect: false },
      { id: "c", text: "Корпорація монстрів", isCorrect: false },
      { id: "d", text: "Вгору", isCorrect: false }
    ]
  },
  {
    id: 22,
    category: "history",
    difficulty: "easy",
    question: "Хто був першою людиною, що ступила на поверхню Місяця?",
    answers: [
      { id: "a", text: "Ніл Армстронг", isCorrect: true },
      { id: "b", text: "Базз Олдрін", isCorrect: false },
      { id: "c", text: "Майкл Коллінз", isCorrect: false },
      { id: "d", text: "Джон Гленн", isCorrect: false }
    ]
  },
  {
    id: 23,
    category: "science",
    difficulty: "medium",
    question: "Як називається найближча до Землі зоря (окрім Сонця)?",
    answers: [
      { id: "a", text: "Проксіма Центавра", isCorrect: true },
      { id: "b", text: "Сіріус", isCorrect: false },
      { id: "c", text: "Полярна зоря", isCorrect: false },
      { id: "d", text: "Бетельгейзе", isCorrect: false }
    ]
  },
  {
    id: 24,
    category: "movies",
    difficulty: "medium",
    question: "У якому фільмі використано фразу «Я твій батько» (I am your father)?",
    answers: [
      { id: "a", text: "Зоряні війни: Імперія завдає удару у відповідь", isCorrect: true },
      { id: "b", text: "Матриця", isCorrect: false },
      { id: "c", text: "Термінатор 2", isCorrect: false },
      { id: "d", text: "Чужий", isCorrect: false }
    ]
  },
  {
    id: 25,
    category: "history",
    difficulty: "hard",
    question: "Яка подія традиційно вважається початком Другої світової війни?",
    answers: [
      { id: "a", text: "Напад Німеччини на Польщу", isCorrect: true },
      { id: "b", text: "Напад Японії на Перл-Гарбор", isCorrect: false },
      { id: "c", text: "Аншлюс Австрії", isCorrect: false },
      { id: "d", text: "Мюнхенська угода", isCorrect: false }
    ]
  },
  {
    id: 26,
    category: "science",
    difficulty: "hard",
    question:
      "Як називається органела клітини, яка відповідає за вироблення енергії (АТФ)?",
    answers: [
      { id: "a", text: "Мітохондрія", isCorrect: true },
      { id: "b", text: "Ядро", isCorrect: false },
      { id: "c", text: "Рибосома", isCorrect: false },
      { id: "d", text: "Аппарат Гольджі", isCorrect: false }
    ]
  },
  {
    id: 27,
    category: "movies",
    difficulty: "hard",
    question: "Хто зіграв головну роль у фільмі «Таксист» (Taxi Driver)?",
    answers: [
      { id: "a", text: "Роберт Де Ніро", isCorrect: true },
      { id: "b", text: "Аль Пачіно", isCorrect: false },
      { id: "c", text: "Дастін Гоффман", isCorrect: false },
      { id: "d", text: "Джек Ніколсон", isCorrect: false }
    ]
  },
  {
    id: 28,
    category: "history",
    difficulty: "medium",
    question: "Яка країна була розділена на Східну та Західну до 1990 року?",
    answers: [
      { id: "a", text: "Німеччина", isCorrect: true },
      { id: "b", text: "Корея", isCorrect: false },
      { id: "c", text: "Вʼєтнам", isCorrect: false },
      { id: "d", text: "Югославія", isCorrect: false }
    ]
  },
  {
    id: 29,
    category: "science",
    difficulty: "easy",
    question: "Яка речовина надає крові червоного кольору?",
    answers: [
      { id: "a", text: "Гемоглобін", isCorrect: true },
      { id: "b", text: "Хлорофіл", isCorrect: false },
      { id: "c", text: "Кератин", isCorrect: false },
      { id: "d", text: "Меланін", isCorrect: false }
    ]
  },
  {
    id: 30,
    category: "movies",
    difficulty: "easy",
    question:
      "Який фільм про супергероя-мільярдера в броньованому костюмі відкрив кіновсесвіт Marvel у 2008 році?",
    answers: [
      { id: "a", text: "Залізна людина", isCorrect: true },
      { id: "b", text: "Неймовірний Халк", isCorrect: false },
      { id: "c", text: "Месники", isCorrect: false },
      { id: "d", text: "Тор", isCorrect: false }
    ]
  }
];

function buildQuestions(settings) {
  const { category, difficulty, questionCount } = settings;

  let pool = [...MOCK_QUESTIONS];
  if (category !== "any") {
    pool = pool.filter((q) => q.category === category);
  }
  if (difficulty !== "any") {
    pool = pool.filter((q) => q.difficulty === difficulty);
  }

  if (pool.length === 0) {
    pool = [...MOCK_QUESTIONS];
  }

  const shuffled = shuffleArray(pool);
  const limit = Math.min(questionCount || shuffled.length, shuffled.length);
  return shuffled.slice(0, limit).map((q) => ({
    ...q,
    answers: shuffleArray(q.answers)
  }));
}

/**
 * @param {object} settings Налаштування з сторінки старту (категорія, складність, кількість питань).
 * @returns {object} Об’єкт з поточним питанням, лічильниками та методами `{ handleAnswer, resetQuiz }`.
 */
export function useQuizEngine(settings) {
  const [questions, setQuestions] = useState(() => buildQuestions(settings));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = useMemo(
    () => questions[currentIndex] ?? null,
    [questions, currentIndex]
  );

  const totalQuestions = questions.length;

  const handleAnswer = useCallback(
    (answerId) => {
      const question = currentQuestion;
      if (!question || isFinished) return;

      const selected = question.answers.find((a) => a.id === answerId);
      const isCorrect = Boolean(selected?.isCorrect);

      setAnswersHistory((prev) => [
        ...prev,
        {
          questionId: question.id,
          answerId,
          isCorrect
        }
      ]);

      if (isCorrect) {
        setScore((prev) => prev + 1);
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => {
          const next = prev + 1;
          setBestStreak((best) => (next > best ? next : best));
          return next;
        });
      } else {
        setStreak(0);
      }

      const isLast = currentIndex + 1 >= totalQuestions;
      if (isLast) {
        setIsFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentQuestion, currentIndex, isFinished, totalQuestions]
  );

  const resetQuiz = useCallback(() => {
    const nextQuestions = buildQuestions(settings);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setAnswersHistory([]);
    setIsFinished(false);
  }, [settings]);

  return {
    currentQuestion,
    totalQuestions,
    currentIndex,
    score,
    correctCount,
    streak,
    bestStreak,
    isFinished,
    answersHistory,
    handleAnswer,
    resetQuiz
  };
}
