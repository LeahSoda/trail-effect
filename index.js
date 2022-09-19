const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//store the click spots in an array
let atoms = [];

class Atom {
    constructor(x, y){
        //initialize the brush
        this.x = x;
        this.y = y;

        //take 2
        this.radius = Math.random()*3;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
    }
    //updateSpeed window
    updateSpeed() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    updateSize(){
      this.radius-=0.12;
    }
    //draw
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        //maybe change color
        ctx.fill();
    }
}

//start autopaint whrn mouse is clicked
canvas.addEventListener('mousemove', function (e) {
    //the line grows in 20 start point
        for (let i = 0; i < 5; i++) {
            atoms.push(new Atom(e.x, e.y));
    }
    console.log(e.x, e.y);
});

//generate animation
const animate = () => {
    atoms.forEach((atom,index) => {
        atom.draw();
        atom.updateSpeed();
        atom.updateSize();

        //delete negative radius from atoms array
        if(atom.radius<0.2){
          atoms.splice(index, 1);
        }
    });

    //dissipating effect
    ctx.save();
    ctx.fillStyle='rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.restore();  //return to the original ctx setting
    requestAnimationFrame(animate);
}

animate();
