import p5 from 'p5';

const sketch = (p) => {
    let x = 0;
    const pos = {
        x:p.width * 0.5,
        y:p.height * 0.5
    }
    const vel = {
        x:0,
        y:0
    }
    p.setup = ()=> {
        p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        // document.querySelector('canvas').addEventListener('click', p.windowResized);
        // drawShape();
        
    }
    p.windowResized = ()=>{
        console.log('resized');
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.clear();
    }
    p.draw = ()=> {
        p.clear();
        // vel.x *= 0.7;
        // vel.y *= 0.7;
        let distX = p.mouseX - pos.x;
        let distY = p.mouseY - pos.y;
        distX *= 0.15;
        distY *= 0.15;
        // vel.x += distX;
        // vel.y += distY;
        pos.x += distX;
        pos.y += distY;
        // let x = p.mouseX;
        // let y = p.mouseY;
        p.ellipse(pos.x, pos.y, 50, 50);
     }
    const drawShape = ()=>{
        p.ellipse(110, 150, 80, 180);
        
    }
    
}
const p5s = new p5(sketch);