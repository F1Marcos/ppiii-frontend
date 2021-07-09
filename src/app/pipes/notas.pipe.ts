import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notas'
})
export class NotasPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    console.log(value);
    const resultPosts = [];
   
    for(const post of value){
      if(post.Udni.toString().indexOf(arg)>-1 || post.notaFinalNum.toUpperCase() == arg.toUpperCase() || post.estado.toString().indexOf(arg)>-1 ){
        console.log(post.Udni.toString());
        console.log(arg);
        console.log("SIP");
        resultPosts.push(post);
      }
       //resultPosts.push(post);
     //}
   }
  return resultPosts;

  }

}
