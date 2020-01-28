import {create, select} from '../utils/trix';
import p5 from 'p5';

const sketch = (p) => {
    let x = 0;
    p.setup = ()=> {
        p.createCanvas(640, 480);
        drawShape();
    }
    
    p.draw = ()=> {
      p.ellipse(x, 50, 80, 80);
      x += 5;
}
const drawShape = ()=>{
      p.ellipse(110, 150, 80, 180);

    }

}
const p5s = new p5(sketch);