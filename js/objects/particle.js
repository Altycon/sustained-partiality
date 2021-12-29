
class Particle{
    constructor(canvas, x, y){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.position = new Vector(x,y);
        this.radius = 1;
        this.color = `rgba(0,0,${Math.floor(Math.random()*255)}, ${randomRange(.1, .3)})`;
        this.velocity = this.createRandomVelocity();
    }
    update(){
        if(this.hitsTopBottom()) this.velocity.y = this.velocity.y * -1;
        if(this.hitsLeftRight()) this.velocity.x = this.velocity.x * -1;
        this.position = this.position.add(this.velocity);
        this.draw();
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    hitsEdges(){
        return (this.position.x < 0 || this.position.y < 0 ||
                this.position.x > this.canvas.width || this.position.y > this.canvas.height);
    }
    hitsTopBottom(){
        return (this.position.y < 0 || this.position.y > this.canvas.height)
    }
    hitsLeftRight(){
        return ( this.position.x < 0 || this.position.x > this.canvas.width)
    }
    createRandomVelocity(){
        return new Vector(Math.random() < 0.5 ? -1 : 1, Math.random() < 0.5 ? -1 : 1);
    }
}

// Planning on adding more things.....blah blah blah...testing...testing..