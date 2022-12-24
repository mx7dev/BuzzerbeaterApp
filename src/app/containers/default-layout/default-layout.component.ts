import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  nameUser: string;

  constructor(
    private utilService:  UtilsService
  ) {
    const objUser = JSON.parse(sessionStorage.getItem('User'));
    if (objUser !== null) {
      this.nameUser = `${objUser.snames} ${objUser.slastname}` 
    }   
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.utilService.logout().subscribe((res : any) => {
      console.log(res);
      sessionStorage.clear();
      window.location.href = environment.login;
    });
  }
}
