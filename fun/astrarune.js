document.body.style.margin = '0';
document.body.style.height = '100vh';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.overflow = 'hidden';

const title = document.createElement('div');
title.textContent = 'astrarune';
title.style.fontSize = '4rem';
title.style.transition = 'transform 0.1s';
document.body.appendChild(title);

const subtitle = document.createElement('div');
subtitle.textContent = 'Hope you enjoy Unscrub!';
subtitle.style.marginTop = '20px';
subtitle.style.fontSize = '1.5rem';
document.body.appendChild(subtitle);

let start = null;
const duration = 2000;
const rotateAmount = 10;

function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const angle = Math.sin((elapsed / duration) * Math.PI * 4) * rotateAmount;
    title.style.transform = `rotate(${angle}deg)`;

    if (elapsed < duration) {
        requestAnimationFrame(animate);
    } else {
        title.style.transition = 'opacity 1s';
        subtitle.style.transition = 'opacity 1s';
        title.style.opacity = '0';
        subtitle.style.opacity = '0';
    }
}

requestAnimationFrame(animate);
