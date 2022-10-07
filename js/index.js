
const url = "/sendInfo";
const info = {id: 3458345734898345, data: "Something to recieve"};
const xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send(info);

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

const setGameOfLifeCanvasSize = ()=>{
    const canvasParent = document.querySelector('.gof-grid-container');
    const parentDemension = canvasParent.getBoundingClientRect();
    const parentWidth = parentDemension.width;
    const ParentHeight = parentDemension.height;
    const gameCanvas = document.getElementById('GameOfLifeCanvas');
    gameCanvas.width = parentWidth;
    gameCanvas.height = ParentHeight;
}



function addDesktopListeners(){

    // I should probably use intersection observer to add to
    // the event listeners to each section of the page

    addCircleEventListeners();
    attachStartButtonListeners(StartButtons);
    attachStopButtonListeners(StopButtons);
    attachGameOfLifeButtonListeners();
}

function init(){

    setArtCanvas();
    setTertiearyCanvasSizes();
    setGameOfLifeCanvasSize();

    CreateHomeBackground();


    addDesktopListeners()

    // This should probably be started and stopped with intersection observer;
    startArtDisplay();
    
    DOTS = createDots(1000,document.querySelector('.canvas'));

    initializeGameOfLife();
}

document.addEventListener('DOMContentLoaded', init);
