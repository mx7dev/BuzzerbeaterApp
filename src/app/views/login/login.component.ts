import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 

  form: FormGroup;
  showErrorMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilsService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm () {
    this.form =  this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    
    const user = this.form.get('username').value;
    const password = this.form.get('password').value;
    
    
    const basicCredentials = btoa(`${user}:${password}`);
    sessionStorage.setItem('basicCredentials', basicCredentials);
    sessionStorage.setItem('isLogin', '1');


    this.utilService.login().subscribe((res: any) => {
      
      const valor = res;
      
      try {
        if (res.user.idrespuesta === 0) {
          this.showErrorMessage = false;
          sessionStorage.setItem('Guard', res.token);
          sessionStorage.setItem('User', JSON.stringify(res.user));
          sessionStorage.removeItem('basicCredentials');
          sessionStorage.removeItem('isLogin');
          
          window.location.href = environment.localUrl;

        } else {
          this.showErrorMessage = true;
        }
      } catch (error) {
        this.showErrorMessage = true;
      }
    }, error => {
      this.showErrorMessage = true;
      
    })
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append("Authorization", "Basic " + basicCredentials);
    
    // const request = new HttpRequest('POST', `${environment.apiUrl}/sign-in`, headers, {
    //   reportProgress: true,
    // });

    // this.http.request(request).subscribe(event => {
    //   if (event.type === HttpEventType.Response) {
    //     const resSTR = JSON.stringify(event.body);
    //     const resJSON = JSON.parse(resSTR);
    //     console.log(resJSON, 'resJSON');
    //   }
    // });
    //const request = new Request('POST',);    
  }

}
