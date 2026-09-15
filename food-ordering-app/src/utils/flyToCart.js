export const flyToCart = (sourceEl) => {
    if (!sourceEl) {
        return;
    }

    const candidates = [...document.querySelectorAll('[data-cart-target]')];
    const target = candidates.find((el) => el.offsetParent !== null) || candidates[0];
    if (!target) {
        return;
    }

    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const dot = document.createElement('span');
    dot.className = 'fly-to-cart-dot';
    dot.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
    dot.style.top = `${sourceRect.top + sourceRect.height / 2}px`;
    document.body.appendChild(dot);

    const deltaX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const deltaY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

    requestAnimationFrame(() => {
        dot.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        dot.style.opacity = '0';
    });

    let done = false;
    const cleanup = () => {
        if (done) {
            return;
        }
        done = true;
        dot.remove();
        target.classList.add('cart-pulse');
        window.setTimeout(() => target.classList.remove('cart-pulse'), 300);
    };

    dot.addEventListener('transitionend', cleanup, { once: true });
    window.setTimeout(cleanup, 700);
};
