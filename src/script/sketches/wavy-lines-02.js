import {create, select} from '../utils/trix';
import p5 from 'p5';
// import circles from '../utils/circle-configs';


const sketch = (p) => {
    const lineCount = 400;
    const lineSteps = 500;
    const lineStep = p.windowHeight / lineSteps;

    const meanRadius = Math.min(p.windowWidth * 0.3, p.windowHeight * 0.3);
    let radius = meanRadius;

    const center = {x: p.windowWidth * 0.5, y: p.windowHeight * 0.5};
    // p.colorMode(p.RGB, 255, 255, 255, 1);
    // const bgColor = p.color(12, 5, 1);
    // const bgColor = p.color(40, 45, 41);
    // let startColor = p.color('#070708');
    let firstColor = p.color('#0c1213')
    let secondColor = p.color('#0c1213')
    let startColor = p.lerpColor(firstColor, secondColor, 0);
    let endColor = p.color('#5c8288');
    startColor.setAlpha(255);
    endColor.setAlpha(20);
    
    let x = 0;
    p.setup = ()=> {
        
        // p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        // p.fill(bgColor);
        p.background('#0c1213');
        // p.rect(0, 0, p.width, p.height);
        p.noFill();
        p.strokeCap(p.SQUARE);
        

        
        p5s.noiseSeed(8);
        startColor = p.lerpColor(firstColor, secondColor, 0);
        
        p.strokeWeight(1.5);

        for(let i = 0 ; i < lineCount ; i ++ ){
            drawWave(i, 12, 'both');
        }
        // drawPerfectCircle();
    }
    
    p.draw = ()=> {
        //   p.ellipse(x, 50, 80, 80);
        //   x += 5;
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

    const drawWave = (index, strength = 20) => {
        
        let strngth = p5s.map(index, 0, lineCount, 2, strength);

        let step = 0;

        const cl = p.lerpColor(startColor, endColor, p.norm(index, 0, lineCount));
        p.stroke(cl);

        let dp = {
            x:center.x, 
            y:0
        };
        let displace = perlinDisplace(dp.x, dp.y, 10, 'both') * strngth;

        const position = {
            x:center.x + displace,
            y:0
        };

        function drawLine(pos, i){
            step += lineStep;
            dp = {
                x:center.x, 
                y:step
            };
            displace = perlinDisplace(dp.x, dp.y, 10, 'both') * strngth;
            const p = {
                x:center.x + displace, 
                y:step
            };

            p5s.line(pos.x, pos.y, p.x, p.y);

            pos.x = p.x;
            pos.y = p.y;

        }

        for(let i = 1 ; i < lineSteps + 1; i++){
            drawLine(position, i);
        }
    }
}
const p5s = new p5(sketch);