
const setArtCanvas = ()=>{
    const canvasParent = document.querySelector('.art-canvas-container');
    const parentDemension = canvasParent.getBoundingClientRect();
    const ParentWidth = parentDemension.width;
    const ParentHeight = parentDemension.height;
    const canvas = document.getElementById('ArtCanvas');
    canvas.width = ParentWidth;
    canvas.height = ParentHeight;
}

let artDisplayInterval;
const NUMBER_OF_WALKERS = 500;

class Walker{
    constructor(x,y){
        this.position = new Vector(x,y);
        this.speed = 3;
        this.velocity = new Vector(this.speed, this.speed);
        this.radius = 2;
        this.color = `hsl(${randomRange(200,300,true)} 100% 50%)`;
        this.strokeColor = `hsl(0 100% 0% / .5)`;
    }
    update(ctx){
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        if(this.position.x < -w/2 || this.position.y < -h/2 ||
            this.position.x > w/2 || this.position.y > h/2){
                this.position.x = randomRange(-w/2, w/2);
                this.position.y = randomRange(-h/2, h/2);
                this.color = `hsl(${randomRange(40,60,true)} 100% 50%)`;
                this.strokeColor = `hsl(${randomRange(220,260,true)} 100% 50% / .5)`;
            }
        this.velocity.x = randomRange(-this.speed,this.speed);
        this.velocity.y = randomRange(-this.speed,this.speed);
        this.position = this.position.add(this.velocity);
    }
    render(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.fill();
        ctx.stroke();
    }
}

const createWalkers = (num,width,height)=>{
    let arr = [];
    for(let i = 0; i < num; i++){
        arr.push(new Walker(
            randomRange(-width/2,width/2), 
            randomRange(-height/2,height/2)));
    }
    return arr;
}

const animateArtDisplay = (ctx,walkers)=>{
    const len = walkers.length;

    const animateArt = ()=>{

        for(let i = 0; i < len; i++){
            walkers[i].update(ctx);
            walkers[i].render(ctx);
        }
        artDisplayInterval = requestAnimationFrame(animateArt);
    }
    animateArt();    
}

const startArtDisplay = ()=>{

    const canvas = document.getElementById('ArtCanvas');
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width/2, canvas.height/2);

    const Walkers = createWalkers(NUMBER_OF_WALKERS, canvas.width, canvas.height);

    animateArtDisplay(ctx, Walkers);

}