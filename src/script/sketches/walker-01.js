import {create, select} from '../utils/trix';
import p5 from 'p5';

class Branch {
    constructor(x, y){
        this.x = this.px = x;
        this.y = this.py = y;
        this.visible = true;
        this.color = p5s.color(p5s.random(10, 110 + 100), 70, 100, 100);
        this.speed = {
            x:p5s.random(-7, 7),
            y:p5s.random(-7, 7),
        }
    }
    draw() {
        p5s.line(this.px, this.py, this.x, this.y);
    }
    move(){
        // this.speed.x += p5s.random(-10, 10);
        // this.speed.y += p5s.random(-10, 10);
        this.speed.x += (p5s.noise(this.x * .0005, this.y * .005, p5s.millis() * .0001) * 2) -1;
        this.speed.y += (p5s.noise(this.y * .005, this.x * .005, p5s.millis() * .0001) * 2) -1;
        this.x += this.speed.x;
        this.y += this.speed.y;
    }
    testBounds(){
        // console.log(width);
        this.px = this.x;
        this.py = this.y;
        if(this.x < 0 || this.x > p5s.width || this.y < 0 || this.y > p5s.height){
            console.log('die');
            this.visible = false;
        }
    }
}

const sketch = (p) => {
    let x = 0;
    let counter = p.millis();
    const n = p.noise;
    // n.simplex3();
    let branches = [];
    const createBranches = (amount = 0)=>{
        branches = [];
        for(let i = 0 ; i < amount ; i++){
            branches.push(new Branch(p.windowWidth / 2, p.windowHeight / 2))
        }
    }
    p.setup = ()=> {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.strokeCap(p.SQUARE);
        p.blendMode(p.BLEND);
        createBranches(500);
        console.log(branches);
        document.querySelector('canvas').addEventListener('click', p.windowResized);
        // drawShape();
        
    }
    p.windowResized = ()=>{
        console.log('resized');
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.clear();
        p.noiseSeed(p.random(100));
        counter = p.millis();
        createBranches(1000);
    }
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        branches.forEach( branch => {
            if(branch.visible){
                // p.stroke(p.random([100, 150, 200, 250]));
                const a = 100 - ((p.millis() - counter) * .075)
                branch.move();
                p.strokeWeight(3);
                p.stroke(40, 50, 60, a - 40);
                branch.draw();
                p.strokeWeight(1);
                p.stroke(20, 30, 40, a);
                branch.draw();
                branch.testBounds();
            }
        })
        x += 5;
    }
    const drawShape = ()=>{
        p.ellipse(110, 150, 80, 180);
        
    }
    
}
const p5s = new p5(sketch);