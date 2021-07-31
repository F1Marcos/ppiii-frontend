import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    console.log(value);
    console.log("entro al pipe");
    const resultPosts = [];
   
    for(const post of value){
     if(post.comentario.toUpperCase().indexOf(arg.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   return resultPosts;
   
  }

}
