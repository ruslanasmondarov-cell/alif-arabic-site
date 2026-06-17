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
import alenkaMirrorClose from './assets/photo_1_2026-06-17_19-45-00.jpg';
import alenkaMirrorSoft from './assets/photo_2_2026-06-17_19-45-00.jpg';
import alenkaDream from './assets/photo_3_2026-06-17_19-45-00.jpg';
import alenkaHoodie from './assets/photo_4_2026-06-17_19-45-00.jpg';
import alenkaWarmClose from './assets/photo_5_2026-06-17_19-45-00.jpg';
import alenkaBlue from './assets/photo_6_2026-06-17_19-45-00.jpg';
import alenkaHalfFace from './assets/photo_7_2026-06-17_19-45-00.jpg';
import alenkaMono from './assets/photo_8_2026-06-17_19-45-00.jpg';
import alenkaDeskMirror from './assets/photo_9_2026-06-17_19-45-00.jpg';

const alenkaGallery = [
  alenkaMirrorClose,
  alenkaMirrorSoft,
  alenkaDream,
  alenkaHoodie,
  alenkaWarmClose,
  alenkaBlue,
  alenkaHalfFace,
  alenkaMono,
  alenkaDeskMirror,
];

const pages = ['home', 'program', 'pricing', 'payment', 'courses', 'profile', 'faq', 'admin'];

const navItems = [
  ['home', 'Главная'],
  ['program', 'Почему она'],
  ['pricing', 'Сюрпризы'],
  ['courses', 'Моменты'],
  ['profile', 'Аленка'],
  ['faq', 'Письма'],
];

const seoByPage = {
  home: {
    title: 'Аленка Glow - сайт, посвященный Аленке',
    description: 'Аленка Glow: теплый сайт-посвящение крутой девочке Аленке, ее улыбке, характеру, моментам и маленьким сюрпризам.',
  },
  program: {
    title: 'Почему Аленка особенная - Аленка Glow',
    description: 'Раздел о том, почему Аленка такая крутая: характер, улыбка, энергия, забота и то самое ощущение дома рядом с ней.',
  },
  pricing: {
    title: 'Сюрпризы для Аленки - Аленка Glow',
    description: 'Форматы внимания для Аленки: нежное сообщение, день вместе и большой сюрприз.',
  },
  payment: {
    title: 'Оформление сюрприза - Аленка Glow',
    description: 'Выбор даты, контактов и красивого демо-оформления сюрприза для Аленки.',
  },
  courses: {
    title: 'Моменты для Аленки - Аленка Glow',
    description: 'Сохраненные планы, сюрпризы, чек-листы и история теплых моментов для Аленки.',
  },
  profile: {
    title: 'Профиль Аленки - Аленка Glow',
    description: 'Личный уголок Аленки: фото, любимые детали, заметки, планы и настройки сайта-посвящения.',
  },
  faq: {
    title: 'Письма и ответы - Аленка Glow',
    description: 'Нежные ответы, идеи сообщений и форма, чтобы оставить Аленке еще одно теплое послание.',
  },
};

const plans = [
  {
    id: 'base',
    name: 'Нежность',
    price: 9900,
    accent: 'Теплый знак внимания',
    text: 'Красивое сообщение, маленький план дня и несколько причин, почему Аленка такая любимая.',
    format: 'Личное письмо',
    schedule: 'один вечер, который легко запомнить',
    process: 'Выбирается настроение, дата и набор слов, которые хочется оставить только для нее.',
    result: 'Идеально, если хочется сказать Аленке простое, честное и очень теплое “ты важна”.',
    features: ['личное письмо', '3 причины улыбнуться', 'план уютного вечера', 'сохранение в моментах'],
  },
  {
    id: 'pro',
    name: 'Сияние',
    price: 18900,
    accent: 'Самый романтичный',
    text: 'Мини-праздник для Аленки: комплименты, маршрут свидания, плейлист и список маленьких радостей.',
    format: 'День для Аленки',
    schedule: 'вечер вместе и несколько приятных деталей',
    process: 'Собирается цельный сценарий: куда пойти, что сказать, что подарить и чем закончить день.',
    result: 'Лучший вариант, если хочется, чтобы Аленка почувствовала себя главной героиней.',
    features: ['все из “Нежность”', 'план свидания', 'плейлист настроения', 'чек-лист подарка'],
  },
  {
    id: 'vip',
    name: 'Навсегда',
    price: 39900,
    accent: 'Большое посвящение',
    text: 'Полная капсула чувств: письмо, планы, история моментов и отдельное место для ваших будущих воспоминаний.',
    format: 'Большой сюрприз',
    schedule: 'особенная дата и продолжение после нее',
    process: 'Сайт превращается в личную вселенную Аленки с планами, заметками и историей теплых дней.',
    result: 'Для момента, который хочется сделать большим, красивым и по-настоящему личным.',
    features: ['все из “Сияние”', 'капсула воспоминаний', 'персональный план', 'история моментов'],
  },
];

const promoCodes = {
  ALENKA: {
    title: 'Код для Аленки',
    discount: 2000,
    text: 'Маленький знак, что этот сайт с самого начала сделан только для нее.',
    coursePage: 'program',
  },
  LOVE10: {
    title: 'Плюс к нежности',
    percent: 10,
    text: 'Минус 10% к сумме и плюс один повод сказать Аленке что-то хорошее.',
    coursePage: 'pricing',
  },
};

const modules = [
  {
    id: 'letters',
    num: '01',
    title: 'Ее улыбка',
    text: 'Та самая улыбка, после которой день становится мягче, светлее и как будто правильнее.',
    focus: 'Свет',
    lessons: ['Когда она смеется', 'Как меняется день', 'Почему это ценно'],
  },
  {
    id: 'speaking',
    num: '02',
    title: 'Ее характер',
    text: 'Аленка крутая не потому что старается казаться такой, а потому что в ней правда есть сила.',
    focus: 'Сила',
    lessons: ['Смелость', 'Нежность', 'Своя энергия'],
  },
  {
    id: 'grammar',
    num: '03',
    title: 'Наши моменты',
    text: 'Маленькие сцены, фразы и взгляды, которые не хочется терять среди обычных дней.',
    focus: 'Память',
    lessons: ['Первый смех', 'Любимые места', 'Фразы только ваши'],
  },
  {
    id: 'sprint',
    num: '04',
    title: 'Будущие планы',
    text: 'Все, что хочется сделать для нее: свидания, поездки, подарки и спокойные вечера рядом.',
    focus: 'Будущее',
    lessons: ['Свидание', 'Путешествие', 'Большой сюрприз'],
  },
];

const lessons = [
  { id: '01', module: 'letters', title: 'Улыбка, которая лечит день', duration: 17, status: 'open' },
  { id: '02', module: 'letters', title: 'Свет в обычных мелочах', duration: 21, status: 'open' },
  { id: '03', module: 'speaking', title: 'Почему она крутая', duration: 16, status: 'open' },
  { id: '04', module: 'speaking', title: 'Нежность и характер', duration: 23, status: 'open' },
  { id: '05', module: 'grammar', title: 'Любимые воспоминания', duration: 18, status: 'next' },
  { id: '06', module: 'sprint', title: 'План большого сюрприза', duration: 21, status: 'locked' },
];

const courseLessonsByPlan = {
  base: [
    { id: 'base-01', title: 'Написать Аленке теплое письмо', duration: 18 },
    { id: 'base-02', title: 'Собрать 5 причин любоваться ей', duration: 22 },
    { id: 'base-03', title: 'Выбрать маленький подарок', duration: 20 },
    { id: 'base-04', title: 'Запланировать уютный вечер', duration: 16 },
    { id: 'base-05', title: 'Сказать все лично', duration: 24 },
  ],
  pro: [
    { id: 'pro-01', title: 'Продумать день для Аленки', duration: 18 },
    { id: 'pro-02', title: 'Выбрать место для свидания', duration: 22 },
    { id: 'pro-03', title: 'Подготовить слова без пафоса', duration: 19 },
    { id: 'pro-04', title: 'Собрать плейлист настроения', duration: 24 },
    { id: 'pro-05', title: 'Добавить маленький сюрприз', duration: 21 },
    { id: 'pro-06', title: 'Сделать фото на память', duration: 26 },
    { id: 'pro-07', title: 'Закончить вечер признанием', duration: 30 },
  ],
  vip: [
    { id: 'vip-01', title: 'Выбрать особенную дату', duration: 25 },
    { id: 'vip-02', title: 'Собрать капсулу воспоминаний', duration: 30 },
    { id: 'vip-03', title: 'Написать большое письмо', duration: 28 },
    { id: 'vip-04', title: 'Подготовить маршрут дня', duration: 26 },
    { id: 'vip-05', title: 'Добавить подарок со смыслом', duration: 32 },
    { id: 'vip-06', title: 'Сделать место для новых моментов', duration: 34 },
    { id: 'vip-07', title: 'Показать Аленке сайт', duration: 30 },
    { id: 'vip-08', title: 'Запланировать продолжение', duration: 22 },
  ],
};

const tasks = [
  'Написать Аленке один честный комплимент',
  'Выбрать место для следующей прогулки',
  'Добавить в заметку новую идею сюрприза',
];

const bookingSlots = [
  { id: 'mon-1900', day: 'Понедельник', date: '25 мая', time: '19:00' },
  { id: 'wed-1800', day: 'Среда', date: '27 мая', time: '18:00' },
  { id: 'thu-2000', day: 'Четверг', date: '28 мая', time: '20:00' },
  { id: 'sat-1200', day: 'Суббота', date: '30 мая', time: '12:00' },
];

const paymentMethods = [
  ['card', 'Красивое обещание', 'сохранить сюрприз и довести до конца'],
  ['wallet', 'Подарок руками', 'сделать что-то личное и настоящее'],
  ['invoice', 'План на день', 'разложить внимание по шагам'],
];

const adminLogin = 'admin';
const adminPassword = 'admin123';
const learningStatuses = ['Новый', 'Готовится', 'Подарен', 'Пауза'];
const adminTariffs = ['Нежность', 'Сияние', 'Навсегда'];

const demoRegistrations = [
  { id: 'demo-user-1', name: 'Аленка', email: 'alenka@example.com', phone: '+7 900 111-22-33', registeredAt: '2026-06-05T10:00:00.000Z', status: 'Главная' },
  { id: 'demo-user-2', name: 'Любимый человек', email: 'love@example.com', phone: '+7 900 222-33-44', registeredAt: '2026-06-09T12:00:00.000Z', status: 'Готовит сюрприз' },
  { id: 'demo-user-3', name: 'Будущий момент', email: 'moment@example.com', phone: '+7 900 333-44-55', registeredAt: '2026-06-12T09:00:00.000Z', status: 'В планах' },
];

const demoCourses = [
  {
    id: 'demo-course-1',
    userName: 'Аленка',
    email: 'alenka@example.com',
    phone: '+7 900 111-22-33',
    planId: 'base',
    planName: 'Нежность',
    total: 7900,
    promoCode: 'ALENKA',
    paidAt: '2026-06-05T10:20:00.000Z',
    paymentStatus: 'Сохранено / демо',
    status: 'active',
    lessonsTotal: 5,
    lessonsDone: 1,
    completedLessonIds: ['base-01'],
    start: { day: 'Понедельник', date: '20 июня', time: '19:00' },
  },
  {
    id: 'demo-course-2',
    userName: 'Любимый человек',
    email: 'love@example.com',
    phone: '+7 900 222-33-44',
    planId: 'pro',
    planName: 'Сияние',
    total: 17010,
    promoCode: 'LOVE10',
    paidAt: '2026-06-09T13:30:00.000Z',
    paymentStatus: 'Сохранено / демо',
    status: 'active',
    lessonsTotal: 7,
    lessonsDone: 3,
    completedLessonIds: ['pro-01', 'pro-02', 'pro-03'],
    start: { day: 'Среда', date: '18 июня', time: '18:00' },
  },
  {
    id: 'demo-course-3',
    userName: 'Будущий момент',
    email: 'moment@example.com',
    phone: '+7 900 333-44-55',
    planId: 'vip',
    planName: 'Навсегда',
    total: 39900,
    promoCode: '',
    paidAt: '2026-06-12T15:10:00.000Z',
    paymentStatus: 'Сохранено / демо',
    status: 'active',
    lessonsTotal: 8,
    lessonsDone: 0,
    completedLessonIds: [],
    start: { day: 'Суббота', date: '25 июня', time: '12:00' },
  },
];

const faqItems = [
  ['Почему сайт про Аленку?', 'Потому что Аленка крутая девочка, ради которой хочется делать красивые вещи и говорить хорошие слова вслух.'],
  ['Что здесь можно сохранить?', 'Планы, идеи сюрпризов, заметки, даты и маленькие воспоминания, которые хочется не потерять.'],
  ['Это настоящий магазин?', 'Нет. Это демо-оформление подарков и моментов: все сохраняется локально, чтобы сайт ощущался живым.'],
  ['Можно менять формат сюрприза?', 'Да. Можно выбрать “Нежность”, “Сияние” или “Навсегда” и собрать настроение под конкретный день.'],
  ['Что главное на этом сайте?', 'Главное, чтобы Аленка увидела: о ней думали, ее ценят, ею гордятся и ей посвящают целый сайт.'],
];

const defaultProfile = {
  name: 'Аленка',
  email: 'alenka@mail.ru',
  phone: '+7 900 000-00-00',
  photo: '',
  city: 'Владивосток',
  goal: 'Сиять, улыбаться и быть самой любимой',
  level: 'Glow',
  minutes: 20,
  planId: 'pro',
  promoCode: 'ALENKA',
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

function formatAdminDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function normalizeTariffName(value) {
  const plan = String(value || '').toLowerCase();
  if (plan.includes('vip') || plan.includes('навсегда')) return 'Навсегда';
  if (plan.includes('pro') || plan.includes('сияние')) return 'Сияние';
  return 'Нежность';
}

function normalizeLearningStatus(value, fallback = 'Новый') {
  return learningStatuses.includes(value) ? value : fallback;
}

function uniqueByEmail(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = (item.email || item.id || '').toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function makeRegistration(profile, status = 'Новый') {
  return {
    id: profile.id || `user-${Date.now()}`,
    name: profile.name || 'Аленка',
    email: (profile.email || '').trim().toLowerCase(),
    phone: profile.phone || '',
    registeredAt: profile.registeredAt || new Date().toISOString(),
    status,
  };
}

function getCourseProgress(course) {
  if (Number.isFinite(course.adminProgress)) return course.adminProgress;
  const total = course.lessonsTotal || (courseLessonsByPlan[course.planId] || []).length || 1;
  const done = course.lessonsDone || (course.completedLessonIds || []).length || 0;
  return Math.min(100, Math.max(0, Math.round((done / total) * 100)));
}

function getCurrentLesson(course) {
  const lessons = courseLessonsByPlan[course.planId] || courseLessonsByPlan.base;
  const done = course.lessonsDone || (course.completedLessonIds || []).length || 0;
  return lessons[Math.min(done, lessons.length - 1)]?.title || 'Момент 1';
}

function getLessonState(planId, completedLessonIds = []) {
  const lessons = courseLessonsByPlan[planId] || courseLessonsByPlan.base;
  const completed = completedLessonIds.filter((lessonId) => lessons.some((lesson) => lesson.id === lessonId));
  const progress = lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0;
  const currentLesson = lessons[Math.min(completed.length, Math.max(lessons.length - 1, 0))]?.title || 'Момент 1';

  return { lessons, completedLessonIds: completed, progress, currentLesson };
}

function buildAdminData({ profile, isLoggedIn, registrations, courses, adminStudents }) {
  const profileRegistration = isLoggedIn && profile?.email ? [makeRegistration(profile, 'Активен')] : [];
  const users = uniqueByEmail([...registrations, ...profileRegistration]);
  const visibleUsers = users.length ? users : demoRegistrations;
  const visibleCourses = courses.length ? courses : demoCourses;
  const progressById = new Map(adminStudents.map((student) => [student.id, student]));
  const progressByEmail = new Map(adminStudents.map((student) => [student.email, student]));

  const studentsFromCourses = visibleCourses.map((course) => {
    const base = {
      id: `course-${course.id}`,
      courseId: course.id,
      planId: course.planId || 'base',
      name: course.userName || profile?.name || 'Аленка',
      email: (course.email || profile?.email || '').trim().toLowerCase(),
      tariff: normalizeTariffName(course.planName || course.planId),
      currentLesson: getCurrentLesson(course),
      progress: getCourseProgress(course),
      learningStatus: course.status === 'completed' ? 'Подарен' : 'Готовится',
      lessons: courseLessonsByPlan[course.planId] || courseLessonsByPlan.base,
      completedLessonIds: course.completedLessonIds || [],
      updatedAt: course.paidAt || new Date().toISOString(),
    };
    const stored = progressById.get(base.id) || progressByEmail.get(base.email);
    const lessonState = getLessonState(base.planId, stored?.completedLessonIds || base.completedLessonIds);
    return {
      ...base,
      ...stored,
      lessons: lessonState.lessons,
      completedLessonIds: lessonState.completedLessonIds,
      tariff: normalizeTariffName(stored?.tariff || base.tariff),
      learningStatus: normalizeLearningStatus(stored?.learningStatus, base.learningStatus),
      currentLesson: stored?.currentLesson || lessonState.currentLesson,
      progress: stored?.completedLessonIds
        ? lessonState.progress
        : Math.min(100, Math.max(0, Number(stored?.progress ?? base.progress))),
    };
  });

  const extraStudents = adminStudents.filter((student) => (
    !studentsFromCourses.some((courseStudent) => courseStudent.id === student.id || courseStudent.email === student.email)
  ));

  return {
    users: visibleUsers,
    courses: visibleCourses,
    students: [...studentsFromCourses, ...extraStudents],
  };
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
  return (name || 'Аленка')
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
        app_name: 'Аленка Glow',
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `EmailJS вернул ошибку ${response.status}.`);
  }

  return { message: `Код отправлен на ${email}.` };
}

async function sendFeedbackMessage({ name, email, phone, message }) {
  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    toEmail: import.meta.env.VITE_CONTACT_TO_EMAIL,
  };

  if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey || !emailJsConfig.toEmail) {
    throw new Error('Форма обратной связи не подключена к почте.');
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailJsConfig.serviceId,
      template_id: emailJsConfig.templateId,
      user_id: emailJsConfig.publicKey,
      template_params: {
        to_email: emailJsConfig.toEmail,
        reply_to: email,
        from_name: name,
        from_email: email,
        phone,
        message,
        app_name: 'Аленка Glow',
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `EmailJS вернул ошибку ${response.status}.`);
  }

  return { message: 'Сообщение отправлено. Проверь почту.' };
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
        <span>Код настроения</span>
        <div>
          <BadgePercent size={18} />
          <input value={value} onChange={(event) => onChange(event.target.value.toUpperCase())} placeholder="ALENKA" />
        </div>
      </label>
      <p className={promo ? 'valid' : ''}>
        {promo ? `${promo.title}: нежность ${discount ? formatPrice(discount) : 'применена'}` : 'Введите код, если хочется добавить магии'}
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
      <a className="brand" href="#/home" aria-label="Аленка Glow">
        <span className="brand-name">Аленка Glow</span>
      </a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {visibleNavItems.map(([page, label]) => (
          <a className={activePage === page ? 'active' : ''} href={`#/${page}`} key={page}>
            {label}
          </a>
        ))}
        {!isLoggedIn && (
          <div className="nav-mobile-auth">
            <button type="button" onClick={onLogin}>Войти</button>
            <button type="button" onClick={onRegister}>Создать момент</button>
          </div>
        )}
      </div>
      <div className={`nav-tools ${isLoggedIn ? '' : 'guest'}`}>
        {!isLoggedIn && (
          <div className="auth-actions compact">
            <button type="button" onClick={onLogin}>Войти</button>
            <button type="button" onClick={onRegister}>Создать момент</button>
          </div>
        )}
        <a className="mini-profile" href="#/profile" aria-label="Аленка">
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

function PageHero({ eyebrow, title, visual = alenkaWarmClose, children }) {
  return (
    <section className="page-hero reveal page-hero-with-art">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="page-hero-inline">{children}</div>}
      </div>
      <figure className="page-hero-art" aria-hidden="true">
        <img src={visual} alt="" loading="eager" decoding="async" fetchPriority="high" />
      </figure>
    </section>
  );
}

function StatPill({ label, value, text }) {
  return (
    <article className="stat-pill">
      <small>Аленка</small>
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
        <span>Момент 04</span>
        <strong>Письмо Аленке</strong>
        <div className={`wave ${playing ? 'playing' : ''}`}>
          {Array.from({ length: 18 }).map((_, index) => (
            <i key={index} style={{ '--bar': `${18 + ((index * 11) % 42)}px`, '--delay': `${index * 45}ms` }} />
          ))}
        </div>
      </div>
      <div className="chat-bubble left">Ты сегодня сияешь</div>
      <div className="chat-bubble right">Аленка, ты чудо</div>
      <div className="mini-grid">
        <span>А</span>
        <span>Л</span>
        <span>Е</span>
        <span>Н</span>
      </div>
    </div>
  );
}

function HomePage({ progress, selectedPlan, onSelectPlan }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="kicker">Сайт-посвящение крутой девочке</p>
          <h1>Аленка, этот сайт <span>про тебя</span></h1>
          <p className="hero-text">
            Про твою улыбку, характер, красоту, свет и все маленькие моменты, из-за которых ты становишься самым любимым человеком.
          </p>
          <div className="hero-actions">
            <LinkButton to="program" icon={ArrowRight}>Почему Аленка</LinkButton>
          </div>
          <div className="hero-stats">
            <StatPill label="улыбок" value="∞" text="и каждая делает день лучше" />
            <StatPill label="причин" value="100+" text="гордиться и любоваться тобой" />
            <StatPill label="моментов" value={`${progress}%`} text="уже сохранено в этом уголке" />
          </div>
        </div>
        <div className="hero-visual">
          <img src={alenkaHoodie} alt="Аленка в мягком свете" loading="eager" decoding="async" fetchPriority="high" />
          <div className="arabic-layer">АЛЕНКА</div>
        </div>
      </section>

      <section className="split-section compact">
        <div>
          <p className="eyebrow">Посвящение</p>
          <h2>Все здесь собрано вокруг Аленки</h2>
        </div>
        <div className="method-lines">
          {[
            ['Сначала чувства', 'Без сложных слов: просто честно о том, какая Аленка красивая, сильная и родная.'],
            ['Потом моменты', 'Сюда можно складывать планы, идеи, маленькие даты и воспоминания, которые хочется беречь.'],
            ['Затем сюрпризы', 'Каждый формат помогает придумать, как сделать ей приятно и оставить это на сайте.'],
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
          <p className="eyebrow">Выбранный формат</p>
          <h2>{selectedPlan.name}</h2>
          <div className="tariff-explain">
            <span>{selectedPlan.accent}</span>
            <p>{selectedPlan.process}</p>
            <div>
              <strong>Настроение</strong>
              <small>{selectedPlan.format}</small>
            </div>
            <div>
              <strong>Для чего</strong>
              <small>{selectedPlan.result}</small>
            </div>
          </div>
        </div>
        <figure className="spotlight-photo">
          <img src={alenkaMirrorSoft} alt="" loading="lazy" decoding="async" />
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
          <p className="kicker">Личный уголок</p>
          <h2>Моменты, планы и заметки про Аленку</h2>
          <p className="hero-text">
            Здесь можно сохранить идеи сюрпризов, отмечать подготовку, вести заметку и собирать историю приятных дней.
          </p>
          <LinkButton to="courses" variant="dark" icon={ArrowRight}>Открыть моменты</LinkButton>
        </div>
      </section>

      <section className="photo-gallery-section">
        <div>
          <p className="eyebrow">Кадры</p>
          <h2>Аленка в каждом настроении</h2>
        </div>
        <div className="alenka-photo-grid">
          {alenkaGallery.map((photo, index) => (
            <figure key={photo} className={`alenka-photo-tile tile-${index + 1}`}>
              <img src={photo} alt={`Фото Аленки ${index + 1}`} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="home-links">
        {[
          ['01', 'Почему она', 'улыбка, характер, свет', 'program'],
          ['02', 'Сюрпризы', 'форматы внимания', 'pricing'],
          ['03', 'Аленка', 'профиль и заметки', 'profile'],
          ['04', 'Письма', 'теплые ответы', 'faq'],
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
          <p className="kicker">Готов сделать ей приятно?</p>
          <h2>Выбери формат и собери для Аленки красивый момент</h2>
        </div>
        <LinkButton to="pricing" variant="dark" icon={ArrowRight}>Выбрать сюрприз</LinkButton>
        <div className="cta-slice" aria-hidden="true">
          <img src={alenkaDeskMirror} alt="" loading="lazy" decoding="async" />
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
        eyebrow="Почему Аленка"
        title="Причины посвятить ей целый сайт"
        visual={alenkaWarmClose}
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
              <p className="eyebrow">Активная причина</p>
              <h2>{currentModule.title}</h2>
              <p>{currentModule.text}</p>
            </div>
            <div className="program-diagonal-progress" style={{ '--progress': `${moduleProgress}%` }}>
              <div className="diagonal-progress-label">
                <span>заполнение сердца</span>
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
                  <small>{lesson.duration} минут · глава {currentModule.num}</small>
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
          ['Комплименты', 'Слова, которые хочется сказать Аленке без повода и без стеснения.'],
          ['Планы', 'Идеи свиданий, прогулок, подарков и тихих вечеров рядом.'],
          ['Память', 'Прогресс, заметки и моменты сохраняются в личном уголке.'],
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
        eyebrow="Сюрпризы"
        title="Выбери формат внимания для Аленки"
        visual={alenkaMirrorClose}
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
                Собрать сюрприз
              </ActionButton>
            </article>
          ))}
        </div>
      </section>
      <section className="pricing-strip">
        {[
          ['Без лишнего пафоса', 'Все строится вокруг честных слов и внимания к Аленке.'],
          ['Момент сохраняется', 'Выбранный сюрприз появляется на странице “Моменты”.'],
          ['Можно менять настроение', 'Новый формат легко оформить отдельно для другой даты.'],
        ].map(([title, text]) => (
          <article key={title}>
            <span>LOVE</span>
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
  const [promoCode, setPromoCode] = useState(profile.promoCode || 'ALENKA');
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

    const nextCourse = {
      ...createCourseRecord({
        plan: selectedPlan,
        slot: selectedSlot,
        promoCode: cleanPromo,
        discount,
        total,
        method,
      }),
      userName: contact.name.trim(),
      email: contact.email.trim().toLowerCase(),
      phone: contact.phone,
      paymentStatus: 'Сохранено / демо',
    };
    onProfileChange({ ...contact, promoCode: cleanPromo, planId: selectedPlan.id });
    onCompletePayment(nextCourse);
  }

  return (
    <div className="page">
      <PageHero
        eyebrow="Оформление сюрприза"
        title={`Формат “${selectedPlan.name}” для Аленки`}
        visual={alenkaDeskMirror}
      />
      <section className="checkout-pro">
        <div className="checkout-main">
          <div className="checkout-steps pro">
            {['Формат', 'Контакты', 'Сюрприз'].map((item, index) => (
              <span className="done" key={item}>{index + 1}. {item}</span>
            ))}
          </div>

          <section className="checkout-card selected-course-card">
            <div className="section-head">
              <div>
                <p className="eyebrow">Выбранный формат</p>
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
                <p className="eyebrow">Дата</p>
                <h2>Когда сделать приятно</h2>
              </div>
              <span><CalendarDays size={18} /> ближайшие вечера</span>
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
                <h2>Кому посвятить</h2>
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
                <p className="eyebrow">Способ заботы</p>
                <h2>Как оформить обещание</h2>
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
                <label className="field wide">Идея подарка<input value={card.number} onChange={(event) => setCard((current) => ({ ...current, number: event.target.value }))} placeholder="цветы, письмо, прогулка" /></label>
                <label className="field">Дата<input value={card.date} onChange={(event) => setCard((current) => ({ ...current, date: event.target.value }))} placeholder="дд/мм" /></label>
                <label className="field">Код<input value={card.cvc} onChange={(event) => setCard((current) => ({ ...current, cvc: event.target.value }))} placeholder="love" /></label>
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
            <span><small>Формат</small><strong>{formatPrice(selectedPlan.price)}</strong></span>
            <span><small>Нежность</small><strong>{discount ? `-${formatPrice(discount)}` : '0 ₽'}</strong></span>
            <span className="total"><small>Итог</small><strong>{formatPrice(total)}</strong></span>
          </div>
          {!isLoggedIn && (
            <div className="checkout-auth-lock">
              <Lock size={18} />
              <div>
                <strong>Войдите перед сохранением</strong>
                <p>Так сюрприз закрепится за профилем и появится в разделе “Моменты”.</p>
              </div>
              <button type="button" onClick={onRequireLogin}>Войти</button>
              <button type="button" onClick={onRequireRegister}>Создать момент</button>
            </div>
          )}
          <label className="checkout-consent">
            <input type="checkbox" checked={accepted} onChange={() => setAccepted((value) => !value)} />
            <span>Согласен сделать Аленке приятно</span>
          </label>
          <ActionButton icon={Receipt} onClick={submitPayment} disabled={!canPay || !isLoggedIn}>Сохранить сюрприз</ActionButton>
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
        eyebrow="Моменты"
        title="Сохраненные сюрпризы для Аленки"
        visual={alenkaBlue}
      />
      <section className="courses-page">
        {courses.length === 0 ? (
          <article className="empty-courses">
            <BookOpen size={34} />
            <h2>Пока нет сохраненных моментов</h2>
            <p>Выбери формат сюрприза, сохрани его, и он появится здесь автоматически.</p>
            <LinkButton to="pricing" icon={ArrowRight}>Выбрать сюрприз</LinkButton>
          </article>
        ) : (
          <>
            <div className="section-head">
              <div>
                <p className="eyebrow">Активные</p>
                <h2>Текущие сюрпризы</h2>
              </div>
              <LinkButton to="pricing" variant="outline">Добавить момент</LinkButton>
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
                    <strong>{progress}% готово</strong>
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
                            <b>{isDone ? 'готово' : 'в планах'}</b>
                          </button>
                        );
                      })}
                    </div>
                    <div className="course-actions">
                      <ActionButton variant="outline" onClick={() => onCompleteCourse(course.id)}>Отметить подаренным</ActionButton>
                    </div>
                  </article>
                );
              })}
            </div>

            <section className="course-history">
              <p className="eyebrow">История</p>
              <h2>Подаренные моменты</h2>
              <div className="history-list">
                {(completedCourses.length ? completedCourses : courses.slice(0, 1)).map((course) => (
                  <article key={`${course.id}-history`}>
                    <span>{course.planName}</span>
                    <strong>{formatPrice(course.total)}</strong>
                    <small>{course.status === 'completed' ? 'подарен' : 'в процессе'} · код {course.promoCode || 'нет'}</small>
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
      <section className="auth-section">
        <form className="auth-card" onSubmit={submit}>
          <p className="eyebrow">Аленка Glow</p>
          <div className="auth-intro" key={`${activeMode}-${step}`}>
            <h2>{step === 'code' ? 'Введите код из письма' : activeMode === 'register' ? 'Создать момент' : 'Войти в уголок'}</h2>
            <p className="auth-copy">
              {step === 'code'
                ? `Мы отправили код на ${form.email.trim().toLowerCase()}.`
                : 'Сначала укажи почту, затем появится поле для подтверждения и сохранения моментов.'}
            </p>
          </div>
          <div className={`auth-switch ${activeMode === 'register' ? 'register' : 'login'}`}>
            <button className={activeMode === 'login' ? 'active' : ''} type="button" onClick={() => switchMode('login')}>Вход</button>
            <button className={activeMode === 'register' ? 'active' : ''} type="button" onClick={() => switchMode('register')}>Момент</button>
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
            ['01', 'Аленка', 'Фото, город, настроение и любимые детали.'],
            ['02', 'Моменты', 'Все сохраненные сюрпризы и активные планы отдельно.'],
            ['03', 'История', 'Подаренные моменты остаются внизу личного уголка.'],
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
  const [promoCode, setPromoCode] = useState(profile.promoCode || booking?.promoCode || 'ALENKA');
  const activePromo = getPromo(promoCode);
  const discount = getDiscount(selectedPlan, promoCode);
  const currentTotal = Math.max(selectedPlan.price - discount, 0);
  const activeCourse = courses.find((course) => course.status !== 'completed');
  const completedCourses = courses.filter((course) => course.status === 'completed');

  useEffect(() => {
    setDraft(profile);
    setPromoCode(profile.promoCode || booking?.promoCode || 'ALENKA');
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
      <section className="profile-pro refined-profile">
        <aside className="student-card">
          <label className="avatar-upload">
            <input accept="image/*" type="file" onChange={handlePhoto} />
            {draft.photo ? <img src={draft.photo} alt={draft.name || 'Фото Аленки'} /> : <span>{initials(draft.name)}</span>}
            <b><Camera size={16} /> Фото</b>
          </label>
          <h2>{draft.name || 'Аленка'}</h2>
          <p>{draft.city} · настроение {draft.level}</p>
          <div className="profile-mini-stats">
            <span>{courses.length} моментов</span>
            <span>{draft.minutes} мин заботы</span>
            <span>{completedTasks.length}/{tasks.length} идей</span>
          </div>
          <div className="student-actions">
            <LinkButton to="courses" variant="primary" icon={BookOpen}>Моменты</LinkButton>
            <ActionButton variant="outline danger" onClick={onLogout}>Выйти</ActionButton>
          </div>
        </aside>

        <div className="profile-workspace">
          <section className="profile-summary">
            <article className="summary-tile dark">
              <span>Активный сюрприз</span>
              <strong>{activeCourse?.planName || booking?.planName || selectedPlan.name}</strong>
              <p>{activeCourse?.format || booking?.format || selectedPlan.format}</p>
            </article>
            <article className="summary-tile">
              <span>Дата</span>
              <strong>{booking ? booking.date : 'Не выбран'}</strong>
              <p>{booking ? `${booking.day}, ${booking.time}` : 'Оформление доступно на странице сюрприза.'}</p>
            </article>
            <article className="summary-tile">
              <span>Сохранено</span>
              <strong>{activeCourse ? formatPrice(activeCourse.total) : '0 ₽'}</strong>
              <p>{activeCourse ? `Способ: ${activeCourse.method}` : 'Момент появится после сохранения.'}</p>
            </article>
          </section>

          <section className="promo-card profile-promo">
            <div>
              <p className="eyebrow">Код настроения</p>
              <h2>{activePromo ? activePromo.title : 'Код не применен'}</h2>
              <p>{activePromo ? activePromo.text : 'Сохрани код в профиле, чтобы он подставлялся на странице сюрприза.'}</p>
            </div>
            <div className="promo-control">
              <PromoInput value={promoCode} onChange={setPromoCode} promo={activePromo} discount={discount} compact />
              <strong>{discount ? `-${formatPrice(discount)}` : '0 ₽'}</strong>
              <span>Итого по текущему формату: {formatPrice(currentTotal)}</span>
              <ActionButton variant="outline" icon={BadgePercent} onClick={() => saveProfile()}>Сохранить код</ActionButton>
            </div>
          </section>

          <section className="profile-bottom-grid">
            <div className="tasks-card">
              <p className="eyebrow">Для Аленки</p>
              {tasks.map((task) => (
                <label className="task-row" key={task}>
                  <input checked={completedTasks.includes(task)} type="checkbox" onChange={() => onToggleTask(task)} />
                  <span>{task}</span>
                </label>
              ))}
            </div>
            <label className="note-box profile-note">
              Заметка к сюрпризу
              <textarea value={note} onChange={(event) => onNoteChange(event.target.value)} placeholder="Например: купить цветы, написать письмо, выбрать место для прогулки" />
            </label>
          </section>

          <section className="profile-session-card account-panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Данные</p>
                <h2>Аленка и настройки</h2>
              </div>
              <span><ShieldCheck size={18} /> сохраняется локально</span>
            </div>
            <div className="form-grid">
              <label className="field">Имя<input value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
              <label className="field">Email<input value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
              <label className="field">Телефон<input value={draft.phone} onChange={(event) => update('phone', event.target.value)} /></label>
              <label className="field">Город<input value={draft.city} onChange={(event) => update('city', event.target.value)} /></label>
              <label className="field wide">Что про нее важно<input value={draft.goal} onChange={(event) => update('goal', event.target.value)} /></label>
              <label className="field">Настроение
                <select value={draft.level} onChange={(event) => update('level', event.target.value)}>
                  <option>Glow</option>
                  <option>Love</option>
                  <option>Magic</option>
                </select>
              </label>
              <label className="field">Минут заботы
                <input min="10" max="90" type="number" value={draft.minutes} onChange={(event) => update('minutes', Number(event.target.value))} />
              </label>
            </div>
            <div className="settings-grid compact-settings">
              <button className={draft.notifications ? 'active' : ''} type="button" onClick={() => update('notifications', !draft.notifications)}>
                <CheckCircle2 size={16} /> Напоминания
              </button>
              <button className={draft.darkMode ? 'active' : ''} type="button" onClick={() => update('darkMode', !draft.darkMode)}>
                <CheckCircle2 size={16} /> Темная тема
              </button>
            </div>
            <div className="profile-settings-actions">
              <ActionButton onClick={() => saveProfile()}>Сохранить изменения</ActionButton>
              <LinkButton to="pricing" variant="outline">Выбрать сюрприз</LinkButton>
            </div>
          </section>

          <section className="course-history profile-course-history">
            <p className="eyebrow">История</p>
            <h2>Подаренные моменты</h2>
            <div className="history-list">
              {(completedCourses.length ? completedCourses : courses.slice(0, 2)).map((course) => (
                <article key={`${course.id}-profile-history`}>
                  <span>{course.planName}</span>
                  <strong>{formatPrice(course.total)}</strong>
                  <small>{course.status === 'completed' ? 'подарен' : 'в процессе'} · {course.start?.date || 'дата не выбрана'}</small>
                </article>
              ))}
              {courses.length === 0 && (
                <article>
                  <span>Пока пусто</span>
                  <strong>Нет моментов</strong>
                  <small>История появится после сохранения сюрприза.</small>
                </article>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function FaqPage({ profile }) {
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);
  const [feedback, setFeedback] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    message: '',
  });
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const visibleItems = faqItems.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()));
  const canSendFeedback = feedback.name.trim().length > 1
    && feedback.email.includes('@')
    && feedback.message.trim().length > 8;

  function updateFeedback(field, value) {
    setFeedback((current) => ({ ...current, [field]: value }));
    setFeedbackStatus('');
    setFeedbackError('');
  }

  async function submitFeedback(event) {
    event.preventDefault();
    if (!canSendFeedback || isSendingFeedback) return;

    setIsSendingFeedback(true);
    setFeedbackStatus('');
    setFeedbackError('');

    try {
      const result = await sendFeedbackMessage(feedback);
      setFeedbackStatus(result.message);
      setFeedback((current) => ({ ...current, message: '' }));
    } catch (error) {
      setFeedbackError(`Сообщение не отправилось: ${error.message}`);
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <div className="page">
      <PageHero
        eyebrow="Письма"
        title="Теплые слова для Аленки"
        visual={alenkaMono}
      >
        <label className="search-box">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти мысль" />
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
          <p className="eyebrow">Послание</p>
          <h2>Оставить слова?</h2>
          <p>Напиши сообщение, идею сюрприза или фразу, которую хочется сохранить для Аленки.</p>
          <form className="support-form" onSubmit={submitFeedback}>
            <label className="field">
              Имя
              <input value={feedback.name} onChange={(event) => updateFeedback('name', event.target.value)} />
            </label>
            <label className="field">
              Email
              <input value={feedback.email} type="email" onChange={(event) => updateFeedback('email', event.target.value)} placeholder="you@mail.ru" />
            </label>
            <label className="field">
              Телефон
              <input value={feedback.phone} onChange={(event) => updateFeedback('phone', event.target.value)} placeholder="+7" />
            </label>
            <label className="field">
              Сообщение
              <textarea value={feedback.message} onChange={(event) => updateFeedback('message', event.target.value)} placeholder="Напиши для Аленки теплую мысль или идею сюрприза" />
            </label>
            <ActionButton type="submit" disabled={!canSendFeedback || isSendingFeedback}>
              {isSendingFeedback ? 'Отправляем...' : 'Отправить послание'}
            </ActionButton>
            {feedbackStatus && <strong>{feedbackStatus}</strong>}
            {feedbackError && <strong className="support-error">{feedbackError}</strong>}
          </form>
        </aside>
      </section>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (credentials.login.trim() === adminLogin && credentials.password === adminPassword) {
      setError('');
      onLogin();
      return;
    }

    setError('Неверный логин или пароль');
  }

  return (
    <section className="admin-page admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <p className="eyebrow">Аленка Glow</p>
        <h1>Вход админа</h1>
        <p>Отдельная панель для сохраненных моментов, посланий и подготовки сюрпризов.</p>
        <label className="field">
          Логин
          <input value={credentials.login} onChange={(event) => setCredentials((current) => ({ ...current, login: event.target.value }))} placeholder="admin" />
        </label>
        <label className="field">
          Пароль
          <input value={credentials.password} type="password" onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} placeholder="admin123" />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button className="button primary" type="submit">Войти</button>
      </form>
    </section>
  );
}

function AdminPage({
  profile,
  isLoggedIn,
  registrations,
  courses,
  adminStudents,
  onStudentUpdate,
  onCourseLessonUpdate,
  onLogout,
}) {
  const [search, setSearch] = useState('');
  const [tariffFilter, setTariffFilter] = useState('Все');
  const [statusFilter, setStatusFilter] = useState('Все');
  const adminData = buildAdminData({ profile, isLoggedIn, registrations, courses, adminStudents });

  const filteredStudents = adminData.students.filter((student) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query);
    const matchesTariff = tariffFilter === 'Все' || student.tariff === tariffFilter;
    const matchesStatus = statusFilter === 'Все' || student.learningStatus === statusFilter;
    return matchesSearch && matchesTariff && matchesStatus;
  });

  const activeStudents = adminData.students.filter((student) => ['Новый', 'Готовится'].includes(student.learningStatus)).length;

  function updateStudent(student, patch) {
    onStudentUpdate(student.id, {
      ...student,
      ...patch,
      progress: Math.min(100, Math.max(0, Number(patch.progress ?? student.progress))),
      learningStatus: normalizeLearningStatus(patch.learningStatus, student.learningStatus),
      updatedAt: new Date().toISOString(),
    });
  }

  function toggleLesson(student, lessonId) {
    const currentCompleted = student.completedLessonIds || [];
    const nextCompleted = currentCompleted.includes(lessonId)
      ? currentCompleted.filter((id) => id !== lessonId)
      : [...currentCompleted, lessonId];
    const lessonState = getLessonState(student.planId, nextCompleted);
    const nextStudent = {
      ...student,
      completedLessonIds: lessonState.completedLessonIds,
      currentLesson: lessonState.currentLesson,
      progress: lessonState.progress,
      learningStatus: lessonState.progress === 100 ? 'Подарен' : 'Готовится',
      updatedAt: new Date().toISOString(),
    };

    onStudentUpdate(student.id, nextStudent);
    onCourseLessonUpdate(student.courseId, lessonState.completedLessonIds);
  }

  return (
    <section className="admin-page">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Аленка Glow</p>
          <h1>Панель моментов</h1>
          <p>Регистрации, сохраненные сюрпризы и подготовка моментов сохраняются в localStorage.</p>
        </div>
        <button className="button outline" type="button" onClick={onLogout}>Выйти</button>
      </header>

      <section className="admin-stats">
        <article><span>Участники</span><strong>{adminData.users.length}</strong></article>
        <article><span>Сюрпризы</span><strong>{adminData.courses.length}</strong></article>
        <article><span>Форматы</span><strong>{adminData.courses.length}</strong></article>
        <article><span>Активные моменты</span><strong>{activeStudents}</strong></article>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Новые входы</p>
            <h2>Люди сайта</h2>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Дата входа</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {adminData.users.map((user) => (
                <tr key={user.id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatAdminDate(user.registeredAt)}</td>
                  <td><span className="admin-pill">{user.status || 'Новый'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Сохраненные сюрпризы</p>
            <h2>Форматы и даты</h2>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table wide">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Формат</th>
                <th>Дата</th>
                <th>Код</th>
                <th>Итог</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {adminData.courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.userName || profile.name}</td>
                  <td>{course.email || profile.email}</td>
                  <td><span className="admin-tariff">{normalizeTariffName(course.planName || course.planId)}</span></td>
                  <td>{course.start?.date || 'Дата не выбрана'}</td>
                  <td>{course.promoCode || 'Нет'}</td>
                  <td>{formatPrice(course.total || 0)}</td>
                  <td><span className="admin-paid">{course.paymentStatus || 'Оплачено / демо'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Подготовка момента</p>
            <h2>Управление сюрпризами</h2>
          </div>
        </div>
        <div className="admin-filters">
          <label className="field">
            Поиск
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Имя или email" />
          </label>
          <label className="field">
            Формат
            <select value={tariffFilter} onChange={(event) => setTariffFilter(event.target.value)}>
              <option>Все</option>
              {adminTariffs.map((tariff) => <option key={tariff}>{tariff}</option>)}
            </select>
          </label>
          <label className="field">
            Статус
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>Все</option>
              {learningStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table wide">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Формат</th>
                <th>Текущий шаг</th>
                <th>Процент</th>
                <th>Шаги</th>
                <th>Статус подготовки</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td><span className="admin-tariff">{student.tariff}</span></td>
                  <td>{student.currentLesson}</td>
                  <td>
                    <input
                      className="admin-progress-input"
                      type="number"
                      min="0"
                      max="100"
                      value={student.progress}
                      onChange={(event) => updateStudent(student, { progress: event.target.value })}
                    />
                  </td>
                  <td>
                    <div className="admin-lessons">
                      {(student.lessons || []).map((lesson, index) => (
                        <button
                          className={(student.completedLessonIds || []).includes(lesson.id) ? 'done' : ''}
                          type="button"
                          key={lesson.id}
                          onClick={() => toggleLesson(student, lesson.id)}
                        >
                          <span>{index + 1}</span>
                          <strong>{lesson.title}</strong>
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <select value={student.learningStatus} onChange={(event) => updateStudent(student, { learningStatus: event.target.value })}>
                      {learningStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="admin-empty">По этим фильтрам моментов нет</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>АЛЕНКА GLOW</span>
      <span>Love / Moments / Forever</span>
      <span>2026</span>
    </footer>
  );
}

function Toast({ message }) {
  return message ? <div className="toast">{message}</div> : null;
}

function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [profile, setProfile] = useState(() => getStored('alenka-profile', defaultProfile));
  const [selectedPlanId, setSelectedPlanId] = useState(() => getStored('alenka-plan', profile.planId || 'pro'));
  const [completedTasks, setCompletedTasks] = useState(() => getStored('alenka-tasks', [tasks[0]]));
  const [note, setNote] = useState(() => getStored('alenka-note', ''));
  const [booking, setBooking] = useState(() => getStored('alenka-booking', null));
  const [courses, setCourses] = useState(() => getStored('alenka-courses', []));
  const [registrations, setRegistrations] = useState(() => getStored('alenka-registrations', []));
  const [adminStudents, setAdminStudents] = useState(() => getStored('alenka-admin-students', []));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => getStored('alenka-admin-auth', false));
  const [toast, setToast] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => getStored('alenka-auth', false));
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

  useEffect(() => localStorage.setItem('alenka-profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('alenka-plan', JSON.stringify(selectedPlanId)), [selectedPlanId]);
  useEffect(() => localStorage.setItem('alenka-tasks', JSON.stringify(completedTasks)), [completedTasks]);
  useEffect(() => localStorage.setItem('alenka-note', JSON.stringify(note)), [note]);
  useEffect(() => localStorage.setItem('alenka-booking', JSON.stringify(booking)), [booking]);
  useEffect(() => localStorage.setItem('alenka-courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('alenka-registrations', JSON.stringify(registrations)), [registrations]);
  useEffect(() => localStorage.setItem('alenka-admin-students', JSON.stringify(adminStudents)), [adminStudents]);
  useEffect(() => localStorage.setItem('alenka-auth', JSON.stringify(isLoggedIn)), [isLoggedIn]);
  useEffect(() => {
    if (isAdminLoggedIn) localStorage.setItem('alenka-admin-auth', JSON.stringify(true));
    else localStorage.removeItem('alenka-admin-auth');
  }, [isAdminLoggedIn]);

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
    setToast('Сюрприз выбран');
    if (goToPayment) {
      if (isLoggedIn) {
        navigate('payment');
      } else {
        setPendingCheckout(true);
        setAuthMode('register');
        setToast('Войдите или создайте момент, чтобы сохранить сюрприз');
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

  function syncRegistration(nextProfile, previousEmail = nextProfile.email, status = 'Активен') {
    const registration = makeRegistration(
      { ...nextProfile, registeredAt: nextProfile.registeredAt || new Date().toISOString() },
      status,
    );
    setRegistrations((current) => {
      const existing = current.find((user) => (
        user.email === registration.email || (previousEmail && user.email === previousEmail)
      ));
      if (!existing) return [registration, ...current];

      return current.map((user) => (
        user.email === existing.email ? { ...user, ...registration, registeredAt: user.registeredAt || registration.registeredAt } : user
      ));
    });
  }

  function updateAdminStudent(studentId, nextStudent) {
    setAdminStudents((current) => {
      const existing = current.find((student) => student.id === studentId || student.email === nextStudent.email);
      if (!existing) return [nextStudent, ...current];

      return current.map((student) => (
        student.id === existing.id ? { ...student, ...nextStudent, id: existing.id } : student
      ));
    });
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
    const nextProfile = {
      ...profile,
      ...patch,
      email: (patch.email || profile.email || '').trim().toLowerCase(),
      registeredAt: profile.registeredAt || new Date().toISOString(),
    };
    setProfile(nextProfile);
    syncRegistration(nextProfile, profile.email, 'Новый');
    setIsLoggedIn(true);
    setToast('Момент создан');
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
    setToast('Сюрприз сохранен и добавлен в “Моменты”');
    navigate('courses');
  }

  function completeCourse(courseId) {
    setCourses((current) => current.map((course) => (
      course.id === courseId ? { ...course, status: 'completed', completedAt: new Date().toISOString() } : course
    )));
    setToast('Момент перенесен в историю');
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

  function updateCourseLessonsFromAdmin(courseId, completedLessonIds) {
    if (!courseId) return;

    setCourses((current) => current.map((course) => {
      if (course.id !== courseId) return course;
      const lessonState = getLessonState(course.planId, completedLessonIds);

      return {
        ...course,
        completedLessonIds: lessonState.completedLessonIds,
        lessonsDone: lessonState.completedLessonIds.length,
        adminProgress: lessonState.progress,
        status: lessonState.progress === 100 ? 'completed' : 'active',
        completedAt: lessonState.progress === 100 ? new Date().toISOString() : undefined,
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
      {page !== 'admin' && <Header
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
      />}
      {page === 'admin' && (isAdminLoggedIn ? (
        <AdminPage
          profile={profile}
          isLoggedIn={isLoggedIn}
          registrations={registrations}
          courses={courses}
          adminStudents={adminStudents}
          onStudentUpdate={updateAdminStudent}
          onCourseLessonUpdate={updateCourseLessonsFromAdmin}
          onLogout={() => setIsAdminLoggedIn(false)}
        />
      ) : (
        <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
      ))}
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
            syncRegistration(draft, profile.email, 'Активен');
            setToast('Профиль сохранен');
          }}
        />
      ) : (
        <AuthPage mode={authMode} onLogin={login} onRegister={register} />
      ))}
      {page === 'faq' && <FaqPage profile={profile} />}
      {page !== 'admin' && <Footer />}
      <Toast message={toast} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
