async function nav_main() {
    const nav = document.querySelector('nav');
    const html = await (await fetch('../templates/navbar/navbar.html')).text();
    nav.innerHTML = html;
}

nav_main();
