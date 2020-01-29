import {create, select} from '../utils/trix';
import p5 from 'p5';

class Branch {
    constructor(x, y){
        this.x = this.px = x;
        this.y = this.py = y;
    }
}

const sketch = (p) => {
    let n = p.noise;
    let x = 0;
    let branches = [];
    const createBranches = (amount = 0)=>{
        for(let i = 0 ; i < amount ; i++){
            branches.push(new Branch(100, 100))
        }
    }
    p.setup = ()=> {
        p.createCanvas(640, 480);
        createBranches(1);
        console.log(branches);
        // drawShape();

    }
    
    p.draw = ()=> {
    //   p.ellipse(x, 50, 80, 80);
      x += 5;
}
const drawShape = ()=>{
      p.ellipse(110, 150, 80, 180);

    }

}
const p5s = new p5(sketch);