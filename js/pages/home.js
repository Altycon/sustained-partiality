
/*
        Notes

    -Should I keep the slight 3d movement listeners? The movement is clipping the circle element when opened.
        Add and remove them maybe? But I can't figure that out correctly
*/

function addDesktopListeners(){

    const PrimaryContentContainer = document.querySelector('.primary-section .content');
    const CirclesContainer = document.querySelector('.circles-container');
    const Circles = document.querySelectorAll('.circle');
    const Circle1 = document.querySelector('.circle1');
    const Circle2 = document.querySelector('.circle2');

    addCircleEventListeners(Circles);
}


function addCircleEventListeners(circles){
    circles.forEach(circle=>{
        circle.addEventListener('click', (ev)=>{
            ev.target.setAttribute('data-active', 'true');
            ev.target.classList.add('open');
            addCloseCircleEventListeners(ev.target, circles);
        })
    })
}

function addCloseCircleEventListeners(element, circles){
    document.querySelectorAll('.close-button').forEach(button =>{
        button.addEventListener('click', (ev)=>{
            element.setAttribute('data-active', 'false');
            element.classList.remove('open');
            button.removeEventListener('click', addCloseCircleEventListeners);
        });
    })
}

function addMobileListeners(){
    
}