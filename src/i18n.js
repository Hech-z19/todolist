import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';

import en from 'Locales/en.json';
import es from 'Locales/es.json';

const resources = {
	en,
	es,
};

const options = {
	order: ['querystring', 'navigator'],
	lookupQuerystring: 'lng',
};

i18n.use(XHR)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		detection: options,
		resources,
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;