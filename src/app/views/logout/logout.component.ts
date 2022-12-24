import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(
    private utilService: UtilsService
  ) { 
    this.utilService.logout().subscribe((res : any) => {
      console.log(res);
      sessionStorage.clear();
      window.location.href = environment.login;
    });
  }

  ngOnInit(): void {
  }

}
