import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuariosFilter'
})
export class UsuariosFilterPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    console.log(value);
    const resultPosts = [];
   
    for(const post of value){
     if(post.apellidos.toUpperCase().indexOf(arg.toUpperCase())>-1){
       console.log("SIP");
       resultPosts.push(post);
     }
   }
   return resultPosts;
   
  }
}
