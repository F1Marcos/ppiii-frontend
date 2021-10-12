import { Pipe, PipeTransform } from '@angular/core';
import { AdminAbmMateriaComponent } from '../components/admin-abm-materia/admin-abm-materia.component';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(value: any,arg:any, arg2:any): any {
    console.log("IMPRIMO VALUE");
    console.log(arg);
    console.log(value);
    const resultPosts = [];
   
    for(const post of value){
     if(post.nombreMat.toUpperCase().indexOf(arg.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   var cantidad:number = resultPosts.length/10;
   return resultPosts.slice(arg2,arg2+10);
   
  }

}
