import {create, select} from '../utils/trix';
import p5 from 'p5';


const sketch = (p) => {
    const circleCount = 1500;
    const circleSteps = 500;
    const circleStep = Math.PI * 2 / circleSteps;
    const radius = Math.max(p.windowWidth * 0.25, p.windowHeight * 0.25);
    const center = {x: p.windowWidth * 0.5, y: p.windowHeight * 0.5};
    const bgColor = p.color('#16191a');
    p.colorMode(p.RGB, 255, 255, 255, 1);
    let endColor = p.color(0, 0, 0, 0.8);
    let startColor = p.color(124, 235, 245, 0.1);
    let x = 0;
    p.setup = ()=> {
       
        // p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.fill(bgColor);
        p.rect(0, 0, p.width, p.height);
        p.noFill();
        for(let i = 0 ; i < circleCount ; i ++ ){
            p5s.noiseSeed(i+20);
            drawCircle(i);
        }
    }
    
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        //   x += 5;
    }
    const perlinize = (x, y, s = 60) => {
        const scale = 0.008;
        // const strength = 60;
        const angle = p5s.noise(x * scale, y * scale) * Math.PI;
        return {
            x: x + Math.cos(angle) * s,
            y: y + Math.sin(angle) * s,
        }
    }
    const drawCircle = (index) => {
        let angle = 0;
        let strength = p.map(index, 0, circleCount, 20, 50);
        const sp = perlinize(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius, strength);
        const position = {
            x:sp.x,
            y:sp.y
        };
        // const start = {...position};
        // const hue = 200;
        const cl = p.lerpColor(startColor, endColor, p.norm(index, 0, circleCount * 1.05));
        // cl.setAlpha(50 - index);
        p.stroke(cl);
        p.strokeWeight(2);
        p.strokeCap(p.SQUARE);

        const drawLine = (pos, i) => {
            angle = i * circleStep;
            
            const p = perlinize(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius, strength);
                       
            p5s.line(pos.x, pos.y, p.x, p.y);
            pos.x = p.x;
            pos.y = p.y;

        }
        for(let i = 1 ; i < circleSteps +1; i++){
            drawLine(position, i);
        }
        // p5s.line(start.x, start.y, position.x, position.y);
        

    }
    const drawShape = ()=>{
        p.ellipse(110, 150, 80, 180);
    }
}
const p5s = new p5(sketch);