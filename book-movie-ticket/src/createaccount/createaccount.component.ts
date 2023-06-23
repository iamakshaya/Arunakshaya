import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.less']
})
export class CreateaccountComponent {
  isloginPage = false;
  userDetails = { username:'', password: '', cpassword: ''};
  constructor(private route: ActivatedRoute,private router: Router, private appService: AppService){}
  
  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        this.isloginPage = Boolean(data['id'] == 2);
      }
    });
  }
  switchViews(key: any) {
    if (key == 'signup') {
      this.router.navigateByUrl('/createaccount/1')
    }
  }
  viewPassword () {
    if (this.userDetails.cpassword) {
      let element: any = document.getElementById('cpass');
      element.type = 'text';
    }
  }
  hidePassword(){
    if (this.userDetails.cpassword){
    let element: any = document.getElementById('cpass');
    element.type = 'password';
  }
} 
SignUp () {
  if (!this.userDetails.username || !this.userDetails.password || !this.userDetails.cpassword || (this.userDetails.password != this.userDetails.cpassword)) {
    alert("Fill all the fields, make sure 'Confirm Password' should have the same value as 'Password'");
    this.appService.isAuthenticated = false;
    return;
  }
  this.appService.allUsers.push({username: this.userDetails.username, password: this.userDetails.password, showDetails: []});
  this.appService.currentUser = {username: this.userDetails.username, password: this.userDetails.password, showDetails: []};
  this.appService.isAuthenticated = true;
  this.router.navigateByUrl('/movies');
}
SignIn() {
  if (!this.userDetails.username || !this.userDetails.password) {
    alert("Fill all the fields");
    return;
  }

  let person = this.appService.allUsers.filter((x: any) => x.username.toLowerCase() == this.userDetails.username.toLowerCase() && x.password == this.userDetails.password);

  if (person.length) {
    this.appService.currentUser = person[0];
    this.appService.isAuthenticated = true;
    this.router.navigateByUrl('/movies');
  } else {
    this.appService.isAuthenticated = false;
    alert("Incorrect username or password");
    return;
  }
}
}

