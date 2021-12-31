
function rotateCircleContainer(ev){
    let x = (window.innerWidth / 2- ev.pageX) / 50;
    let y = (window.innerHeight / 2 - ev.pageY) / 50;
    document.querySelector('.circles-container').style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
}

function addDesktopListeners(){

    const PrimaryContentContainer = document.querySelector('.primary-section .content');
    const CirclesContainer = document.querySelector('.circles-container');
    const Circle1 = document.querySelector('.circle1');
    const Circle2 = document.querySelector('.circle2');



    /*  Giving some slight 3d movement to the circles as the mouse moves around */

    PrimaryContentContainer.addEventListener('mousemove', rotateCircleContainer);

    PrimaryContentContainer.addEventListener('mouseenter', (ev) =>{
        CirclesContainer.style.transistion = 'none';
    });
    PrimaryContentContainer.addEventListener('mouseleave', (ev) =>{
        CirclesContainer.style.transistion = 'all 500ms ease';
        CirclesContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });


    addCircleEventListeners(Circle1,Circle2);
}



function addCircleEventListeners(...circles){
    circles.forEach(circle=>{
        circle.addEventListener('click', (ev)=>{
            ev.target.setAttribute('data-active', 'true');
            ev.target.classList.add('open');
            document.querySelector('.primary-section .content').removeEventListener('mousemove', rotateCircleContainer);
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
            document.querySelector('.primary-section .content').addEventListener('mousemove', rotateCircleContainer);
        });
    })
}

function addMobileListeners(){
    
}