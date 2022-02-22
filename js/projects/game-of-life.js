

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
            ctx.strokeStyle = cell ? '#000':'#fff';
            ctx.fillStyle = cell ? '#fff':'#000';
            ctx.fill();
            ctx.stroke();
        }
    }
}

const startGameOfLifeAnimation = (ctx,grid,resolution,columns,rows)=>{
    const c = columns;
    const r = rows;
    const animateGameOfLife = (time)=>{
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        grid = createNextGeneration(grid,c,r);
        renderGameOfLifeGrid(ctx,grid,resolution);
        //log(time)
        requestAnimationFrame(animateGameOfLife);
    }
    animateGameOfLife();
}

const initializeGameOfLife = ()=>{
    const GOF_CANVAS = document.getElementById('GameOfLifeCanvas');
    const GOF_CANVAS_WIDTH = GOF_CANVAS.getBoundingClientRect().width;
    const GOF_CANVAS_HEIGHT = GOF_CANVAS.getBoundingClientRect().height;
    const GOF_CTX = GOF_CANVAS.getContext('2d');
    const RESOLUTION = 5;
    const COLUMNS = GOF_CANVAS_WIDTH/RESOLUTION;
    const ROWS = GOF_CANVAS_HEIGHT/RESOLUTION;
    
    
    let GOF_GRID_ARRAY = createGrid(COLUMNS,ROWS);
    //console.table(GOF_GRID_ARRAY)
    renderGameOfLifeGrid(GOF_CTX,GOF_GRID_ARRAY,RESOLUTION); // I should maybe do this with intersection observer or right away when page loads
    //createNextGeneration(GOF_GRID_ARRAY,COLUMNS,ROWS);
    //renderGrid(); ?

    startGameOfLifeAnimation(GOF_CTX,GOF_GRID_ARRAY,RESOLUTION,COLUMNS,ROWS);
}

const attachGameOfLifeButtonListeners = ()=>{
    const GOF_BUTTONS = document.querySelectorAll('.gof-button');
    GOF_BUTTONS.forEach(button => {
        button.addEventListener('click', (ev)=>{
             ev.preventDefault();
             const target = ev.target.dataset.value;
             switch(target){
                case "start":
                    //startGameOfLife();
                    log(target)
                    break;
                case "reset":
                    //resetGameOfLife();
                    log(target)
                    break;
                case "stop":
                    //stopGameOfLife();
                    log(target)
                    break;
                case "expand":
                    //expandGameOfLife();
                    log(target)
                    break;
             };
        });
    });
}

