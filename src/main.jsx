import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgePercent,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  CreditCard,
  Lock,
  Receipt,
  ShieldCheck,
} from 'lucide-react';
import './styles.css';
import brandLogo from './assets/alif-brand.png';
import heroAuth from './assets/hero-auth.png';
import heroCourses from './assets/hero-courses.png';
import heroCity from './assets/hero-city.png';
import heroFaq from './assets/hero-faq.png';
import heroPayment from './assets/hero-payment.png';
import heroPricing from './assets/hero-pricing.png';
import heroProfile from './assets/hero-profile.png';
import heroProgram from './assets/hero-program.png';
import studyCity from './assets/study-city.png';

const pages = ['home', 'program', 'pricing', 'payment', 'courses', 'profile', 'faq'];

const navItems = [
  ['home', 'Главная'],
  ['program', 'Программа'],
  ['pricing', 'Тарифы'],
  ['courses', 'Мои курсы'],
  ['profile', 'Профиль'],
  ['faq', 'FAQ'],
];

const seoByPage = {
  home: {
    title: 'ALIF Arabic - онлайн-курс арабского языка',
    description: 'ALIF Arabic: короткие уроки, практика речи, личный кабинет и понятный маршрут обучения арабскому языку.',
  },
  program: {
    title: 'Программа курса - ALIF Arabic',
    description: 'Алфавит, чтение, разговорные фразы, грамматика и голосовая практика для начинающих.',
  },
  pricing: {
    title: 'Тарифы - ALIF Arabic',
    description: 'Выберите тариф обучения арабскому языку: Base, Pro или VIP.',
  },
  payment: {
    title: 'Оплата и запись - ALIF Arabic',
    description: 'Оформление выбранного курса, промокод, дата старта и демо-оплата.',
  },
  courses: {
    title: 'Мои курсы - ALIF Arabic',
    description: 'Купленные курсы, активные доступы и история обучения.',
  },
  profile: {
    title: 'Профиль ученика - ALIF Arabic',
    description: 'Личный кабинет ученика: данные, промокоды, настройки и история курсов.',
  },
  faq: {
    title: 'FAQ - ALIF Arabic',
    description: 'Ответы на вопросы о курсе, оплате, тарифах и формате обучения.',
  },
};

const plans = [
  {
    id: 'base',
    name: 'Base',
    price: 9900,
    accent: 'Самостоятельный старт',
    text: 'Видеоуроки, тренажеры и понятный недельный маршрут без привязки к группе.',
    format: 'Самостоятельный формат',
    schedule: '20 минут в день в своем темпе',
    process: 'После оплаты открываются уроки, задания, заметки и личный трек прогресса.',
    result: 'Подходит для мягкого старта с алфавитом, чтением и базовыми фразами.',
    features: ['12 видеоуроков', 'рабочая тетрадь', 'еженедельные задания', 'доступ на 4 месяца'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 18900,
    accent: 'Самый популярный',
    text: 'Группа, практика речи, чат и проверка домашних заданий преподавателем.',
    format: 'Группа и обратная связь',
    schedule: '1 групповой созвон в неделю и задания между встречами',
    process: 'Ты проходишь уроки, сдаешь голосовые задания и раз в неделю практикуешь речь.',
    result: 'Оптимален, если хочешь говорить регулярно и получать правки по произношению.',
    features: ['все из Base', 'групповые созвоны', 'чат с преподавателем', 'проверка речи'],
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 39900,
    accent: 'Личный маршрут',
    text: 'Индивидуальный план и личные уроки с преподавателем под твою цель.',
    format: 'Индивидуальное сопровождение',
    schedule: 'личные уроки по согласованному времени',
    process: 'Преподаватель собирает план, проводит занятия и корректирует нагрузку каждую неделю.',
    result: 'Лучший вариант для быстрого прогресса, гибкого графика и персональной поддержки.',
    features: ['все из Pro', '8 личных уроков', 'персональный план', 'разбор ошибок'],
  },
];

const promoCodes = {
  ALIFSTART: {
    title: 'Стартовая акция',
    discount: 2000,
    text: 'Скидка на первый месяц обучения и быстрый доступ к вводному модулю.',
    coursePage: 'program',
  },
  SPEAK10: {
    title: 'Разговорная практика',
    percent: 10,
    text: 'Скидка 10% на тариф с обратной связью и голосовыми заданиями.',
    coursePage: 'pricing',
  },
};

const modules = [
  {
    id: 'letters',
    num: '01',
    title: 'Алфавит без боли',
    text: 'Буквы, связки, чтение и уверенность с первого занятия.',
    focus: 'Чтение',
    lessons: ['Формы букв', 'Гласные и огласовки', 'Первые слова'],
  },
  {
    id: 'speaking',
    num: '02',
    title: 'Разговорный старт',
    text: 'Фразы, реакции, интонация и короткие живые диалоги.',
    focus: 'Речь',
    lessons: ['Приветствие', 'О себе', 'Вопросы и ответы'],
  },
  {
    id: 'grammar',
    num: '03',
    title: 'Грамматика в речи',
    text: 'Правила через ситуации, а не через сухие таблицы.',
    focus: 'Смысл',
    lessons: ['Род и число', 'Простые фразы', 'Связки слов'],
  },
  {
    id: 'sprint',
    num: '04',
    title: 'Личный спринт',
    text: 'План, домашка, контроль и обратная связь.',
    focus: 'Практика',
    lessons: ['Голосовая запись', 'Диалог', 'Финальная сцена'],
  },
];

const lessons = [
  { id: '01', module: 'letters', title: 'Формы букв', duration: 17, status: 'open' },
  { id: '02', module: 'letters', title: 'Короткие слова', duration: 21, status: 'open' },
  { id: '03', module: 'speaking', title: 'Приветствие', duration: 16, status: 'open' },
  { id: '04', module: 'speaking', title: 'Говорим о себе', duration: 23, status: 'open' },
  { id: '05', module: 'grammar', title: 'Вопросы и ответы', duration: 18, status: 'next' },
  { id: '06', module: 'sprint', title: 'Мини-диалог', duration: 21, status: 'locked' },
];

const courseLessonsByPlan = {
  base: [
    { id: 'base-01', title: 'Алфавит и формы букв', duration: 18 },
    { id: 'base-02', title: 'Огласовки и короткие слова', duration: 22 },
    { id: 'base-03', title: 'Чтение простых фраз', duration: 20 },
    { id: 'base-04', title: 'Базовые приветствия', duration: 16 },
    { id: 'base-05', title: 'Мини-диалог для поездки', duration: 24 },
  ],
  pro: [
    { id: 'pro-01', title: 'Алфавит и произношение', duration: 18 },
    { id: 'pro-02', title: 'Чтение и первые слова', duration: 22 },
    { id: 'pro-03', title: 'Приветствие и знакомство', duration: 19 },
    { id: 'pro-04', title: 'Рассказ о себе', duration: 24 },
    { id: 'pro-05', title: 'Вопросы и ответы', duration: 21 },
    { id: 'pro-06', title: 'Голосовая практика', duration: 26 },
    { id: 'pro-07', title: 'Диалог с преподавателем', duration: 30 },
  ],
  vip: [
    { id: 'vip-01', title: 'Диагностика уровня и цель', duration: 25 },
    { id: 'vip-02', title: 'Личный план произношения', duration: 30 },
    { id: 'vip-03', title: 'Разговорные сценарии', duration: 28 },
    { id: 'vip-04', title: 'Грамматика через речь', duration: 26 },
    { id: 'vip-05', title: 'Персональная голосовая правка', duration: 32 },
    { id: 'vip-06', title: 'Практика живого диалога', duration: 34 },
    { id: 'vip-07', title: 'Финальная разговорная сцена', duration: 30 },
    { id: 'vip-08', title: 'План дальнейшего обучения', duration: 22 },
  ],
};

const tasks = [
  'Повторить 12 букв вслух',
  'Записать голос на 45 секунд',
  'Прочитать мини-диалог без подсказок',
];

const bookingSlots = [
  { id: 'mon-1900', day: 'Понедельник', date: '25 мая', time: '19:00' },
  { id: 'wed-1800', day: 'Среда', date: '27 мая', time: '18:00' },
  { id: 'thu-2000', day: 'Четверг', date: '28 мая', time: '20:00' },
  { id: 'sat-1200', day: 'Суббота', date: '30 мая', time: '12:00' },
];

const paymentMethods = [
  ['card', 'Банковская карта', 'Visa, Mastercard, МИР'],
  ['wallet', 'Электронный кошелек', 'быстрая оплата без ввода карты'],
  ['invoice', 'Счет на оплату', 'для компании или оплаты частями'],
];

const faqItems = [
  ['Можно ли с нуля?', 'Да. Курс начинается с алфавита, чтения и базовых фраз. Первый результат виден уже после стартового блока.'],
  ['Сколько времени нужно?', 'В среднем достаточно 20 минут в день и одного практического блока в неделю.'],
  ['Что происходит после оплаты?', 'Курс появляется в разделе “Мои курсы”, а дата старта и сумма сохраняются в профиле.'],
  ['Можно поменять тариф?', 'Да. Новый формат можно оформить отдельной покупкой, а история останется в кабинете.'],
  ['Есть ли обратная связь?', 'На тарифах Pro и VIP преподаватель проверяет речь, домашние задания и помогает собрать личный маршрут.'],
];

const defaultProfile = {
  name: 'Амина',
  email: 'student@mail.ru',
  phone: '+7 900 000-00-00',
  photo: '',
  city: 'Владивосток',
  goal: 'Свободно говорить в поездке',
  level: 'A0',
  minutes: 20,
  planId: 'pro',
  promoCode: 'ALIFSTART',
  notifications: true,
  darkMode: false,
};

function setMeta(selector, attr, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attr, value);
}

function updateSeo(page) {
  const seo = seoByPage[page] || seoByPage.home;
  document.title = seo.title;
  setMeta('meta[name="description"]', 'content', seo.description);
  setMeta('meta[property="og:title"]', 'content', seo.title);
  setMeta('meta[property="og:description"]', 'content', seo.description);
  setMeta('meta[name="twitter:title"]', 'content', seo.title);
  setMeta('meta[name="twitter:description"]', 'content', seo.description);
}

function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getPageFromHash() {
  const page = window.location.hash.replace('#/', '') || 'home';
  return pages.includes(page) ? page : 'home';
}

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function getPromo(code) {
  return promoCodes[(code || '').trim().toUpperCase()] || null;
}

function getDiscount(plan, code) {
  const promo = getPromo(code);
  if (!promo) return 0;
  return promo.percent ? Math.round(plan.price * (promo.percent / 100)) : promo.discount || 0;
}

function createCourseRecord({ plan, slot, promoCode, discount, total, method }) {
  const planLessons = courseLessonsByPlan[plan.id] || courseLessonsByPlan.base;

  return {
    id: `${plan.id}-${Date.now()}`,
    planId: plan.id,
    planName: plan.name,
    format: plan.format,
    schedule: plan.schedule,
    lessonsTotal: planLessons.length,
    lessonsDone: 0,
    completedLessonIds: [],
    status: 'active',
    paidAt: new Date().toISOString(),
    start: slot,
    promoCode,
    discount,
    total,
    method,
  };
}

function navigate(page) {
  window.location.hash = `#/${page}`;
}

function initials(name) {
  return (name || 'Ученик')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function generateAuthCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendAuthCode(email, code, mode) {
  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
    throw new Error('Почтовый сервис не подключен.');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailJsConfig.serviceId,
      template_id: emailJsConfig.templateId,
      user_id: emailJsConfig.publicKey,
      template_params: {
        to_email: email,
        email,
        user_email: email,
        reply_to: email,
        to_name: email,
        code,
        auth_code: code,
        auth_mode: mode === 'register' ? 'Регистрация' : 'Вход',
        app_name: 'ALIF Arabic',
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `EmailJS вернул ошибку ${response.status}.`);
  }

  return { message: `Код отправлен на ${email}.` };
}

function IconButton({ children, className = '', ...props }) {
  return (
    <button className={`icon-button ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

function ActionButton({ children, variant = 'primary', icon: Icon = null, ...props }) {
  return (
    <button className={`button ${variant}`} type="button" {...props}>
      <span>{children}</span>
      {Icon && <Icon size={18} />}
    </button>
  );
}

function LinkButton({ children, to = 'pricing', variant = 'primary', icon: Icon = null }) {
  return (
    <a className={`button ${variant}`} href={`#/${to}`}>
      <span>{children}</span>
      {Icon && <Icon size={18} />}
    </a>
  );
}

function PromoInput({ value, onChange, promo, discount, compact = false }) {
  return (
    <div className={`promo-input ${compact ? 'compact' : ''}`}>
      <label>
        <span>Промокод</span>
        <div>
          <BadgePercent size={18} />
          <input value={value} onChange={(event) => onChange(event.target.value.toUpperCase())} placeholder="ALIFSTART" />
        </div>
      </label>
      <p className={promo ? 'valid' : ''}>
        {promo ? `${promo.title}: скидка ${discount ? formatPrice(discount) : 'применена'}` : 'Введите код акции, если он есть'}
      </p>
    </div>
  );
}

function Header({ activePage, profile, isLoggedIn, onLogin, onRegister }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleNavItems = isLoggedIn
    ? navItems
    : navItems.filter(([page]) => !['courses', 'profile'].includes(page));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [activePage]);

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="#/home" aria-label="ALIF Arabic">
        <img src={brandLogo} alt="ALIF Arabic" />
      </a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {visibleNavItems.map(([page, label]) => (
          <a className={activePage === page ? 'active' : ''} href={`#/${page}`} key={page}>
            {label}
          </a>
        ))}
        {!isLoggedIn && (
          <div className="nav-mobile-auth">
            <button type="button" onClick={onLogin}>Вход</button>
            <button type="button" onClick={onRegister}>Регистрация</button>
          </div>
        )}
      </div>
      <div className={`nav-tools ${isLoggedIn ? '' : 'guest'}`}>
        {!isLoggedIn && (
          <div className="auth-actions compact">
            <button type="button" onClick={onLogin}>Вход</button>
            <button type="button" onClick={onRegister}>Регистрация</button>
          </div>
        )}
        <a className="mini-profile" href="#/profile" aria-label="Профиль">
          {profile.photo ? <img src={profile.photo} alt="" /> : <span>{initials(profile.name)}</span>}
        </a>
        <IconButton className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Меню">
          <span />
          <span />
        </IconButton>
      </div>
    </nav>
  );
}

function PageHero({ eyebrow, title, visual = heroProgram, children }) {
  return (
    <section className="page-hero reveal page-hero-with-art">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="page-hero-inline">{children}</div>}
      </div>
      <figure className="page-hero-art" aria-hidden="true">
        <img src={visual} alt="" />
      </figure>
    </section>
  );
}

function StatPill({ label, value, text }) {
  return (
    <article className="stat-pill">
      <small>Курс</small>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{text}</p>
    </article>
  );
}

function PhoneMockup({ playing }) {
  return (
    <div className="phone">
      <div className="phone-top" />
      <div className="lesson-card active">
        <span>Урок 04</span>
        <strong>Говорим о себе</strong>
        <div className={`wave ${playing ? 'playing' : ''}`}>
          {Array.from({ length: 18 }).map((_, index) => (
            <i key={index} style={{ '--bar': `${18 + ((index * 11) % 42)}px`, '--delay': `${index * 45}ms` }} />
          ))}
        </div>
      </div>
      <div className="chat-bubble left">كيف حالك؟</div>
      <div className="chat-bubble right">У меня получилось!</div>
      <div className="mini-grid">
        <span>ح</span>
        <span>خ</span>
        <span>ج</span>
        <span>ث</span>
      </div>
    </div>
  );
}

function HomePage({ progress, selectedPlan, onSelectPlan }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="kicker">Онлайн-курс арабского с нуля</p>
          <h1>Заговори на <span>арабском</span> за 3 месяца</h1>
          <p className="hero-text">
            Короткие уроки, практика речи, личный кабинет и понятный маршрут от алфавита до живого диалога.
          </p>
          <div className="hero-actions">
            <LinkButton to="pricing" icon={ArrowRight}>Выбрать тариф</LinkButton>
          </div>
          <div className="hero-stats">
            <StatPill label="уроков" value="36" text="короткие блоки по 15-25 минут" />
            <StatPill label="практик" value="18" text="голосовые задания с проверкой" />
            <StatPill label="прогресс" value={`${progress}%`} text="виден в личном кабинете" />
          </div>
        </div>
        <div className="hero-visual">
          <img src={heroCity} alt="Город и архитектура арабского мира" />
          <div className="arabic-layer">العربية</div>
        </div>
      </section>

      <section className="split-section compact">
        <div>
          <p className="eyebrow">Метод</p>
          <h2>Учишься короткими шагами</h2>
        </div>
        <div className="method-lines">
          {[
            ['Сначала звук', 'Разбираем буквы и произношение так, чтобы не было страха перед письмом.'],
            ['Потом фраза', 'Сразу собираем короткие диалоги для поездки, общения и учебы.'],
            ['Затем практика', 'Задания, голосовые записи и прогресс сохраняются в профиле.'],
          ].map(([title, text], index) => (
            <article className="hover-lift" key={title}>
              <span className="method-mark">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="spotlight-section">
        <div className="selected-plan-info">
          <p className="eyebrow">Выбранный тариф</p>
          <h2>{selectedPlan.name}</h2>
          <div className="tariff-explain">
            <span>{selectedPlan.accent}</span>
            <p>{selectedPlan.process}</p>
            <div>
              <strong>Формат</strong>
              <small>{selectedPlan.format}</small>
            </div>
            <div>
              <strong>Результат</strong>
              <small>{selectedPlan.result}</small>
            </div>
          </div>
        </div>
        <figure className="spotlight-photo">
          <img src={heroCity} alt="" />
        </figure>
        <aside className="mini-plans">
          {plans.map((plan) => (
            <button
              className={selectedPlan.id === plan.id ? 'selected' : ''}
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
            >
              <span>{plan.name}</span>
              <strong>{formatPrice(plan.price)}</strong>
            </button>
          ))}
        </aside>
      </section>

      <section className="app-section">
        <div className="phone-wrap">
          <PhoneMockup playing />
        </div>
        <div>
          <p className="kicker">Личный кабинет</p>
          <h2>Курсы, задания и заметки в одном месте</h2>
          <p className="hero-text">
            Оплаченные курсы живут на отдельной странице, а в профиле остаются только нужные данные и настройки.
          </p>
          <LinkButton to="courses" variant="dark" icon={ArrowRight}>Открыть курсы</LinkButton>
        </div>
      </section>

      <section className="home-links">
        {[
          ['01', 'Программа', 'модули и уроки', 'program'],
          ['02', 'Тарифы', 'форматы обучения', 'pricing'],
          ['03', 'Оплата', 'оформление курса', 'payment'],
          ['04', 'Профиль', 'данные и история', 'profile'],
          ['05', 'FAQ', 'ответы перед стартом', 'faq'],
        ].map(([num, title, text, to]) => (
          <a href={`#/${to}`} key={to}>
            <span className="link-num">{num}</span>
            <strong>{title}</strong>
            <small>{text}</small>
            <ArrowRight />
          </a>
        ))}
      </section>

      <section className="final-cta slim">
        <div>
          <p className="kicker">Готов к первому уроку?</p>
          <h2>Выбери тариф и начни маршрут сегодня</h2>
        </div>
        <LinkButton to="pricing" variant="dark" icon={ArrowRight}>Выбрать тариф</LinkButton>
        <div className="cta-slice" aria-hidden="true">
          <img src={studyCity} alt="" />
        </div>
      </section>
    </>
  );
}

function ProgramPage() {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const currentModule = modules.find((module) => module.id === activeModule) || modules[0];
  const moduleLessons = lessons.filter((lesson) => lesson.module === activeModule);
  const activeModuleIndex = Math.max(modules.findIndex((module) => module.id === activeModule), 0);
  const moduleProgress = Math.round(((activeModuleIndex + 1) / modules.length) * 100);

  return (
    <div className="page">
      <PageHero
        eyebrow="Программа"
        title="Маршрут от алфавита до разговора"
        visual={heroProgram}
      />

      <section className="program-studio">
        <aside className="program-rail">
          {modules.map((module, index) => (
            <button
              className={activeModule === module.id ? 'active' : ''}
              key={module.id}
              type="button"
              onClick={() => setActiveModule(module.id)}
            >
              <span>{module.num}</span>
              <strong>{module.title}</strong>
              <small>{module.focus}</small>
              <i style={{ '--delay': `${index * 70}ms` }} />
            </button>
          ))}
        </aside>

        <div className="program-stage">
          <div className="program-stage-head">
            <div>
              <p className="eyebrow">Активный модуль</p>
              <h2>{currentModule.title}</h2>
              <p>{currentModule.text}</p>
            </div>
            <div className="program-diagonal-progress" style={{ '--progress': `${moduleProgress}%` }}>
              <div className="diagonal-progress-label">
                <span>заполнение маршрута</span>
                <strong>{moduleProgress}%</strong>
              </div>
              <div className="diagonal-progress-track">
                <i />
              </div>
            </div>
          </div>

          <div className="module-tags">
            {currentModule.lessons.map((lesson) => <span key={lesson}>{lesson}</span>)}
          </div>

          <div className="lesson-flow">
            {moduleLessons.map((lesson, index) => (
              <article key={lesson.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.duration} минут · тема модуля {currentModule.num}</small>
                </div>
                <b>{currentModule.focus}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="program-benefits">
        {[
          ['Сценарии', 'Фразы для поездки, знакомства и учебных диалогов.'],
          ['Произношение', 'Голосовые задания и обратная связь на тарифах Pro и VIP.'],
          ['Контроль', 'Прогресс, заметки и покупки сохраняются в кабинете.'],
        ].map(([title, text]) => (
          <article key={title}>
            <BookOpen size={22} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function PricingPage({ selectedPlanId, onSelectPlan }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="Тарифы"
        title="Выбери курс и сразу перейди к оплате"
        visual={heroPricing}
      />
      <section className="plans purchase-plans">
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${selectedPlanId === plan.id ? 'featured' : ''}`} key={plan.id}>
              <span>{plan.accent}</span>
              <h3>{plan.name}</h3>
              <strong>{formatPrice(plan.price)}</strong>
              <p>{plan.text}</p>
              <div className="plan-details">
                <span>{plan.format}</span>
                <small>{plan.schedule}</small>
              </div>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <ActionButton icon={ArrowRight} onClick={() => onSelectPlan(plan.id, true)}>
                Оформить тариф
              </ActionButton>
            </article>
          ))}
        </div>
      </section>
      <section className="pricing-strip">
        {[
          ['Без скрытых шагов', 'Сумма считается сразу с промокодом.'],
          ['Доступ после оплаты', 'Курс появляется на странице “Мои курсы”.'],
          ['Можно сменить формат', 'Новый тариф оформляется отдельной покупкой.'],
        ].map(([title, text]) => (
          <article key={title}>
            <span>ALIF</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function PaymentPage({ profile, selectedPlan, isLoggedIn, onCompletePayment, onProfileChange, onRequireLogin, onRequireRegister }) {
  const [selectedSlot, setSelectedSlot] = useState(bookingSlots[0]);
  const [method, setMethod] = useState('card');
  const [promoCode, setPromoCode] = useState(profile.promoCode || 'ALIFSTART');
  const [contact, setContact] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
  });
  const [card, setCard] = useState({ number: '', date: '', cvc: '' });
  const [accepted, setAccepted] = useState(true);
  const promo = getPromo(promoCode);
  const discount = getDiscount(selectedPlan, promoCode);
  const total = Math.max(selectedPlan.price - discount, 0);
  const canPay = accepted && contact.email.includes('@') && contact.name.trim().length > 1;

  function updateContact(field, value) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  function submitPayment() {
    if (!canPay) return;
    const cleanPromo = promoCode.trim().toUpperCase();
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }

    const nextCourse = createCourseRecord({
      plan: selectedPlan,
      slot: selectedSlot,
      promoCode: cleanPromo,
      discount,
      total,
      method,
    });
    onProfileChange({ ...contact, promoCode: cleanPromo, planId: selectedPlan.id });
    onCompletePayment(nextCourse);
  }

  return (
    <div className="page">
      <PageHero
        eyebrow="Оплата и запись"
        title={`Оформление тарифа ${selectedPlan.name}`}
        visual={heroPayment}
      />
      <section className="checkout-pro">
        <div className="checkout-main">
          <div className="checkout-steps pro">
            {['Курс', 'Контакты', 'Оплата'].map((item, index) => (
              <span className="done" key={item}>{index + 1}. {item}</span>
            ))}
          </div>

          <section className="checkout-card selected-course-card">
            <div className="section-head">
              <div>
                <p className="eyebrow">Выбранный курс</p>
                <h2>{selectedPlan.name}</h2>
              </div>
              <strong>{formatPrice(selectedPlan.price)}</strong>
            </div>
            <p>{selectedPlan.result}</p>
            <div className="checkout-feature-grid">
              {selectedPlan.features.map((feature) => <span key={feature}><CheckCircle2 size={16} /> {feature}</span>)}
            </div>
          </section>

          <section className="checkout-card booking-pro">
            <div className="section-head">
              <div>
                <p className="eyebrow">Запись</p>
                <h2>Дата старта</h2>
              </div>
              <span><CalendarDays size={18} /> ближайшие группы</span>
            </div>
            <div className="slot-grid-pro">
              {bookingSlots.map((slot) => (
                <button className={selectedSlot.id === slot.id ? 'selected' : ''} key={slot.id} type="button" onClick={() => setSelectedSlot(slot)}>
                  <span>{slot.day}</span>
                  <strong>{slot.date}</strong>
                  <small>{slot.time}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="checkout-card">
            <div className="section-head">
              <div>
                <p className="eyebrow">Контакты</p>
                <h2>Куда открыть доступ</h2>
              </div>
              <span><Lock size={18} /> сохраняется локально</span>
            </div>
            <div className="form-grid">
              <label className="field">Имя<input value={contact.name} onChange={(event) => updateContact('name', event.target.value)} /></label>
              <label className="field">Email<input value={contact.email} type="email" onChange={(event) => updateContact('email', event.target.value)} /></label>
              <label className="field wide">Телефон<input value={contact.phone} onChange={(event) => updateContact('phone', event.target.value)} /></label>
            </div>
          </section>

          <section className="checkout-card">
            <div className="section-head">
              <div>
                <p className="eyebrow">Способ оплаты</p>
                <h2>Платежные данные</h2>
              </div>
              <span><CreditCard size={18} /> демо-режим</span>
            </div>
            <div className="payment-methods pro">
              {paymentMethods.map(([id, title, text]) => (
                <button className={method === id ? 'selected' : ''} key={id} type="button" onClick={() => setMethod(id)}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </button>
              ))}
            </div>
            {method === 'card' && (
              <div className="card-fields">
                <label className="field wide">Номер карты<input value={card.number} onChange={(event) => setCard((current) => ({ ...current, number: event.target.value }))} placeholder="0000 0000 0000 0000" /></label>
                <label className="field">Срок<input value={card.date} onChange={(event) => setCard((current) => ({ ...current, date: event.target.value }))} placeholder="MM/YY" /></label>
                <label className="field">CVC<input value={card.cvc} onChange={(event) => setCard((current) => ({ ...current, cvc: event.target.value }))} placeholder="000" /></label>
              </div>
            )}
          </section>
        </div>

        <aside className="order-summary-pro">
          <p className="eyebrow">Итого</p>
          <h2>{selectedPlan.name}</h2>
          <p>{selectedSlot.day}, {selectedSlot.date} · {selectedSlot.time}</p>
          <PromoInput value={promoCode} onChange={setPromoCode} promo={promo} discount={discount} />
          <div className="summary-lines">
            <span><small>Курс</small><strong>{formatPrice(selectedPlan.price)}</strong></span>
            <span><small>Скидка</small><strong>{discount ? `-${formatPrice(discount)}` : '0 ₽'}</strong></span>
            <span className="total"><small>К оплате</small><strong>{formatPrice(total)}</strong></span>
          </div>
          {!isLoggedIn && (
            <div className="checkout-auth-lock">
              <Lock size={18} />
              <div>
                <strong>Войдите перед оплатой</strong>
                <p>Так курс закрепится за вашим аккаунтом и появится в разделе “Мои курсы”.</p>
              </div>
              <button type="button" onClick={onRequireLogin}>Вход</button>
              <button type="button" onClick={onRequireRegister}>Регистрация</button>
            </div>
          )}
          <label className="checkout-consent">
            <input type="checkbox" checked={accepted} onChange={() => setAccepted((value) => !value)} />
            <span>Согласен с условиями доступа к курсу</span>
          </label>
          <ActionButton icon={Receipt} onClick={submitPayment} disabled={!canPay || !isLoggedIn}>Оплатить курс</ActionButton>
        </aside>
      </section>
    </div>
  );
}

function CoursesPage({ courses, onToggleLesson, onCompleteCourse }) {
  const activeCourses = courses.filter((course) => course.status !== 'completed');
  const completedCourses = courses.filter((course) => course.status === 'completed');

  return (
    <div className="page">
      <PageHero
        eyebrow="Мои курсы"
        title="Купленные курсы и доступы"
        visual={heroCourses}
      />
      <section className="courses-page">
        {courses.length === 0 ? (
          <article className="empty-courses">
            <BookOpen size={34} />
            <h2>Пока нет купленных курсов</h2>
            <p>Выбери тариф, пройди оплату, и курс появится здесь автоматически.</p>
            <LinkButton to="pricing" icon={ArrowRight}>Выбрать тариф</LinkButton>
          </article>
        ) : (
          <>
            <div className="section-head">
              <div>
                <p className="eyebrow">Активные</p>
                <h2>Текущие покупки</h2>
              </div>
              <LinkButton to="pricing" variant="outline">Добавить курс</LinkButton>
            </div>
            <div className="course-grid">
              {activeCourses.map((course) => {
                const courseLessons = courseLessonsByPlan[course.planId] || courseLessonsByPlan.base;
                const completedLessonIds = course.completedLessonIds || [];
                const progress = Math.min(100, Math.max(0, Math.round((completedLessonIds.length / courseLessons.length) * 100)));
                return (
                  <article className="course-card" key={course.id}>
                    <span>{course.planName}</span>
                    <h3>{course.format}</h3>
                    <p>{course.start?.day}, {course.start?.date} · {course.start?.time}</p>
                    <div className="course-progress">
                      <i style={{ width: `${progress}%` }} />
                    </div>
                    <strong>{progress}% курса</strong>
                    <div className="course-lesson-checklist">
                      {courseLessons.map((lesson, index) => {
                        const isDone = completedLessonIds.includes(lesson.id);
                        return (
                          <button
                            className={isDone ? 'done' : ''}
                            key={lesson.id}
                            type="button"
                            onClick={() => onToggleLesson(course.id, lesson.id)}
                          >
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <div>
                              <strong>{lesson.title}</strong>
                              <small>{lesson.duration} минут</small>
                            </div>
                            <b>{isDone ? 'пройден' : 'не пройден'}</b>
                          </button>
                        );
                      })}
                    </div>
                    <div className="course-actions">
                      <ActionButton variant="outline" onClick={() => onCompleteCourse(course.id)}>Отметить пройденным</ActionButton>
                    </div>
                  </article>
                );
              })}
            </div>

            <section className="course-history">
              <p className="eyebrow">История</p>
              <h2>Пройденные курсы</h2>
              <div className="history-list">
                {(completedCourses.length ? completedCourses : courses.slice(0, 1)).map((course) => (
                  <article key={`${course.id}-history`}>
                    <span>{course.planName}</span>
                    <strong>{formatPrice(course.total)}</strong>
                    <small>{course.status === 'completed' ? 'завершен' : 'активен'} · промокод {course.promoCode || 'нет'}</small>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </div>
  );
}

function AuthPage({ mode = 'login', onLogin, onRegister }) {
  const [activeMode, setActiveMode] = useState(mode);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [step, setStep] = useState('email');
  const [pendingCode, setPendingCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [mailStatus, setMailStatus] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setActiveMode(mode);
    setStep('email');
    setPendingCode('');
    setCodeInput('');
    setMailStatus('');
    setCodeError('');
  }, [mode]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function requestCode() {
    const email = form.email.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      setCodeError('Введите рабочую почту.');
      return;
    }

    const nextCode = generateAuthCode();
    setIsSending(true);
    setCodeError('');
    setMailStatus('');

    try {
      const result = await sendAuthCode(email, nextCode, activeMode);
      setPendingCode(nextCode);
      setStep('code');
      setCodeInput('');
      setMailStatus(result.message);
    } catch (error) {
      setCodeError(`Письмо не отправилось: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  }

  function finishAuth() {
    if (codeInput.trim() !== pendingCode) {
      setCodeError('Код не совпадает. Проверь письмо и попробуй еще раз.');
      return;
    }

    const nextProfile = {
      ...form,
      email: form.email.trim().toLowerCase(),
      name: form.name.trim() || defaultProfile.name,
    };

    if (activeMode === 'register') onRegister(nextProfile);
    else onLogin(nextProfile);
  }

  function submit(event) {
    event.preventDefault();
    if (step === 'code') finishAuth();
    else requestCode();
  }

  function switchMode(nextMode) {
    setActiveMode(nextMode);
    setStep('email');
    setPendingCode('');
    setCodeInput('');
    setMailStatus('');
    setCodeError('');
  }

  return (
    <div className="page">
      <PageHero
        eyebrow={activeMode === 'register' ? 'Регистрация' : 'Вход'}
        title="Личный кабинет ученика"
        visual={heroAuth}
      />
      <section className="auth-section">
        <form className="auth-card" onSubmit={submit}>
          <p className="eyebrow">ALIF Arabic</p>
          <div className="auth-intro" key={`${activeMode}-${step}`}>
            <h2>{step === 'code' ? 'Введите код из письма' : activeMode === 'register' ? 'Создать аккаунт' : 'Войти по почте'}</h2>
            <p className="auth-copy">
              {step === 'code'
                ? `Мы отправили код на ${form.email.trim().toLowerCase()}.`
                : 'Сначала укажи почту, затем появится поле для подтверждения кода.'}
            </p>
          </div>
          <div className={`auth-switch ${activeMode === 'register' ? 'register' : 'login'}`}>
            <button className={activeMode === 'login' ? 'active' : ''} type="button" onClick={() => switchMode('login')}>Вход</button>
            <button className={activeMode === 'register' ? 'active' : ''} type="button" onClick={() => switchMode('register')}>Регистрация</button>
          </div>

          {step === 'email' ? (
            <div className="form-grid">
              {activeMode === 'register' && (
                <label className="field">Имя<input value={form.name} onChange={(event) => update('name', event.target.value)} /></label>
              )}
              <label className={`field ${activeMode === 'login' ? 'wide' : ''}`}>
                Email
                <input value={form.email} type="email" onChange={(event) => update('email', event.target.value)} placeholder="you@mail.ru" />
              </label>
              {activeMode === 'register' && (
                <label className="field">Телефон<input value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label>
              )}
            </div>
          ) : (
            <div className="code-menu">
              <span>Код подтверждения</span>
              <input
                autoFocus
                inputMode="numeric"
                maxLength="6"
                pattern="[0-9]*"
                value={codeInput}
                onChange={(event) => {
                  setCodeInput(event.target.value.replace(/\D/g, '').slice(0, 6));
                  setCodeError('');
                }}
                placeholder="000000"
              />
              <div className="code-menu-actions">
                <button type="button" onClick={requestCode} disabled={isSending}>Отправить еще раз</button>
                <button type="button" onClick={() => setStep('email')}>Изменить почту</button>
              </div>
            </div>
          )}

          {mailStatus && <div className="auth-status">{mailStatus}</div>}
          {codeError && <div className="auth-error">{codeError}</div>}

          <div className="auth-card-actions">
            <button className="button primary" type="submit" disabled={isSending}>
              {isSending ? 'Отправляем...' : step === 'code' ? 'Подтвердить код' : 'Получить код'}
            </button>
          </div>
        </form>
        <aside className="auth-benefits">
          {[
            ['01', 'Профиль', 'Контакты, цель, уровень и настройки.'],
            ['02', 'Курсы', 'Все покупки и активные доступы отдельно от профиля.'],
            ['03', 'История', 'Завершенные курсы остаются внизу кабинета.'],
          ].map(([num, title, text]) => (
            <article key={title}>
              <span>{num}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </aside>
      </section>
    </div>
  );
}

function ProfilePage({
  profile,
  onSave,
  selectedPlan,
  booking,
  courses,
  completedTasks,
  onToggleTask,
  note,
  onNoteChange,
  onLogout,
}) {
  const [draft, setDraft] = useState(profile);
  const [promoCode, setPromoCode] = useState(profile.promoCode || booking?.promoCode || 'ALIFSTART');
  const activePromo = getPromo(promoCode);
  const discount = getDiscount(selectedPlan, promoCode);
  const currentTotal = Math.max(selectedPlan.price - discount, 0);
  const activeCourse = courses.find((course) => course.status !== 'completed');
  const completedCourses = courses.filter((course) => course.status === 'completed');

  useEffect(() => {
    setDraft(profile);
    setPromoCode(profile.promoCode || booking?.promoCode || 'ALIFSTART');
  }, [profile, booking?.promoCode]);

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update('photo', reader.result);
    reader.readAsDataURL(file);
  }

  function saveProfile(patch = {}) {
    const nextProfile = { ...draft, promoCode: promoCode.trim().toUpperCase(), ...patch };
    setDraft(nextProfile);
    onSave(nextProfile);
  }

  return (
    <div className="page">
      <PageHero
        eyebrow="Профиль"
        title="Личный кабинет без лишнего шума"
        visual={heroProfile}
      />
      <section className="profile-pro refined-profile">
        <aside className="student-card">
          <label className="avatar-upload">
            <input accept="image/*" type="file" onChange={handlePhoto} />
            {draft.photo ? <img src={draft.photo} alt={draft.name || 'Фото ученика'} /> : <span>{initials(draft.name)}</span>}
            <b><Camera size={16} /> Фото</b>
          </label>
          <h2>{draft.name || 'Ученик'}</h2>
          <p>{draft.city} · уровень {draft.level}</p>
          <div className="profile-mini-stats">
            <span>{courses.length} покупок</span>
            <span>{draft.minutes} мин/день</span>
            <span>{completedTasks.length}/{tasks.length} задач</span>
          </div>
          <div className="student-actions">
            <LinkButton to="courses" variant="primary" icon={BookOpen}>Мои курсы</LinkButton>
            <ActionButton variant="outline danger" onClick={onLogout}>Выйти</ActionButton>
          </div>
        </aside>

        <div className="profile-workspace">
          <section className="profile-summary">
            <article className="summary-tile dark">
              <span>Активный курс</span>
              <strong>{activeCourse?.planName || booking?.planName || selectedPlan.name}</strong>
              <p>{activeCourse?.format || booking?.format || selectedPlan.format}</p>
            </article>
            <article className="summary-tile">
              <span>Старт</span>
              <strong>{booking ? booking.date : 'Не выбран'}</strong>
              <p>{booking ? `${booking.day}, ${booking.time}` : 'Оформление доступно на странице оплаты.'}</p>
            </article>
            <article className="summary-tile">
              <span>Оплачено</span>
              <strong>{activeCourse ? formatPrice(activeCourse.total) : '0 ₽'}</strong>
              <p>{activeCourse ? `Способ: ${activeCourse.method}` : 'Курс появится после оплаты.'}</p>
            </article>
          </section>

          <section className="promo-card profile-promo">
            <div>
              <p className="eyebrow">Промокод</p>
              <h2>{activePromo ? activePromo.title : 'Код не применен'}</h2>
              <p>{activePromo ? activePromo.text : 'Сохрани рабочий промокод в профиле, чтобы он подставлялся на странице оплаты.'}</p>
            </div>
            <div className="promo-control">
              <PromoInput value={promoCode} onChange={setPromoCode} promo={activePromo} discount={discount} compact />
              <strong>{discount ? `-${formatPrice(discount)}` : '0 ₽'}</strong>
              <span>Итого по текущему тарифу: {formatPrice(currentTotal)}</span>
              <ActionButton variant="outline" icon={BadgePercent} onClick={() => saveProfile()}>Сохранить код</ActionButton>
            </div>
          </section>

          <section className="profile-bottom-grid">
            <div className="tasks-card">
              <p className="eyebrow">На сегодня</p>
              {tasks.map((task) => (
                <label className="task-row" key={task}>
                  <input checked={completedTasks.includes(task)} type="checkbox" onChange={() => onToggleTask(task)} />
                  <span>{task}</span>
                </label>
              ))}
            </div>
            <label className="note-box profile-note">
              Заметка к обучению
              <textarea value={note} onChange={(event) => onNoteChange(event.target.value)} placeholder="Например: повторить формы букв перед созвоном" />
            </label>
          </section>

          <section className="profile-session-card account-panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Данные</p>
                <h2>Профиль и настройки</h2>
              </div>
              <span><ShieldCheck size={18} /> сохраняется локально</span>
            </div>
            <div className="form-grid">
              <label className="field">Имя<input value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
              <label className="field">Email<input value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
              <label className="field">Телефон<input value={draft.phone} onChange={(event) => update('phone', event.target.value)} /></label>
              <label className="field">Город<input value={draft.city} onChange={(event) => update('city', event.target.value)} /></label>
              <label className="field wide">Цель<input value={draft.goal} onChange={(event) => update('goal', event.target.value)} /></label>
              <label className="field">Уровень
                <select value={draft.level} onChange={(event) => update('level', event.target.value)}>
                  <option>A0</option>
                  <option>A1</option>
                  <option>A2</option>
                </select>
              </label>
              <label className="field">Минут в день
                <input min="10" max="90" type="number" value={draft.minutes} onChange={(event) => update('minutes', Number(event.target.value))} />
              </label>
            </div>
            <div className="settings-grid compact-settings">
              <button className={draft.notifications ? 'active' : ''} type="button" onClick={() => update('notifications', !draft.notifications)}>
                <CheckCircle2 size={16} /> Уведомления
              </button>
              <button className={draft.darkMode ? 'active' : ''} type="button" onClick={() => update('darkMode', !draft.darkMode)}>
                <CheckCircle2 size={16} /> Темная тема
              </button>
            </div>
            <div className="profile-settings-actions">
              <ActionButton onClick={() => saveProfile()}>Сохранить изменения</ActionButton>
              <LinkButton to="payment" variant="outline">Оформить курс</LinkButton>
            </div>
          </section>

          <section className="course-history profile-course-history">
            <p className="eyebrow">История</p>
            <h2>Пройденные курсы</h2>
            <div className="history-list">
              {(completedCourses.length ? completedCourses : courses.slice(0, 2)).map((course) => (
                <article key={`${course.id}-profile-history`}>
                  <span>{course.planName}</span>
                  <strong>{formatPrice(course.total)}</strong>
                  <small>{course.status === 'completed' ? 'завершен' : 'активен'} · {course.start?.date || 'дата не выбрана'}</small>
                </article>
              ))}
              {courses.length === 0 && (
                <article>
                  <span>Пока пусто</span>
                  <strong>Нет покупок</strong>
                  <small>История появится после оплаты курса.</small>
                </article>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function FaqPage() {
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const visibleItems = faqItems.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="page">
      <PageHero
        eyebrow="Поддержка"
        title="Вопросы перед стартом"
        visual={heroFaq}
      >
        <label className="search-box">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти вопрос" />
        </label>
      </PageHero>
      <section className="faq-section">
        <div className="faq-list">
          {visibleItems.map(([question, answer], index) => (
            <article className={openIndex === index ? 'open' : ''} key={question}>
              <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span>0{index + 1}</span>
                <h3>{question}</h3>
                <b>{openIndex === index ? '-' : '+'}</b>
              </button>
              <p>{answer}</p>
            </article>
          ))}
        </div>
        <aside className="support-card">
          <p className="eyebrow">Связь</p>
          <h2>Нужна помощь?</h2>
          <p>Оставь заявку, и менеджер подскажет тариф, график и формат обучения.</p>
          <div className="support-actions">
            <ActionButton onClick={() => setSent(true)}>Отправить заявку</ActionButton>
            {sent && <strong>Заявка подготовлена. Мы свяжемся с тобой.</strong>}
          </div>
        </aside>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <span>ALIF ARABIC</span>
      <span>Reading / Speaking / Culture</span>
      <span>2026</span>
    </footer>
  );
}

function Toast({ message }) {
  return message ? <div className="toast">{message}</div> : null;
}

function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [profile, setProfile] = useState(() => getStored('alif-profile', defaultProfile));
  const [selectedPlanId, setSelectedPlanId] = useState(() => getStored('alif-plan', profile.planId || 'pro'));
  const [completedTasks, setCompletedTasks] = useState(() => getStored('alif-tasks', [tasks[0]]));
  const [note, setNote] = useState(() => getStored('alif-note', ''));
  const [booking, setBooking] = useState(() => getStored('alif-booking', null));
  const [courses, setCourses] = useState(() => getStored('alif-courses', []));
  const [toast, setToast] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => getStored('alif-auth', false));
  const [authMode, setAuthMode] = useState('login');
  const [pendingCheckout, setPendingCheckout] = useState(false);

  const selectedPlan = useMemo(() => plans.find((plan) => plan.id === selectedPlanId) || plans[1], [selectedPlanId]);
  const activeCourseForProgress = courses.find((course) => course.status !== 'completed');
  const progress = activeCourseForProgress
    ? Math.min(100, Math.max(0, Math.round((activeCourseForProgress.lessonsDone / activeCourseForProgress.lessonsTotal) * 100)))
    : courses.some((course) => course.status === 'completed') ? 100 : 0;

  useEffect(() => {
    const handleRoute = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  useEffect(() => localStorage.setItem('alif-profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('alif-plan', JSON.stringify(selectedPlanId)), [selectedPlanId]);
  useEffect(() => localStorage.setItem('alif-tasks', JSON.stringify(completedTasks)), [completedTasks]);
  useEffect(() => localStorage.setItem('alif-note', JSON.stringify(note)), [note]);
  useEffect(() => localStorage.setItem('alif-booking', JSON.stringify(booking)), [booking]);
  useEffect(() => localStorage.setItem('alif-courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('alif-auth', JSON.stringify(isLoggedIn)), [isLoggedIn]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    document.documentElement.dataset.theme = profile.darkMode ? 'dark' : 'light';
  }, [profile.darkMode]);

  useEffect(() => {
    updateSeo(page);
  }, [page]);

  useEffect(() => {
    if (page === 'payment' && !isLoggedIn) {
      setPendingCheckout(true);
      setAuthMode('register');
    }
  }, [page, isLoggedIn]);

  function selectPlan(planId, goToPayment = false) {
    setSelectedPlanId(planId);
    setProfile((current) => ({ ...current, planId }));
    setToast('Тариф выбран');
    if (goToPayment) {
      if (isLoggedIn) {
        navigate('payment');
      } else {
        setPendingCheckout(true);
        setAuthMode('register');
        setToast('Войдите или зарегистрируйтесь, чтобы оформить тариф');
        navigate('profile');
      }
    }
  }

  function toggleTask(task) {
    setCompletedTasks((current) => (current.includes(task) ? current.filter((item) => item !== task) : [...current, task]));
  }

  function updateProfile(patch) {
    setProfile((current) => ({ ...current, ...patch }));
  }

  function login(patch = {}) {
    setProfile((current) => ({ ...current, ...patch }));
    setIsLoggedIn(true);
    setToast('Вход выполнен');
    if (pendingCheckout) {
      setPendingCheckout(false);
      navigate('payment');
    } else {
      navigate('profile');
    }
  }

  function register(patch = {}) {
    setProfile((current) => ({ ...current, ...patch }));
    setIsLoggedIn(true);
    setToast('Аккаунт создан');
    if (pendingCheckout) {
      setPendingCheckout(false);
      navigate('payment');
    } else {
      navigate('profile');
    }
  }

  function completePayment(course) {
    setBooking({
      ...course.start,
      method: course.method,
      promoCode: course.promoCode,
      planId: course.planId,
      planName: course.planName,
      format: course.format,
      total: course.total,
    });
    setCourses((current) => [course, ...current]);
    setSelectedPlanId(course.planId);
    setIsLoggedIn(true);
    setToast('Курс оплачен и добавлен в “Мои курсы”');
    navigate('courses');
  }

  function completeCourse(courseId) {
    setCourses((current) => current.map((course) => (
      course.id === courseId ? { ...course, status: 'completed', completedAt: new Date().toISOString() } : course
    )));
    setToast('Курс перенесен в историю');
  }

  function toggleCourseLesson(courseId, lessonId) {
    setCourses((current) => current.map((course) => {
      if (course.id !== courseId) return course;
      const completedLessonIds = course.completedLessonIds || [];
      const nextCompletedLessonIds = completedLessonIds.includes(lessonId)
        ? completedLessonIds.filter((id) => id !== lessonId)
        : [...completedLessonIds, lessonId];

      return {
        ...course,
        completedLessonIds: nextCompletedLessonIds,
        lessonsDone: nextCompletedLessonIds.length,
      };
    }));
  }

  function logout() {
    setIsLoggedIn(false);
    setToast('Вы вышли из аккаунта');
    navigate('home');
  }

  return (
    <main>
      <Header
        activePage={page}
        profile={profile}
        isLoggedIn={isLoggedIn}
        onLogin={() => {
          setAuthMode('login');
          navigate('profile');
        }}
        onRegister={() => {
          setAuthMode('register');
          navigate('profile');
        }}
      />
      {page === 'home' && <HomePage progress={progress} selectedPlan={selectedPlan} onSelectPlan={selectPlan} />}
      {page === 'program' && <ProgramPage />}
      {page === 'pricing' && <PricingPage selectedPlanId={selectedPlanId} onSelectPlan={selectPlan} />}
      {page === 'payment' && (isLoggedIn ? (
        <PaymentPage
          profile={profile}
          selectedPlan={selectedPlan}
          booking={booking}
          isLoggedIn={isLoggedIn}
          onProfileChange={updateProfile}
          onCompletePayment={completePayment}
          onRequireLogin={() => {
            setAuthMode('login');
            navigate('profile');
          }}
          onRequireRegister={() => {
            setAuthMode('register');
            navigate('profile');
          }}
        />
      ) : (
        <AuthPage mode="register" onLogin={login} onRegister={register} />
      ))}
      {page === 'courses' && (isLoggedIn ? (
        <CoursesPage courses={courses} onToggleLesson={toggleCourseLesson} onCompleteCourse={completeCourse} />
      ) : (
        <AuthPage mode="login" onLogin={login} onRegister={register} />
      ))}
      {page === 'profile' && (isLoggedIn ? (
        <ProfilePage
          profile={profile}
          selectedPlan={selectedPlan}
          booking={booking}
          courses={courses}
          completedTasks={completedTasks}
          onToggleTask={toggleTask}
          note={note}
          onNoteChange={setNote}
          onLogout={logout}
          onSave={(draft) => {
            setProfile(draft);
            setToast('Профиль сохранен');
          }}
        />
      ) : (
        <AuthPage mode={authMode} onLogin={login} onRegister={register} />
      ))}
      {page === 'faq' && <FaqPage />}
      <Footer />
      <Toast message={toast} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
