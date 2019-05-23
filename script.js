document.querySelector('nav').addEventListener('click', evt => {
    if((evt.target.tagName === 'IMG' || evt.target.tagName === 'A') && !evt.target.classList.contains('hamburger')) {
        if(!evt.target.closest('a').classList.contains('active')) {
            document.querySelector('.active').classList.remove('active');
            evt.target.closest('a').classList.add('active');
            document.querySelector('#nav').classList.remove('active-menue');
        }
    }
})

document.querySelector('.hamburger').addEventListener('click', evt => {
    document.querySelector('#nav').classList.toggle('active-menue');
})

document.body.addEventListener('click', evt => {
    if(!evt.target.classList.contains('hamburger')) {
        document.querySelector('#nav').classList.remove('active-menue');
    }
})

const header = document.querySelector('header');
const main = document.querySelector('main');
const headLines = document.querySelectorAll('main h2');
const headerHeadline = header.querySelector('h1');

const scrollHandler = () => {
    if(window.pageYOffset >= 40 && window.innerWidth > 768) {
        header.classList.add('scrolled');
        main.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        main.classList.remove('scrolled');
    }

    const selectedObj = {
        elementTxt: 'Backend',
        value: null
    }

    for (let element of headLines) {
        let elementTopOffset = element.offsetParent.offsetTop-window.pageYOffset;
        if (elementTopOffset < 0) {
            elementTopOffset = parseInt(elementTopOffset);
            if (!selectedObj.value || selectedObj.value < elementTopOffset) {
                selectedObj.elementTxt = element.textContent;
                selectedObj.value = elementTopOffset;
            }
        }
    }

    if (headerHeadline.textContent != selectedObj.elementTxt) {
        headerHeadline.textContent = selectedObj.elementTxt;
    }

    window.requestAnimationFrame(scrollHandler);
}

window.requestAnimationFrame(scrollHandler);
