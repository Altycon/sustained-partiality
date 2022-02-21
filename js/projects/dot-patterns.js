

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

const animationNA = (ctx)=> {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = 'hsl(60 100% 50%)';
    ctx.textAlign = 'center';
    ctx.fillText('ANIMATION', ctx.canvas.width/2, ctx.canvas.height/2 - 16);
    ctx.fillText('NOT YET', ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.fillText('AVAILABLE', ctx.canvas.width/2, ctx.canvas.height/2 + 16);
}

const startCanvasAnimation = (canvas) => {
    
}
const attachStartButtonListeners = (buttons)=> {
    buttons.forEach( button => {
        button.addEventListener('click', (ev)=>{
            const backgroundCanvas = ev.target.parentNode.parentNode.querySelector('.background-canvas');
            const foregroundCanvas = ev.target.parentNode.parentNode.querySelector('.foreground-canvas');
            const canvasValue = backgroundCanvas.dataset.value;
            const backCTX = backgroundCanvas.getContext('2d');
            const foreCTX = foregroundCanvas.getContext('2d');

            // add dots and then with animation delay
            // add animation to foreground canvas rotation/translation etc.
            //const DOTS = createDots(100,backgroundCanvas);
            renderDots(backCTX,DOTS);
            renderDots(foreCTX,DOTS);
            //startCanvasAnimation()
            switch(canvasValue){
                case "A":
                    foregroundCanvas.style.animation = `rotateBackAndForth 5s linear 1s infinite`;
                    break;
                case "B":
                    foregroundCanvas.style.animation = `rotatedAndTranslateY 5s linear infinite`;
                    break;
                case "C":
                    foregroundCanvas.style.animation = `rotatedAndTranslateX 5s linear infinite`;
                    break;
                case "D":
                    foregroundCanvas.style.animation = `scaleRotation 5s linear infinite`;
                    break;
                case "E":
                    foregroundCanvas.style.animation = `scaledRotatedTranslated 10s linear infinite`;
                    break;
                case "F":
                    animationNA(backCTX);
                    break;
                case "G":
                    animationNA(backCTX);
                    break;
            }
            
        });
    });
}
const attachStopButtonListeners = (buttons)=>{
    buttons.forEach(button=>{
        button.addEventListener('click', (ev)=>{
            const foregroundCanvas = ev.target.parentNode.parentNode.querySelector('.foreground-canvas');
            foregroundCanvas.style.animation = "";
        });
    });
}