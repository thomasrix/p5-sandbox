import {create, select, map} from '../utils/trix';
import p5 from 'p5';
import TrixColors from '../utils/trix-colors';

const theColors = new TrixColors()
const colors = theColors.getColor(2);
const branchAmount = 2000;
class Branch {
    constructor(x, y){
        this.x = this.px = x;
        this.y = this.py = y;
        this.visible = true;
        this.color = p5s.color(p5s.random(colors));
        // this.color.setAlpha(10);
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
    let y = p.windowHeight *.7;
    let xVal = {
        start:p.windowWidth *.1,
        end:p.windowWidth *.9,
    }
    let branches = [];
    const createBranches = (amount = 0)=>{
        branches = [];
        for(let i = 0 ; i < amount ; i++){
            const x = map(i, 0, amount, xVal.start, xVal.end);
            branches.push(new Branch(x, y));
        }
    }
    p.setup = ()=> {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.strokeCap(p.SQUARE);
        p.blendMode(p.BLEND);
        createBranches(branchAmount);
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
        createBranches(branchAmount);
    }
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        branches.forEach( branch => {
            if(branch.visible){
                // p.stroke(p.random([100, 150, 200, 250]));
                const a = 255 - ((p.millis() - counter) * .25)
                branch.move();
                p.strokeWeight(3);
                // p.stroke(40, 50, 60, a - 40);
                // branch.draw();
                p.strokeWeight(1);
                branch.color.setAlpha(a);
                p.stroke(branch.color);
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