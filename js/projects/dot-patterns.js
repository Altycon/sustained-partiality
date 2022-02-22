

const StartButtons = document.querySelectorAll('.start-button');
const StopButtons = document.querySelectorAll('.stop-button');
const BackgroundCanvases = document.querySelectorAll('.background-canvas')
const ForegroundCanvases = document.querySelectorAll('.foreground-canvas');

const createDots = (totalDots, canvas)=> {
    let arr = [];
    for(let i = 0; i < totalDots; i++){
        const x = randomRange(0, canvas.width);
        const y = randomRange(0, canvas.height);
        const radius = 1;
        const dot = {x: x, y: y, radius: radius};
        arr.push(dot);
    }
    return arr;
}

const renderDot = (ctx, dot)=>{
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

const renderDots = (ctx,dots)=>{
    for(let i = 0; i < dots.length; i++){
        renderDot(ctx, dots[i]);
    }
}

class Square{
    constructor(x,y,w,state){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = w;
        this.state = state;
        this.color = state ? 'hsl(0 100% 100%)' : 'transparent';
    }
    render(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
class EqualateralTriangle{
    constructor(x,y,size,state){
        this.x = x;
        this.y = y;
        this.size = size;
        this.state = state;
        this.color = 'hsl(0 100% 100%)';
        this.angle1 = 60 * Math.PI/180;
        this.angle2 = 300 * Math.PI/180;
        this.x2 = this.x + this.size * Math.cos(this.angle1);
        this.y2 = this.y + this.size * Math.sin(this.angle1);
        this.x3 = this.x2 + this.size * Math.cos(this.angle2);
        this.y3 = this.y2 + this.size * Math.sin(this.angle2);
    }
    render(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const createSquares = (canvas,resolution)=>{
    let arr = [];
    const columns = canvas.width/resolution;
    const rows = canvas.height/resolution;
    let state = 0;
    for(let i = 0; i < columns; i++){
        for(let j = 0; j < rows; j++){
            
            if(state === 1){
                state = 0;
            }else if(state === 0){
                state = 1;
            }
            arr.push(new Square(i*resolution,j*resolution,resolution,state));
        }
    }
    return arr;
}

const createTriangles = (canvas,resolution)=>{
    let arr = [];
    const columns = canvas.width/resolution;
    const rows = canvas.height/resolution;
    let state = 0;
    for(let i = 0; i < columns; i++){
        for(let j = 0; j < rows; j++){
            
            if(state === 1){
                state = 0;
            }else if(state === 0){
                state = 1;
            }
            arr.push(new EqualateralTriangle(i*resolution,j*resolution,resolution,state));
        }
    }
    return arr;
}

const renderShape = (ctx,grid)=>{
    for(let i = 0; i < grid.length; i++){
        grid[i].render(ctx);
    }
}

const animationNA = (ctx)=> {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'hsl(60 100% 50%)';
    ctx.textAlign = 'center';
    ctx.fillText('ANIMATION', ctx.canvas.width/2, ctx.canvas.height/2 - 16);
    ctx.fillText('NOT YET', ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.fillText('AVAILABLE', ctx.canvas.width/2, ctx.canvas.height/2 + 16);
}

const startPatternAnimation = (ev) => {
    const backgroundCanvas = ev.target.parentNode.parentNode.querySelector('.background-canvas');
    const foregroundCanvas = ev.target.parentNode.parentNode.querySelector('.foreground-canvas');
    const canvasValue = backgroundCanvas.dataset.value;
    const backCTX = backgroundCanvas.getContext('2d');
    const foreCTX = foregroundCanvas.getContext('2d');

    switch(canvasValue){
        case "A":
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            foregroundCanvas.style.animation = `rotateBackAndForth 5s linear 1s infinite`;
            break;
        case "B":
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            foregroundCanvas.style.animation = `rotatedAndTranslateY 5s linear infinite`;
            break;
        case "C":
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            foregroundCanvas.style.animation = `rotatedAndTranslateX 5s linear infinite`;
            break;
        case "D":
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            foregroundCanvas.style.animation = `scaleRotation 5s linear infinite`;
            break;
        case "E":
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            foregroundCanvas.style.animation = `scaledRotatedTranslated 10s linear infinite`;
            break;
        case "F":
            const resolution = 3;
            const SquareGrid = createSquares(backgroundCanvas,resolution);
            log(SquareGrid)
            renderShape(backCTX,SquareGrid);
            renderShape(foreCTX,SquareGrid);
            foregroundCanvas.style.animation = `rotateOnly 60s linear infinite`;
            break;
        case "G":
            const size = 5;
            const TriangleGrid = createTriangles(backgroundCanvas,size);
            renderShape(backCTX,TriangleGrid);
            renderShape(foreCTX,TriangleGrid);
            foregroundCanvas.style.animation = `rotateOnly 60s linear infinite`;
            //animationNA(backCTX);
            break;
    }
}
const stopPatternAnimation = (ev)=>{
    const backgroundCanvas = ev.target.parentNode.parentNode.querySelector('.background-canvas');
    const foregroundCanvas = ev.target.parentNode.parentNode.querySelector('.foreground-canvas');
    backgroundCanvas.getContext('2d').clearRect(0,0,backgroundCanvas.width,backgroundCanvas.height);
    foregroundCanvas.getContext('2d').clearRect(0,0,foregroundCanvas.width,foregroundCanvas.height);
    foregroundCanvas.style.animation = "";
}
const attachStartButtonListeners = (buttons)=> {
    buttons.forEach( button => {
        button.addEventListener('click', startPatternAnimation);
    });
}
const attachStopButtonListeners = (buttons)=>{
    buttons.forEach(button=>{
        button.addEventListener('click', stopPatternAnimation);
    });
}