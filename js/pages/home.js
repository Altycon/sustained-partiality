
function addDesktopListeners(){

    const PrimaryContentContainer = document.querySelector('.primary-section .content');
    const CirclesContainer = document.querySelector('.circles-container');


    /*  Giving some slight 3d movement to the circles as the mouse moves around */

    PrimaryContentContainer.addEventListener('mousemove', (ev) =>{
        let x = (window.innerWidth / 2- ev.pageX) / 50;
        let y = (window.innerHeight / 2 - ev.pageY) / 50;
        CirclesContainer.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    });
    PrimaryContentContainer.addEventListener('mouseenter', (ev) =>{
        CirclesContainer.style.transistion = 'none';
    });
    PrimaryContentContainer.addEventListener('mouseleave', (ev) =>{
        CirclesContainer.style.transistion = 'all 500ms ease';
        CirclesContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

function addMobileListeners(){
    
}