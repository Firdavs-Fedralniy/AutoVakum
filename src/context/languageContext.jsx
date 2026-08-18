import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  uz: {
    header: {
      services: "Xizmatlar",
      beforeAfter: "Oldin / Keyin",
      gallery: "Galereya",
      reviews: "Mijozlar fikri",
      contacts: "Bog‘lanish",
      order: "Buyurtma berish",
    },

    hero: {
      label: "PROFESSIONAL AVTO XIZMAT",

      title1: "Avtomobilingizga",
      title2: "yangidek ko‘rinish",
      title3: "qaytaramiz",

      description:
        "Avto vakuum, kimyoviy tozalash, polirovka, detailing va avtomobilingiz uchun boshqa professional xizmatlar.",

      order: "Buyurtma berish",
      works: "Ishlarimizni ko‘rish",

      cars: "avtomobil",
      experience: "ish tajribasi",
      quality: "sifatli xizmat",

      loading: "YUKLANMOQDA...",

      professional: "Professional xizmat",
      forCar: "Avtomobilingiz uchun",

      result: "Sifatli natija",
      attention: "Har bir detalga e'tibor",

      previous: "Oldingi slayd",
      next: "Keyingi slayd",

      ticker: [
        "AVTO VAKUUM",
        "KIMYOVIY TOZALASH",
        "POLIROVKA",
        "DETAILING",
        "AVTOMOBIL PARVARISHI",
        "RESTAVRATSIYA",
      ],
    },

    beforeAfter: {
      eyebrow: "ISHLARIMIZ",
      title: "Oldin va keyin",
      loading: "Yuklanmoqda...",
      empty: "Hozircha ishlar qo‘shilmagan.",
      before: "OLDIN",
      after: "KEYIN",
      image: "Ish",
    },

    gallery: {
      eyebrow: "GALEREYA",
      title: "Ishlarimizdan lavhalar",
      description:
        "Avtomobillarga qilgan ishlarimizdan eng yaxshi lavhalarni ko‘ring.",
      loading: "Yuklanmoqda...",
      empty: "Hozircha galereya bo‘sh.",
      image: "Galereya",
      previous: "Oldingi",
      next: "Keyingi",
      close: "Yopish",
    },

    reviews: {
      eyebrow: "MIJOZLAR FIKRI",
      title: "Mijozlarimiz nima deydi?",
      description:
        "Bizning xizmatimizdan foydalangan mijozlarning fikrlari.",

      loading: "Yuklanmoqda...",
      empty: "Hozircha sharhlar yo‘q.",

      client: "Mamnun mijoz",

      formLabel: "FIKRINGIZNI BILDIRING",
      formTitle: "Xizmatimiz sizga yoqdimi?",
      formDescription:
        "O‘z fikringizni biz bilan baham ko‘ring.",

      namePlaceholder: "Ismingiz",
      textPlaceholder: "Fikringizni yozing...",
      submit: "FIKR QOLDIRISH",
      sending: "YUBORILMOQDA...",
    },

    contacts: {
      eyebrow: "BOG‘LANISH",
      title: "Biz bilan bog‘laning",
      description:
        "Avtomobilingiz uchun professional xizmat kerakmi? Biz bilan bog‘laning va barcha savollaringizga javob oling.",

      phone: "Telefon",
      address: "Manzil",
      telegram: "Telegram",
      workingHours: "Ish vaqti",

      city: "Toshkent shahri",
      hours: "Har kuni 09:00 — 21:00",

      formLabel: "BUYURTMA",
      formTitle: "Raqamingizni qoldiring",
      formDescription:
        "Biz siz bilan bog‘lanamiz va xizmat haqida batafsil ma’lumot beramiz.",

      phonePlaceholder: "+998 90 123 45 67",
      submit: "Menga qo‘ng‘iroq qiling",
      sent: "Yuborildi ✓",
      success:
        "Rahmat! Tez orada siz bilan bog‘lanamiz.",

      map: "Bizning manzil",
    },

    footer: {
      description:
        "Professional avtomobil tozalash va detailing xizmatlari.",

      navigation: "NAVIGATSIYA",
      contact: "BOG‘LANISH",

      beforeAfter: "Oldin va keyin",
      gallery: "Galereya",
      reviews: "Sharhlar",
      contacts: "Kontaktlar",

      city: "Toshkent shahri",

      rights: "Barcha huquqlar himoyalangan",
    },
  },

  ru: {
    header: {
      services: "Услуги",
      beforeAfter: "До / После",
      gallery: "Галерея",
      reviews: "Отзывы",
      contacts: "Контакты",
      order: "Записаться",
    },

    hero: {
      label: "ПРОФЕССИОНАЛЬНЫЙ АВТО СЕРВИС",

      title1: "Вернём вашему",
      title2: "автомобилю идеальный",
      title3: "вид",

      description:
        "Авто вакуум, химчистка, полировка, детейлинг и другие профессиональные услуги для вашего автомобиля.",

      order: "Записаться",
      works: "Смотреть работы",

      cars: "автомобилей",
      experience: "опыта работы",
      quality: "качественный сервис",

      loading: "ЗАГРУЗКА...",

      professional: "Профессиональный сервис",
      forCar: "Для вашего автомобиля",

      result: "Качественный результат",
      attention: "Внимание к каждой детали",

      previous: "Предыдущий слайд",
      next: "Следующий слайд",

      ticker: [
        "АВТО ВАКУУМ",
        "ХИМЧИСТКА",
        "ПОЛИРОВКА",
        "ДЕТЕЙЛИНГ",
        "УХОД ЗА АВТО",
        "ВОССТАНОВЛЕНИЕ",
      ],
    },

    beforeAfter: {
      eyebrow: "НАШИ РАБОТЫ",
      title: "До и после",
      loading: "Загрузка...",
      empty: "Пока нет добавленных работ.",
      before: "ДО",
      after: "ПОСЛЕ",
      image: "Работа",
    },

    gallery: {
      eyebrow: "ГАЛЕРЕЯ",
      title: "Наши работы",
      description:
        "Посмотрите лучшие примеры работ по уходу за автомобилями.",
      loading: "Загрузка...",
      empty: "Галерея пока пуста.",
      image: "Галерея",
      previous: "Предыдущее",
      next: "Следующее",
      close: "Закрыть",
    },

    reviews: {
      eyebrow: "ОТЗЫВЫ КЛИЕНТОВ",
      title: "Что говорят наши клиенты?",
      description:
        "Отзывы клиентов, которые воспользовались нашими услугами.",

      loading: "Загрузка...",
      empty: "Пока нет отзывов.",

      client: "Довольный клиент",

      formLabel: "ОСТАВЬТЕ ОТЗЫВ",
      formTitle: "Вам понравился наш сервис?",
      formDescription:
        "Поделитесь своим мнением с нами.",

      namePlaceholder: "Ваше имя",
      textPlaceholder: "Напишите ваш отзыв...",
      submit: "ОСТАВИТЬ ОТЗЫВ",
      sending: "ОТПРАВЛЯЕМ...",
    },

    contacts: {
      eyebrow: "КОНТАКТЫ",
      title: "Свяжитесь с нами",
      description:
        "Нужен профессиональный уход за автомобилем? Свяжитесь с нами, и мы ответим на все ваши вопросы.",

      phone: "Телефон",
      address: "Адрес",
      telegram: "Telegram",
      workingHours: "Время работы",

      city: "Ташкент",
      hours: "Ежедневно 09:00 — 21:00",

      formLabel: "ЗАЯВКА",
      formTitle: "Оставьте ваш номер",
      formDescription:
        "Мы свяжемся с вами и расскажем подробнее об услугах.",

      phonePlaceholder: "+998 90 123 45 67",
      submit: "Позвоните мне",
      sent: "Отправлено ✓",
      success:
        "Спасибо! Мы свяжемся с вами в ближайшее время.",

      map: "Наш адрес",
    },

    footer: {
      description:
        "Профессиональная химчистка, полировка и детейлинг автомобилей.",

      navigation: "НАВИГАЦИЯ",
      contact: "КОНТАКТЫ",

      beforeAfter: "До и после",
      gallery: "Галерея",
      reviews: "Отзывы",
      contacts: "Контакты",

      city: "Ташкент",

      rights: "Все права защищены",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "uz";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
  }

  const value = {
    language,
    changeLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}