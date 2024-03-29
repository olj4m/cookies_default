import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0/dist/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
window.onload = () => {

	CookieConsent.run({

		root: 'body',
		// autoShow: true,
		// disablePageInteraction: true,
		// hideFromBots: true,
		// mode: 'opt-in',
		revision: 1.0,

		cookie: {
			name: 'cc_cookie',
			// domain: location.hostname,
			// path: '/',
			// sameSite: "Lax",
			// expiresAfterDays: 365,
		},

		// https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
		guiOptions: {
			consentModal: {
				layout: 'cloud',
				position: 'middle center',
				equalWeightButtons: false,
				flipButtons: true
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: false,
				flipButtons: true
			}
		},

		onFirstConsent: ({cookie}) => {
			console.log('onFirstConsent fired',cookie);
		},

		onConsent: ({cookie}) => {
			//console.log('onConsent fired!', cookie)

			document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');

			sendCookieEvent();
		},

		onChange: ({changedCategories, changedServices}) => {
			console.log('onChange fired!', changedCategories, changedServices);

			sendCookieEvent();
		},

		onModalReady: ({modalName}) => {
			//console.log('ready:', modalName);
		},

		onModalShow: ({modalName}) => {
			//console.log('visible:', modalName);

			document.getElementById('show-preferencesModal').classList.add('show-preferencesModal-hidden');
		},

		onModalHide: ({modalName}) => {
			//console.log('hidden:', modalName);

			document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');
		},

		categories: {
			necessary: {
				autoClear: {
					cookies: [
						{
							name: 'cc_cookie',
						},
						{
							name: '_GRECAPTCHA',
						},
						{
							name: 'rc::a',
						},
						{
							name: 'rc::f',
						},
						{
							name: 'PHPSESSID',
						},
						{
							name: "wc_fragments_#",
						}
					]
				},
				enabled: true,  // this category is enabled by default
				readOnly: true  // this category cannot be disabled
			},
			analytics_storage: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/,   // regex: match all cookies starting with '_ga'
						},
						{
							name: /^_gat/,   // string: exact cookie name
						},
						{
							name: '_gid',   // string: exact cookie name
						}
					]
				},

				// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
				// services: {
				//     ga: {
				//         label: 'Google Analytics',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				//     youtube: {
				//         label: 'Youtube Embed',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				// }
			},
			ad_storage: {
				autoClear: {
					cookies: [
						{
							name: 'test_cookie',
						},
						{
							name: '_gcl_au',
						},
						{
							name: '_fbp',
						},
						{
							name: '_fbc',
						},
						{
							name: 'fr', 
						},
						{
							name: 'IDE', 
						},
						{
							name: 'NID', 
						},
						{
							name: 'RUL', 
						},
						{
							name: 'MSPTC', 
						},
						{
							name: 'MUID', 
						}
					]
				},
			},
			ad_user_data: {},
			ad_personalization: {},
		},

		language: {
			default: 'pl',
			autoDetect: 'document',
			translations: {
				'pl': {
					consentModal: {
						title: "Cenimy Państwa prywatność",
						description: "Do poprawnego działania naszej strony niezbędne są niektóre pliki cookies. Zachęcamy również do wyrażenia zgody na użycie plików cookie narzędzi analitycznych. Dzięki nim możemy nieustannie ulepszać stronę. Więcej informacji znajdą Państwo w <a href=\"./polityka-prywatnosci/\" title=\"Polityka prywatności\" target=\"_blank\">Polityce Prywatności</a>.<br><br>{{revisionMessage}}",
						revisionMessage: "Prosimy o ponowną zgodę na pliki cookie, ponieważ zaktualizowaliśmy działanie witryny.",
						acceptAllBtn: "Akceptuj wszystkie",
						acceptNecessaryBtn: "Odrzuć wszystkie",
						showPreferencesBtn: "Dostosuj"
					},
					preferencesModal: {
						title: "Dostosuj ustawienia",
						acceptAllBtn: "Akceptuj wszystkie",
						acceptNecessaryBtn: "Odrzuć wszystkie",
						savePreferencesBtn: "Zapisz",
						closeIconLabel: "Zamknij",
						sections: [
							{
								title: "\"Niezbędne\" pliki cookie",
								description: "<p>\"Niezbędne\" pliki cookie są wymagane dla działania strony. Zgoda na pozostałe kategorie, pomoże nam ulepszać działanie serwisu.</p> <p>Firmy trzecie, np.: Google, również zapisują pliki cookie. Więcej informacji: <a href=\"https://policies.google.com/technologies/partner-sites?hl=pl\" target=\"_blank\" rel=\"noopener\">użycie danych</a> oraz <a href=\"https://policies.google.com/technologies/cookies?hl=pl#types-of-cookies\" target=\"_blank\" rel=\"noopener\">prywatność</a>.</p>"
							},
							{
								title: "\"Niezbędne\" pliki cookie",
								description: "Niezbędne pliki cookies są konieczne do prawidłowego działania witryny.",
								linkedCategory: "necessary",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "cc_cookie",
											domain: "https://",
											description: "Przechowuje dane dotyczące zgody użytkownika.",
											expiration: "1 rok"
										},
										{
											name: "_GRECAPTCHA",
											domain: "Google",
											description: "Służy do ochrony przed spamem.",
											expiration: "6 miesięcy"
										},
										{
											name: "rc::a",
											domain: "Google",
											description: "Służy do odróżnienia użytkownika od bota.",
											expiration: "Trwały"
										},
										{
											name: "rc::f",
											domain: "Google",
											description: "Służy do odróżnienia użytkownika od bota.",
											expiration: "Trwały"
										},
										{
											name: "PHPSESSID",
											domain: "https://",
											description: "Plik PHPSESSID jest plikiem natywnym PHP i pozwala na zapamiętywanie danych dotyczących stanu sesji.",
											expiration: "Zamknięcie przeglądarki"
										},
										{
											name: "wc_fragments_#",
											domain: "https://",
											description: "Służy do zapamiętania przedmiotów w koszyku.",
											expiration: "Trwały"
										},
									]
								}
							},
							{
								title: "Analityczne pliki cookie",
								description: "Używamy plików cookie Google Analytics. Te pliki cookie będą przechowywane w przeglądarce tylko za Państwa uprzednią zgodą.",
								linkedCategory: "analytics_storage",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "_ga_#",
											domain: "Google Analytics",
											description: "Służy do zapisywania informacji o odsłonach strony.",
											expiration: "1 rok"
										},
										{
											name: "_ga",
											domain: "Google Analytics",
											description: "Służy do zapisywania informacji o odsłonach strony.",
											expiration: "2 lata"
										},
										{
											name: "_gid",
											domain: "Google Analytics",
											description: "Rejestruje identyfikator, który służy do generowania danych statystycznych dotyczących odwiedzin na stronie internetowej.",
											expiration: "1 dzień"
										},
										{
											name: "_ga_*",
											domain: "Google Analytics",
											description: "Rejestruje nowy identyfikator, który służy do generowania danych statystycznych dotyczących odwiedzin na stronie internetowej.",
											expiration: "1 rok"
										},
										{
											name: "_gat_*",
											domain: "Google Analytics",
											description: "Plik używany jest do kontrolowania liczby żądań przeglądarki użytkownika do serwera.",
											expiration: "1 dzień"
										}
									]
								}
							},
							{
								title: "Reklamowe pliki cookie",
								description: "Reklamowe pliki cookies służą m.in. do analizowania efektywności działań reklamowych i śledzenia konwersji.",
								linkedCategory: "ad_storage",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "_gcl_au",
											domain: "Google Adsense",
											description: "Służy do zapisywania i śledzenia konwersji użytkownika.",
											expiration: "Trwały"
										},
										{
											name: "test_cookie",
											domain: "DoubleClick",
											description: "Służy do weryfikacji czy pzeglądarka obsługuje ciasteczka.",
											expiration: "Trwały"
										},
										{
											name: "_fbp",
											domain: "Facebook",
											description: "Służy do zapisywania i śledzenia danych o wizytach użytkownika.",
											expiration: "3 miesiące"
										},
										{
											name: "_fbc",
											domain: "Facebook",
											description: "Służy do zapisywania ostatniej wizyty użytkownika.",
											expiration: "2 lata"
										},
										{
											name: "fr",
											domain: "Facebook",
											description: "Służy do dostarczania użytkownikom dostosowanych reklam oraz retargetingu.",
											expiration: "3 miesiące"
										},
										{
											name: "IDE",
											domain: "Google DoubleClick",
											description: "Służy do dostarczania użytkownikom dostosowanych reklam oraz retargetingu.",
											expiration: "2 lata"
										},
										{
											name: "NID",
											domain: "Google Ads",
											description: "Służy do dostarczania reklam, retargetowania i przechowywania preferencji użytkownika.",
											expiration: "6 miesięcy"
										},
										{
											name: "RUL",
											domain: "Google DoubleClick",
											description: "Służy do weryfikacji poprawności wyświetlania reklam w witrynie.",
											expiration: "1 rok"
										},
										{
											name: "MUID",
											domain: "Microsoft",
											description: "Powszechnie używany przez firmę Microsoft jako unikalny identyfikator użytkownika.",
											expiration: "1 rok"
										},
										{
											name: "MSPTC",
											domain: "Microsoft",
											description: "Służy do optymalizacji trafności reklam.",
											expiration: "1 rok"
										}
									]
								}
							},
							{
								title: "Dane użytkownika związane z reklamami",
								description: "Zarządza zgodą na wysyłanie do Google danych użytkownika związanych z reklamami.",
								linkedCategory: "ad_user_data"
							},
							{
								title: "Reklamy spersonalizowane",
								description: "Zarządza zgodą na wyświetlanie reklam spersonalizowanych.",
								linkedCategory: "ad_personalization"
							},
							{
								title: "Więcej informacji",
								description: "Jeżeli chcą się Państwo dowiedzieć więcej, zachęcamy do zapoznania się z <a href=\"/polityka-prywatnosci/\" title=\"Polityka prywatności\" target=\"_blank\">Polityką Prywatności</a>."
							}
						]
					}
				}
			}
		}
	});

	const cookieSettingsButton = document.createElement('div');
	cookieSettingsButton.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355.51 370.64"><defs><style>.cls-1cc{fill:#513c07;}.cls-2cc{fill:#fcd25b;stroke:#050505;stroke-miterlimit:10;}</style></defs><path class="cls-2cc" d="M351.36,230.92c-6.66-5.83-13.48-11.47-20.22-17.19-5-4.24-10.12-8.36-14.97-12.78-9.08-8.28-8.98-23.25,.16-31.46,4.54-4.08,9.29-7.93,13.95-11.88,7.03-5.95,14.12-11.83,21.06-17.88,3.47-3.03,4.44-7.02,3.04-11.41-2.71-8.49-6.11-16.72-10.07-24.71-7.57-15.24-17.07-29.17-28.46-41.81-3.34-3.7-7.75-4.83-12.46-3.16-13.71,4.88-27.43,9.76-41.14,14.65-2.81,1-5.69,1.55-8.68,1.35-8.97-.62-15.44-5-19.11-13.2-.99-2.21-1.44-4.71-1.89-7.12-2.51-13.39-4.95-26.8-7.39-40.2-.96-5.28-4.06-8.71-9.04-9.66-4.49-.85-9-1.64-13.52-2.28-11.08-1.56-22.22-1.98-33.4-1.48-10.06,.45-20.01,1.74-29.88,3.74-4.74,.96-7.98,4.18-8.92,8.93-.62,3.16-1.18,6.33-1.76,9.49-2.07,11.33-4.07,22.68-6.22,33.99-2.47,13-15.42,20.72-28.07,16.8-3.21-1-6.36-2.21-9.54-3.34-11.02-3.92-22.03-7.89-33.07-11.74-4.63-1.61-8.78-.55-12.03,3.16-3.28,3.73-6.5,7.51-9.54,11.43-12.12,15.67-21.38,32.92-27.92,51.61-.64,1.84-1.36,3.7-1.63,5.62-.56,4.04,.99,7.34,4.1,9.96,11.04,9.31,22.06,18.65,33.1,27.97,2.37,2,4.34,4.32,5.77,7.09,4.47,8.61,2.62,19.38-4.62,25.86-4.49,4.01-9.16,7.81-13.75,11.7-6.87,5.81-13.74,11.62-20.62,17.42-2.64,2.22-4.04,5.03-4.13,8.64,.03,.38,.03,.93,.12,1.46,.11,.62,.26,1.24,.45,1.84,3.2,9.83,7.2,19.33,12.01,28.49,7.23,13.76,16.07,26.41,26.48,37.96,3.41,3.79,7.82,4.9,12.61,3.19,13.74-4.9,27.47-9.8,41.22-14.68,12.75-4.52,26.08,2.83,28.96,16.01,.88,4.05,1.53,8.16,2.27,12.24,1.93,10.56,3.84,21.13,5.8,31.68,.89,4.8,4.19,8.11,8.97,8.97,5.03,.91,10.07,1.79,15.13,2.47,10.64,1.43,21.34,1.76,32.06,1.27,9.94-.46,19.77-1.74,29.52-3.73,4.68-.95,8.06-4.29,8.9-8.85,2.21-12.01,4.38-24.02,6.61-36.03,.65-3.49,1.14-7.04,2.19-10.41,3.51-11.25,15.88-17.59,27.1-13.98,4.78,1.54,9.48,3.31,14.21,4.99,9.38,3.33,18.76,6.67,28.13,10.02,4.79,1.71,9.26,.67,12.6-3.17,3.18-3.66,6.33-7.34,9.3-11.17,12.97-16.74,22.68-35.22,29.23-55.35,1.41-4.35,.41-8.33-3.03-11.34Z"/><circle class="cls-1cc" cx="299.38" cy="114.52" r="24.56"/><circle class="cls-1cc" cx="177.36" cy="44.79" r="18.01"/><circle class="cls-1cc" cx="56.4" cy="114.4" r="21.22"/><circle class="cls-1cc" cx="58.07" cy="252.58" r="25.25"/><circle class="cls-1cc" cx="176.15" cy="325.85" r="21.22"/><circle class="cls-1cc" cx="301.65" cy="253.97" r="18.31"/><circle class="cls-1cc" cx="207.67" cy="126.65" r="18.01"/><circle class="cls-1cc" cx="119" cy="170.6" r="16.04"/><circle class="cls-1cc" cx="197.06" cy="228.96" r="23.04"/></svg>';
	cookieSettingsButton.id = "show-preferencesModal";
	cookieSettingsButton.classList.add('show-preferencesModal-hidden');
	cookieSettingsButton.dataset.cc = 'show-preferencesModal';
	document.body.appendChild(cookieSettingsButton);
};

function sendCookieEvent() {
	window.dataLayer = window.dataLayer || [];
	dataLayer.push({
		'event': 'CookiesSet'
	});
	
	let CookiesSetEvent = new CustomEvent('CookiesSet', { 'detail': CookieConsent.getCookie('categories') });

	document.dispatchEvent(CookiesSetEvent);
	console.log('sendCookieEvent with categories: ', CookieConsent.getCookie('categories'));
}

window.AddCookieSetCallback = function( callback ) {
	document.addEventListener('CookiesSet', function(event) {
		if (typeof callback == 'function' && event.detail) {
			callback(event.detail);
			console.log('CookiesSet callback called with data:', event.detail);
			window.dataLayer = window.dataLayer || [];
			dataLayer.push({'event': 'CookiesUpdated'});
		} else {
			console.log('Invalid data passed to CookiesSet callback:', event);
		}
	});
}
