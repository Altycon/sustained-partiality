
/*
        Notes

    -Should I keep the slight 3d movement listeners? The movement is clipping the circle target when opened.
        Add and remove them maybe? But I can't figure that out correctly
*/

function addDesktopListeners(){

    

    addCircleEventListeners();
}


function addCircleEventListeners(){
    const circle2 = document.querySelector('.circle2');
    circle2.addEventListener('click', moveCirclesToCenter)

    // to reverse or close (temporary)
    const p = document.querySelector('.words p');
    p.addEventListener('click', moveCirclesBack)

}

function moveCirclesToCenter(){
    document.querySelectorAll('.circle').forEach( circle => {
        circle.classList.add('moveToCenter');
    })
    
}

function moveCirclesBack(){
    document.querySelectorAll('.circle').forEach( circle => {
        if(!circle.classList.contains('moveToCenter')){
            return;
        }else{
            circle.classList.remove('moveToCenter');
            circle.classList.add('moveBack');
            circle.addEventListener('animationend', (ev) => {circle.classList.remove('moveBack')});
        }
    })
}

function addMobileListeners(){
    
}