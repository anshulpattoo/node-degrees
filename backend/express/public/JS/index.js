function defineElements() {
    const elements = {
        introText: document.querySelectorAll('.app-intro-text span'),
        header: document.querySelector('header'),
        video: document.querySelector('video'),
        introSection: document.querySelector('.intro-section'),
        body: document.querySelector('body'),
        stickyTitleBar: document.querySelectorAll('.sticky')

    };
    return elements;
}

function onload() {
    const elements = defineElements();
    setTimeout(function() {
        elements.introText.forEach(el => el.style.display = 'inline');
    }, 50);
    return elements;
}

window.addEventListener('load', onload);

//This functionality is to be reviewed.
/*

window.addEventListener('scroll', function() {
    const elements = defineElements();
    if (window.scrollY >= elements.introSection.offsetHeight * 1.25) {
        const markup = `<div class='sticky animate__animated animate__fadeIn' style="
            text-align: center;
            position: fixed;
            height:100px;
            "
            class="container">
                <p style=" margin-top: 20px;">
                Github Degrees of Separation
                </p>
            </div>`;
        elements.body.insertAdjacentHTML('afterbegin', markup); 
    } else {
        if (elements.stickyTitleBar) {
            console.log('dsfsfd');
            elements.stickyTitleBar.forEach(el => {
                el.classList.add('animate__animated');
                el.classList.add('animate__fadeOut');
            });
        }
    }
});
*/