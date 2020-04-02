import {create, select} from '../utils/trix';
import p5 from 'p5';
// import circles from '../utils/circle-configs';


const sketch = (p) => {
    const circleCount = 200;
    const circleSteps = 1000;
    const circleStep = Math.PI * 2 / circleSteps;

    const radius = Math.min(p.windowWidth * 0.4, p.windowHeight * 0.4);
    const center = {x: p.windowWidth * 0.5, y: p.windowHeight * 0.5};
    p.colorMode(p.RGB, 255, 255, 255, 1);
    // const bgColor = p.color(12, 5, 1);
    const bgColor = p.color(40, 45, 41);
    let startColor = p.color(144, 54, 1, 0.5);
    let endColor = p.color(254, 204, 0, 0);
    
    let x = 0;
    p.setup = ()=> {
        
        // p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.fill(bgColor);
        p.rect(0, 0, p.width, p.height);
        p.noFill();
        p.strokeCap(p.SQUARE);
        
        p5s.noiseSeed(6);


        for(let i = 0 ; i < circleCount ; i ++ ){
            drawCircle(i);
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
    const perlinDisplace = (x, y, s = 10)=>{
        return p5s.map(p5s.noise(x * 0.008, y * 0.008), 0, 1, -1, 1) * s;
    }
    const drawCircle = (index) => {
        let strength = p5s.map(index, 0, circleCount, 4, 22).toFixed(3);
        // console.log(strength)
 
        // const start = {...position};
        // const hue = 200;
        const cl = p.lerpColor(startColor, endColor, p.norm(index, 0, circleCount));
        // cl.setAlpha(50 - index);
        p.stroke(cl);
 

        p.strokeWeight(1.5);

        let angle = 0;
        let dp = {
            x:center.x + Math.cos(angle) * (radius), 
            y:center.y + Math.sin(angle) * (radius)
        };
        let displace = perlinDisplace(dp.x, dp.y) * strength;
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
            displace = perlinDisplace(dp.x, dp.y) * strength;
            
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