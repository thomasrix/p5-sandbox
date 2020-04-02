import {create, select} from '../utils/trix';
import '../utils/circle-configs';
import p5 from 'p5';
import circles from '../utils/circle-configs';


const sketch = (p) => {
    const radius = Math.min(p.windowWidth * 0.33, p.windowHeight * 0.33);
    const center = {x: p.windowWidth * 0.5, y: p.windowHeight * 0.5};
    p.colorMode(p.RGB, 255, 255, 255, 1);
    // const bgColor = p.color(12, 5, 1);
    const bgColor = p.color(200, 205, 201);
    let endColor = p.color(144, 54, 1, 0.5);
    let startColor = p.color(254, 204, 0, 0.1);

    const circleConfigs = circles(p);

    let x = 0;
    p.setup = ()=> {
       
        // p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.fill(bgColor);
        p.rect(0, 0, p.width, p.height);
        p.noFill();
        circleConfigs.forEach(c => {
            c.step = Math.PI * 2 / c.steps;
            for(let i = 0 ; i < c.count ; i ++ ){
                p5s.noiseSeed(c.noiseSeedStart + i);
                drawCircle(i, c);
            }
        })
        // drawPerfectCircle();
    }
    
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        //   x += 5;
    }
    const perlinize = (x, y, s = 60) => {
        const scale = 0.008;
        // const strength = 60;
        const angle = p5s.map(p5s.noise(x * scale, y * scale) * (Math.PI * 2), 0, 1, -1, 1);
        const p = {
            x: x + Math.cos(angle) * s,
            y: y + Math.sin(angle) * s,
        }
        // console.log(angle, Math.cos(angle));
        return p;
    }
    const drawPerfectCircle = () => {
        const circleCount = 300;
        const circleSteps = 100;
        const circleStep = Math.PI * 2 / circleSteps;
    p.stroke('#FFFFFF');
        p.strokeWeight(0.5);

        let angle = 0;

        const position = {
            x:center.x + Math.cos(angle) * radius, 
            y:center.y + Math.sin(angle) * radius
        };

        const drawLine = (pos, i) => {
            angle = i * circleStep;
            
            const p = {
                x:center.x + Math.cos(angle) * radius, 
                y:center.y + Math.sin(angle) * radius
            };
                       
            p5s.line(pos.x, pos.y, p.x, p.y);
            pos.x = p.x;
            pos.y = p.y;
        }
        for(let i = 1 ; i < circleSteps +1; i++){
            drawLine(position, i);
        }

    }
    const drawCircle = (index, circleObject) => {
        let angle = 0;
        let strength = p.map(index, 0, circleObject.count, circleObject.strength.start, circleObject.strength.end);
        // console.log(index, strength);
        const sp = perlinize(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius, strength);
        const position = {
            x:sp.x,
            y:sp.y
        };
        // const start = {...position};
        // const hue = 200;
        const cl = p.lerpColor(circleObject.startColor, circleObject.endColor, p.norm(index, 0, circleObject.count));
        // cl.setAlpha(50 - index);
        p.stroke(cl);
        p.strokeWeight(circleObject.strokeWeight);
        p.strokeCap(p.SQUARE);

        const drawLine = (pos, i) => {
            angle = i * circleObject.step;
            
            const p = perlinize(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius, strength);
            
            // console.log(angle, Math.cos(angle) * strength, Math.sin(angle) * strength);

            p5s.line(pos.x, pos.y, p.x, p.y);
            pos.x = p.x;
            pos.y = p.y;

        }
        for(let i = 1 ; i < circleObject.steps +1; i++){
            drawLine(position, i);
        }
        // p5s.line(start.x, start.y, position.x, position.y);
        

    }
    const drawShape = ()=>{
        p.ellipse(110, 150, 80, 180);
    }
}
const p5s = new p5(sketch);