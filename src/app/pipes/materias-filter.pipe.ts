import { Pipe, PipeTransform } from '@angular/core';
import { FillerControllerDatasetOptions } from 'chart.js';

@Pipe({
  name: 'materiasFilter'
})
export class MateriasFilterPipe implements PipeTransform {


  transform(value: any,arg:any): any {
    console.log("IMPRIMO VALUE");
    console.log(arg);
    const resultPosts = [];
  
   
    for(const post of value){
     if(post.nombreMat.toUpperCase().indexOf(arg.filtro.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   return resultPosts.slice(arg.page,arg.page+5);
   
  }
  
  
}
