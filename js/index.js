
// Any variable which needs to be initialized right away or before something else
let DOTS;

const setTertiearyCanvasSizes = ()=>{
    const canvasParent = document.querySelector('.canvas-container');
    const parentDemension = canvasParent.getBoundingClientRect();
    const ParentWidth = parentDemension.width;
    const ParentHeight = parentDemension.height;
    const AllCanvases = document.querySelectorAll('.canvas');

    AllCanvases.forEach(canvas=> {
        canvas.width = ParentWidth;
        canvas.height = ParentHeight;
    })
};



function addDesktopListeners(){

    // I should probably use intersection observer to add to
    // the event listeners to each section of the page

    addCircleEventListeners();
    attachStartButtonListeners(StartButtons);
    attachStopButtonListeners(StopButtons);
}

function init(){

    setTertiearyCanvasSizes();

    CreateHomeBackground();


    addDesktopListeners()
    
    calendarStart();

    
    DOTS = createDots(1000,document.querySelector('.canvas'));
}

document.addEventListener('DOMContentLoaded', init);