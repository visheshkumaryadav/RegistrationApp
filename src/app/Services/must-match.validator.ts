// import { FormGroup } from "@angular/forms";

// export function mustmatch(password:string, conformPassword:string){
// return(formgroup:FormGroup)=>{
//     const passwordControl=formgroup.controls[password];
//     const conformPasswordControl=formgroup.controls[conformPassword];

//     if(conformPasswordControl.errors && !conformPasswordControl.errors['Mustmatch']){
//         return;
//     }

//     if(passwordControl.value!==conformPasswordControl.value){
//         conformPasswordControl.setErrors({Mustmatch:true});
//     }else{
//         conformPasswordControl.setErrors(null);
//     }
// }
// }



import {AbstractControl,ValidationErrors,ValidatorFn, Validators } from "@angular/forms";

export function mustmatch(password:string, conformPassword:string):ValidatorFn{
return(control:AbstractControl):ValidationErrors | null=>{
    const passwordControl=control.get(password);
    const conformPasswordControl=control.get(conformPassword);

    if(conformPasswordControl.errors && !conformPasswordControl.errors['Mustmatch']){
        return null;
    }

    if(passwordControl.value!==conformPasswordControl.value){
        conformPasswordControl.setErrors({Mustmatch:true});
    }else{
        conformPasswordControl.setErrors(null);
    }
    return null;
}
}