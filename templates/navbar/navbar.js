async function nav_main() {
    const nav = document.querySelector('nav');
    const html = await (await fetch('templates/navbar/navbar.html')).text();
    nav.innerHTML = html;

    const lang = location.href.split('/').includes('th') ? 'th' : 'en';
    console.log(lang);
    const lang_th = document.querySelector('a#lang-th');
    const lang_en = document.querySelector('a#lang-en');

    lang_th.addEventListener('click', () => {
        console.log(lang, '-> th');
        switch (lang) {
            case 'th':
                break;
            case 'en':
                location.href = '/th'
        }
    });
    lang_en.addEventListener('click', () => {
        console.log(lang, '-> en');
        switch (lang) {
            case 'th':
                location.href = '../'
            case 'en':
                break;
        }
    });
}

nav_main();
