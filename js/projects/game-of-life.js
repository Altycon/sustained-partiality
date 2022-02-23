

let GOF_CANVAS;
let GOF_CANVAS_WIDTH;
let GOF_CANVAS_HEIGHT;
let GOF_CTX;
let RESOLUTION;
let COLUMNS;
let ROWS;
let GOF_GRID_ARRAY;
let SavedGrid;
let GameOfLifeInterval;

// set the canvas size in the index.js file

const createGrid = (columns,rows)=>{
    return new Array(columns).fill(null).map(()=> new Array(rows).fill(null)
    .map( ()=> Math.random() > 0.5 ? 1:0));
}

const createNextGeneration = (grid,columns,rows)=>{
    // copy the grid
    let nextGrid = grid.map(arr=> [...arr]);
    
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
            const cell = grid[col][row];
            //check each cells neighbors
            let Neighbors = 0;
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if(i===0 && j===0) continue;
                    const X_Cell = col + i;
                    const Y_Cell = row + j;
                    if(X_Cell >= 0 && Y_Cell >= 0 && X_Cell < columns && Y_Cell < rows){
                        const currentNeighbor = grid[X_Cell][Y_Cell];
                        Neighbors += currentNeighbor; 
                    }
                }
            }
            if(cell === 1 && Neighbors < 2){
                nextGrid[col][row] = 0;
            }else if(cell === 1 && Neighbors > 3){
                nextGrid[col][row] = 0;
            }else if(cell === 0 && Neighbors === 3){
                nextGrid[col][row] = 1;
            }
        }
    }
    return nextGrid;
}

const renderGameOfLifeGrid = (ctx,grid,size)=>{
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            const cell = grid[i][j];

            ctx.beginPath();
            ctx.rect(i * size, j * size, size, size);
            //ctx.strokeStyle = cell ? '#000':'#fff';
            ctx.fillStyle = cell ? '#fff':'#000';
            ctx.fill();
            ctx.stroke();
        }
    }
}

const startGameOfLifeAnimation = (ctx,grid,resolution,columns,rows)=>{
    
    const animateGameOfLife = (time)=>{
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        grid = createNextGeneration(grid,columns,rows);
        renderGameOfLifeGrid(ctx,grid,resolution);
        //log(time)
        GameOfLifeInterval = requestAnimationFrame(animateGameOfLife);
    }
    animateGameOfLife();
}
const resetGameOfLife = (ctx,grid,resolution,columns,rows)=>{
    cancelAnimationFrame(GameOfLifeInterval);
    GameOfLifeInterval = undefined
    grid = createGrid(columns,rows);
    renderGameOfLifeGrid(ctx,grid,resolution);
}
const hideWrapperDisplayFullPage = (ev)=>{
    document.getElementById('HomeBackgroundCanvas').style.display = 'none';
    ev.target.classList.add('hidden');
    document.querySelector('.fullPageContainer').classList.add('appear');
    ev.target.style.animation = 'none';
    ev.target.removeEventListener('animationend', hideWrapperDisplayFullPage)
}

let fullPageCanvas;
let fpctx;
let fpCanvasWidth;
let fpCanvasHeight;
let fullPageResolution;
let fullPageColumns;
let fullPageRows;

let FullPageGrid;

const createAndRenderNewGrid = ()=>{
    fullPageCanvas = document.getElementById('FullPageCanvas');
    fullPageCanvas.width = innerWidth;
    fullPageCanvas.height = innerHeight;
    fpctx = fullPageCanvas.getContext('2d');
    fpCanvasWidth = fullPageCanvas.width;
    fpCanvasHeight = fullPageCanvas.height;
    fullPageResolution = 5;
    fullPageColumns = Math.floor(fpCanvasWidth/fullPageResolution);
    fullPageRows = Math.floor(fpCanvasHeight/fullPageResolution);
    FullPageGrid = createGrid(fullPageColumns,fullPageRows);
    renderGameOfLifeGrid(fpctx,FullPageGrid,fullPageResolution);
}

const applyButtonFunctions = (ev)=>{
    const target = ev.target.getAttribute('id');
    switch(target){
        case 'FullPageStartGame':
            startGameOfLifeAnimation(fpctx,FullPageGrid,fullPageResolution,fullPageColumns,fullPageRows);
            break;
        case 'FullPageResetGame':
            resetGameOfLife(fpctx,FullPageGrid,fullPageResolution,fullPageColumns,fullPageRows);
            break;
        case 'FullPageCloseWindow':
            document.querySelector('.fullPageContainer').classList.remove('appear');
            const wrapper = document.querySelector('.page-wrapper');
            wrapper.classList.remove('hidden');
            wrapper.style.animation = 'fadeIn 1s linear forwards';
            fpctx.clearRect(0,0,fpCanvasWidth,fpCanvasHeight);
            FullPageGrid = null;
            break;
    }
}
const attachFullPageGameOfLifeListeners = ()=>{
    const buttons = document.querySelectorAll('.full-page-button');
    buttons.forEach(button => {
        button.addEventListener('click', applyButtonFunctions)
    })
}
const removeFullPageGameOfLifeListeners = ()=>{
    const buttons = document.querySelectorAll('.full-page-button');
    buttons.forEach(button => {
        button.removeEventListener('click', applyButtonFunctions)
    })
}
const ExpandGameOfLifeFullScreen = ()=>{
    const wrapper = document.querySelector('.page-wrapper');
    wrapper.style.animation = 'fadeAway 1s linear forwards';
    wrapper.addEventListener('animationend', hideWrapperDisplayFullPage);
    attachFullPageGameOfLifeListeners();
    createAndRenderNewGrid();
}

// const FullPageCloseButton = document.getElementById('FullPageCloseWindow');
// FullPageCloseButton.addEventListener('click', (ev)=>{
//     document.querySelector('.fullPageContainer').classList.remove('appear');
//     const wrapper = document.querySelector('.page-wrapper');
//     wrapper.classList.remove('hidden');
//     wrapper.style.animation = 'fadeIn 1s linear forwards';

// })


const initializeGameOfLife = ()=>{
    GOF_CANVAS = document.getElementById('GameOfLifeCanvas');
    GOF_CANVAS_WIDTH = GOF_CANVAS.getBoundingClientRect().width;
    GOF_CANVAS_HEIGHT = GOF_CANVAS.getBoundingClientRect().height;
    GOF_CTX = GOF_CANVAS.getContext('2d');
    RESOLUTION = 5;
    COLUMNS = GOF_CANVAS_WIDTH/RESOLUTION;
    ROWS = GOF_CANVAS_HEIGHT/RESOLUTION;
    
    GOF_GRID_ARRAY = createGrid(COLUMNS,ROWS);
    
    renderGameOfLifeGrid(GOF_CTX,GOF_GRID_ARRAY,RESOLUTION);
}

const attachGameOfLifeButtonListeners = ()=>{
    const GOF_BUTTONS = document.querySelectorAll('.gof-button');
    GOF_BUTTONS.forEach(button => {
        button.addEventListener('click', (ev)=>{
             ev.preventDefault();
             const target = ev.target.dataset.value;
             switch(target){
                case "start":
                    startGameOfLifeAnimation(GOF_CTX,GOF_GRID_ARRAY,RESOLUTION,COLUMNS,ROWS);
                    log(target)
                    break;
                case "reset":
                    resetGameOfLife(GOF_CTX,GOF_GRID_ARRAY,RESOLUTION,COLUMNS,ROWS);
                    log(target)
                    break;
                case "expand":
                    ExpandGameOfLifeFullScreen();
                    log(target)
                    break;
             };
        });
    });
}

