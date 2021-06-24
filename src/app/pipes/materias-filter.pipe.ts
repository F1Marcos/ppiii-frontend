import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'materiasFilter'
})
export class MateriasFilterPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    console.log(value);
    const resultPosts = [];
   
    for(const post of value){
     if(post.nombreMat.toUpperCase().indexOf(arg.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   return resultPosts;
   
  }

}
