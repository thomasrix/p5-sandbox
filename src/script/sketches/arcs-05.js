import {create, select} from '../utils/trix';
import p5 from 'p5';
// import circles from '../utils/circle-configs';


const sketch = (p) => {
    const circleCount = 400;
    const circleSteps = 1000;
    const circleStep = Math.PI * 2 / circleSteps;

    const meanRadius = Math.min(p.windowWidth * 0.3, p.windowHeight * 0.3);
    let radius = meanRadius;

    const center = {x: p.windowWidth * 0.5, y: p.windowHeight * 0.5};
    // p.colorMode(p.RGB, 255, 255, 255, 1);
    // const bgColor = p.color(12, 5, 1);
    // const bgColor = p.color(40, 45, 41);
    // let startColor = p.color('#070708');
    let firstColor = p.color('#3f0900')
    let secondColor = p.color('#42231e')
    let startColor = p.lerpColor(firstColor, secondColor, 0);
    let endColor = p.color('#e88676');
    startColor.setAlpha(255);
    endColor.setAlpha(20);
    
    let x = 0;
    p.setup = ()=> {
        
        // p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        // p.fill(bgColor);
        p.background('#3f3f46');
        // p.rect(0, 0, p.width, p.height);
        p.noFill();
        p.strokeCap(p.SQUARE);
        
        // TODO: Vary the radius and perhaps the color in each call:
        
        p5s.noiseSeed(70);
        radius = meanRadius - 110;
        startColor = p.lerpColor(firstColor, secondColor, 0.1);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 12, 'inside');
        }
        
        p5s.noiseSeed(87);
        radius = meanRadius - 80;
        startColor = p.lerpColor(firstColor, secondColor, 0.2);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 15, 'inside');
        }
        
        p5s.noiseSeed(100);
        radius = meanRadius - 50;
        startColor = p.lerpColor(firstColor, secondColor, 0.3);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 14, 'inside');
        }
        
        p5s.noiseSeed(10);
        radius = meanRadius - 30;
        startColor = p.lerpColor(firstColor, secondColor, 0.4);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 12, 'inside');
        }
        
        p5s.noiseSeed(2);
        radius = meanRadius - 10;
        startColor = p.lerpColor(firstColor, secondColor, 0.5);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 18, 'inside');
        }
        
        radius = meanRadius;
        p5s.noiseSeed(6);
        startColor = p.lerpColor(firstColor, secondColor, 0.6);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 10, 'inside');
        }
        
        p5s.noiseSeed(7);
        startColor = p.lerpColor(firstColor, secondColor, 0.7);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 24, 'outside');
        }
        
        p5s.noiseSeed(23);
        startColor = p.lerpColor(firstColor, secondColor, 0.8);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 14, 'outside');
        }
        
        p5s.noiseSeed(18);
        startColor = p.lerpColor(firstColor, secondColor, 0.9);
        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i, 12, 'both');
        }
        // drawPerfectCircle();
    }
    
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        //   x += 5;
    }

    const drawPerfectCircle = () => {
        const circleSteps = 500;
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
    const perlinDisplace = (x, y, s = 10, direction = 'both')=>{
        // console.log('p', direction)
        const d = {
            inside:{min:-1, max:0},
            outside:{min:0, max:1},
            both:{min:-1, max:1},
        }
        return p5s.map(p5s.noise(x * 0.008, y * 0.008), 0, 1, d[direction].min, d[direction].max) * s;
    }

    const drawCircle = (index, strngth = 20, direction ) => {
        // console.log('draw', direction)
        let strength = p5s.map(index, 0, circleCount, 0, strngth).toFixed(3);
        // console.log(strength)
 
        const cl = p.lerpColor(startColor, endColor, p.norm(index, 0, circleCount));
        p.stroke(cl);

        p.strokeWeight(1.5);

        let angle = 0;
        let dp = {
            x:center.x + Math.cos(angle) * (radius), 
            y:center.y + Math.sin(angle) * (radius)
        };
        let displace = perlinDisplace(dp.x, dp.y, 10, direction) * strength;
        // let displace = perlinDisplace(center.x + Math.cos(angle) * (radius), center.y + Math.sin(angle) * (radius)) * strength;
        // const sp = perlinize(center.x + Math.cos(angle) * (radius - index), center.y + Math.sin(angle) * (radius - index), strength);
        
        const position = {
            x:center.x + Math.cos(angle) * (radius + displace),
            y:center.y + Math.sin(angle) * (radius + displace)
        };
        
        //TODO: displace den aktuelle x, y postioin i stedet for den forrige
        
        const drawLine = (pos, i) => {
            angle = i * circleStep;
            // console.log(i, displace)
            dp = {
                x:center.x + Math.cos(angle) * (radius), 
                y:center.y + Math.sin(angle) * (radius)
            }
            displace = perlinDisplace(dp.x, dp.y, 10, direction) * strength;
            
            const p = {
                x:center.x + Math.cos(angle) * (radius + displace), 
                y:center.y + Math.sin(angle) * (radius + displace)
            };
            
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