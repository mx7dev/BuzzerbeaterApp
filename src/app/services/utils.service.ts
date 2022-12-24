import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterModel } from '../models/user';
import { environment } from '../../environments/environment';
import { PlayerFull } from '../models/playerfull';
import { UserTeamModel } from '../models/userTeam';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  // listCategories(id_category: number): Observable<any> {
  //   return this.http.get<any>(`/utils/listCategories/${id_category}`);
  // }

  // listParams(key_param: string): Observable<Object[]> {
  //   return this.http.get<Object[]>(`/utils/listParams/${key_param}`);
  // }

  // listAmountsPerYear(nidyear: number, niduser: number): Observable<Object[]>  {
  //   return this.http.get<Object[]>(`/utils/listAmountsPerYear/${nidyear}/${niduser}`);
  // }

  // listAmountsPerMonth(niduser: number, nidyear: number, nidmonth: number): Observable<Object[]>  {
  //   return this.http.get<Object[]>(`/utils/listAmountsPerMonth/${niduser}/${nidyear}/${nidmonth}`);
  // }

  login(): Observable<any> {
    return this.http.post<any>('/auth/sign-in', null);
  }

  register(model: UserRegisterModel): Observable<any> {
    return this.http.post<any>('/auth/sign-up', model);
  }

  logout(): Observable<any> {
    return this.http.get<any>('/auth/logout');
  }

  //team
  listUserTeam(): Observable<Object[]>  {
    return this.http.get<Object[]>(`/team/listuserteam`);
  }
  
  //players
  listPlayers(list: UserTeamModel[]): Observable<Object[]>  {
    return this.http.post<Object[]>(`/team/listplayers`, list);
  }

  savePlayers(players: any) {
    return this.http.post<any>('/team/savePlayer', players);
  }

  //externos
  getUpdateTeam(list: UserTeamModel[]): Observable<Object> {
    return this.http.post<Object>(`/team/getUpdatedTeam`, list);
  } 

  //configuration
  listConfiguration(): Observable<Object[]>  {
    return this.http.get<Object[]>(`/team/listConfiguration`);
  }

  saveConfiguration(item: any) {
    return this.http.post<any>('/team/saveConfiguration', item);
  }
  saveFechaSincronizacion() {
    return this.http.post<any>('/team/saveFechaSincronizacion', null);
  }

  listFechaSincronizacion(): Observable<Object[]>  {
    return this.http.get<Object[]>(`/team/listFechaSincronizacion`);
  }

}
