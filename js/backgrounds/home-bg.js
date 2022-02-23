
// This is initialized in index.js

// I added this to test github stuff

/*
    Creating a background for the home page
    -final goal is to use surreal numbers in some way
    - maybe using floating partilcls for now
*/

const HomeCanvas = createCanvas();
const HomeCtx = HomeCanvas.getContext('2d');
let Particles = createParticleArray(HomeCanvas,100);


let HomeAnimationRequest;

function createCanvas(){
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id','HomeBackgroundCanvas');
    canvas.width = document.body.getBoundingClientRect().width;
    canvas.height = document.body.getBoundingClientRect().height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.insertBefore(canvas, document.querySelector('page-wrapper'));
    return canvas;
}

function createParticleArray(canvas,n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(new Particle(canvas, Math.random() * canvas.width, Math.random()* canvas.height));
    }
    return arr;
}




function CreateHomeBackground(){
    
    Particles.forEach(particle => particle.radius = Math.ceil(Math.random()* 5));
    Particles.forEach(particle => particle.draw());
    
    animate();
}


function animate(){

    HomeCtx.clearRect(0,0, HomeCanvas.width, HomeCanvas.height);

    Particles.forEach(particle => particle.update());

    HomeAnimationRequest = window.requestAnimationFrame(animate)
}