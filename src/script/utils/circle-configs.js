export default function circles (p){
    
    return [
        {
            startColor:p.color(84, 89, 78, 0.1),
            endColor:p.color(68, 73, 63, 0.5),
            count:3,
            steps:600,
            strokeWeight:3,
            strength:{
                start:20,
                end:80
            },
            noiseSeedStart:78
        },
        {
            startColor:p.color(51, 91, 95, 0.1),
            endColor:p.color(65, 115, 120, 0.5),
            count:40,
            steps:500,
            strokeWeight:1.5,
            strength:{
                start:1,
                end:40
            },
            noiseSeedStart:90
        },
        {
            startColor:p.color(71, 73, 56, 0.1),
            endColor:p.color(108, 110, 88, 0.5),
            count:30,
            steps:500,
            strokeWeight:1,
            strength:{
                start:1,
                end:60
            },
            noiseSeedStart:70
        }
    ]
}