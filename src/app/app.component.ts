import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from './Services/db-operation';
import { mustmatch } from './Services/must-match.validator';
import { User } from './Services/user.interface';
import { UserService } from './Services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegistrationApp';
  // registerForm: FormGroup | undefined;
  //registerForm: FormGroup=new FormGroup({});
  registerForm: FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  buttonText: string = "Submit";
  dbops: DBOperation;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private userService: UserService) {

  }
  ngOnInit() {
    this.setFormState()
    this.getAllUsers()
  }
  // createDb() {
  //   throw new Error('Method not implemented.');
  // }
  setFormState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    // this.registerForm = this.fb.group({
    //   id: [0],
    //   title: ['', Validators.required],
    //   firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(14)])],
    //   lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   dob: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}l-(0{1-9}|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])],
    //   password: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
    //   conformPassword: ['', Validators.required],
    //   acceptTerms: [false, Validators.requiredTrue]
    // },{
    //   Validators:mustmatch('password','conformPassword')
    // });


    this.registerForm = new FormGroup({
      id:new FormControl (0),
      title: new FormControl ('', Validators.required),
      firstName:new FormControl ('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(14)])),
      lastName:new FormControl ('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])),
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
      dob: new FormControl ('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}l-(0{1-9}|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
      password:new FormControl ('', Validators.compose([Validators.required, Validators.maxLength(6)])),
      conformPassword: new FormControl ('', Validators.required),
      acceptTerms:new FormControl (false, Validators.requiredTrue)
    },
      mustmatch('password','conformPassword')
    );
  }
  get f(){
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return;

    }
    switch (this.dbops) {
      case DBOperation.create:
        this.userService.addUser(this.registerForm.value).subscribe(res => {
          this.toastr.success("User added !!", "User registration")
          this.getAllUsers();
          this.onCancel();
        });  
        break;
      case DBOperation.update:
        this.userService.updateUser(this.registerForm.value).subscribe(res => {
          this.toastr.success("User Updated !!", "User registration")
          this.getAllUsers();
          this.onCancel();
        });
        break;
    }
  }
  onCancel() {
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    this.submitted = false;
  }
  getAllUsers() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      console.log(res);
    });
  }
  Edit(userId: number) {
    this.buttonText = "Update";
    this.dbops = DBOperation.update;

    let user = this.users.find((u: User) => u.id === userId);
    this.registerForm.patchValue(user);

    this.registerForm.get('password').setValue('');
    this.registerForm.get('conformPassword').setValue('');
    this.registerForm.get('acceptTerms').setValue(false);
  }
  Delete(userId: number) {
    // this.userService.deleteUser(userId).subscribe(res=>{
    //   this.getAllUsers();
    //   this.toastr.success("Deleted success !!","User Registration")
    // })
    Swal.fire({
      title: 'Are you sure?',
      text: 'We will not be able to deleted this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'yes, delete it.',
      cancelButtonText: 'no, keep it.'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(userId).subscribe(res => {
          this.getAllUsers();
          this.toastr.success("Deleted success !!", "User Registration")
          //Swal.fire('deleted','your imeginary file has been deleted.','success')
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('cancel', 'your imeginary file is safe.', 'error')
      }
    })
  }
}
