'use strict'
export default class TrixColors{
    constructor(){
        this.colors = this.initColors()
    }
    getColor(id = 0){
        if(typeof id === Number){
            console.log('it\'s a number')
        }
        return this.colors[id].values;
    }   
    initColors(){
        return [
            {
                name:'optimist',
                values:[
                    '#54634e',
                    '#417378',
                    '#a4cfbe',
                    '#f4f7d9',
                ]
            },
            {
                name:'warm orange',
                values:[
                    '#fecc00',
                    '#feb701',
                    '#ffa300',
                    '#fe8c00',
                    '#f46c01',
                ]
            },
            {
                name:'azul',
                values:[
                    '#407480',
                    '#CCF6FF',
                    '#80E8FF',
                    '#006D85',
                    '#66B9CC',
                ]
            },
        ]
    }
}