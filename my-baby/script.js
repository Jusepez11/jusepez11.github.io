const questionScreen = document.querySelector('#question-screen');
const yesScreen = document.querySelector('#yes-screen');
const sadScreen = document.querySelector('#sad-screen');
const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const hint = document.querySelector('#hint');

let noCount = 0;
const messages = [
    '¿Segura? Piénsalo un poquito…',
    'Mira qué bonito se ve el botón rosa.',
    '¿Segurísima de verdad?',
    'Ese “No” se está poniendo nervioso.',
    '¡Ahora tendrás que atraparlo!',
    'No quiere que lo encuentres…',
    'Última oportunidad para decir que sí.'
];

function showScreen(screen) {
    questionScreen.classList.add('hidden');
    yesScreen.classList.add('hidden');
    sadScreen.classList.add('hidden');
    screen.classList.remove('hidden');
}

function moveNoButton() {
    noButton.classList.add('escaping');
    const padding = 14;
    const width = noButton.offsetWidth;
    const height = noButton.offsetHeight;
    const maxX = Math.max(padding, window.innerWidth - width - padding);
    const maxY = Math.max(padding, window.innerHeight - height - padding);
    noButton.style.left = `${padding + Math.random() * (maxX - padding)}px`;
    noButton.style.top = `${padding + Math.random() * (maxY - padding)}px`;
}

function rejectLove() {
    noCount += 1;
    hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
    yesButton.style.transform = `scale(${Math.min(1 + noCount * .17, 2.15)})`;

    if (noCount >= 4 && noCount < 9) moveNoButton();
    if (noCount >= 9) showScreen(sadScreen);
}

noButton.addEventListener('click', rejectLove);
yesButton.addEventListener('click', () => showScreen(yesScreen));

document.querySelectorAll('.restart-button').forEach((button) => {
    button.addEventListener('click', () => window.location.reload());
});

window.addEventListener('resize', () => {
    if (noButton.classList.contains('escaping')) moveNoButton();
});
