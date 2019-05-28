// Navbar handler to change the active stance
document.querySelector('nav').addEventListener('click', evt => {
    if((evt.target.tagName === 'IMG' || evt.target.tagName === 'A') && !evt.target.classList.contains('hamburger')) {
        if(!evt.target.closest('a').classList.contains('active')) {
            document.querySelector('.active').classList.remove('active');
            evt.target.closest('a').classList.add('active');
            document.querySelector('#nav').classList.remove('active-menue');
        }
    }
});

// Handler to open the hamburger menue
document.querySelector('.hamburger').addEventListener('click', evt => {
    document.querySelector('#nav').classList.toggle('active-menue');
});

// Handler to close the hamburger menue when clickin anywhere else
document.body.addEventListener('click', evt => {
    if(!evt.target.classList.contains('hamburger')) {
        document.querySelector('#nav').classList.remove('active-menue');
    }
});

const header = document.querySelector('header');
const main = document.querySelector('main');
const headLines = document.querySelectorAll('main h2');
const headerHeadline = header.querySelector('h1');

const backToTop = document.createElement('a');
const imgBackToTopButton = document.createElement('img');
imgBackToTopButton.setAttribute('src','img/uparrow.svg');
imgBackToTopButton.setAttribute('alt','Back to top');
backToTop.setAttribute('class','back-to-top fixed-bottom');
backToTop.setAttribute('href','#top');
backToTop.appendChild(imgBackToTopButton);


// Loop to handle scroll changes
const scrollHandler = () => {
    // Add and remove classes for fixed header positioning
    if(window.pageYOffset >= 40 && window.innerWidth > 768) {
        header.classList.add('scrolled');
        main.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        main.classList.remove('scrolled');
    }

    const da = document.querySelector('.back-to-top');
    if(window.pageYOffset >= 40 && !da) {
        document.body.appendChild(backToTop);
    } else if (window.pageYOffset < 40 && da){
        backToTop.remove();
    }


    const selectedObj = {
        elementTxt: 'Backend',
        value: null
    }

    // Change the main headline in the header according to the current scroll position
    for (let element of headLines) {
        let elementTopOffset = element.offsetParent.offsetTop-window.pageYOffset;
        let offsetNegativ = 10;

        // With the bigger header we have to adjust the negativ offset
        if(!(window.innerWidth > 768)) {
            offsetNegativ = 60;
        }

        if (elementTopOffset-offsetNegativ < 0) {
            elementTopOffset = parseInt(elementTopOffset);
            if (!selectedObj.value || selectedObj.value < elementTopOffset) {
                selectedObj.elementTxt = element.textContent;
                selectedObj.value = elementTopOffset;
            }
        }
    }

    if (headerHeadline.textContent !== selectedObj.elementTxt) {
        headerHeadline.textContent = selectedObj.elementTxt;
    }

    // Gradient calculation for the header. Should be in a seperate function but I am lazy af
    const gradientPercent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
    // Calculate the delta between the two rgb values by scroll position, currently hard coded
    const r = (138 - 95) * (gradientPercent/100);
    const g = (43 - 176) * (gradientPercent/100);
    const b = (226 - 183) * (gradientPercent/100);

    //header.style.backgroundImage = `linear-gradient(to right, #8A2BE2 rgb(138, 43, 226), #5FB0B7 ${((100-gradientPercent) >= 40 ? 100-gradientPercent : 40)}%)`;
    header.style.backgroundImage = `linear-gradient(60deg, rgb(138, 43, 226) 20%, rgb(${138 - r}, ${43 - g}, ${226 - b}) 55%)`;

    window.requestAnimationFrame(scrollHandler);
};

window.requestAnimationFrame(scrollHandler);
