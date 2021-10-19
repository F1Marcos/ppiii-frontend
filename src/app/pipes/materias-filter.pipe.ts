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
      console.log(post);
      console.log(arg);
     if(post.nombreMat.toUpperCase().indexOf(arg.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   return resultPosts;
   
  }
  
  
}
