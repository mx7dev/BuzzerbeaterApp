import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';
import { Result } from '../../models/result';
import { PlayerFull } from '../../models/playerfull';
import { UserTeamModel } from '../../models/userTeam';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
// import {  } from 'angular-bootstrap-multiselect';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  listaUserTeam: UserTeamModel[];
  listUser = [];
  listFiltro = [];
  result: Result;
  listPlayers: PlayerFull[];
  listPlayersTemp: PlayerFull[];
  fechaUltimaActualizacion: Date;

  totalItems: number = 0;
  currentPage: number   = 1;
  itemsPerPage: number = 0;

  listPaginado = [
    { id: 10, name: 10 },
    { id: 15, name: 15 },
    { id: 25, name: 25 },
    { id: 50, name: 50 },
    { id: 100, name: 100 }
  ]

  listaOpcionesTipo = [
    { id: 0, name: 'Ninguno'},
    { id: 1, name: 'NT'},
    { id: 2, name: 'U21'}
  ];

  listaOpcionesMarca = [
    { id: 0, name: 'Ninguno'},
    { id: 1, name: 'Seguimiento'},
    { id: 2, name: 'Descarte'}
  ];

  listaPosition = [
    { id: 'C', name: 'Pivot'},
    { id: 'PF', name: 'Ala Pivot'},
    { id: 'PG', name: 'Base'},
    { id: 'SF', name: 'Alero'},
    { id: 'SG', name: 'Escolta'}
  ];

  dropdownSettings: any = {};
  ShowFilter = false;

  constructor(
    private utilService: UtilsService,
    private spinner: NgxSpinnerService
  ) { 
    this.itemsPerPage = 10;
    // this.idUser = '0';
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'niduser',
        textField: 'suser',
        selectAllText: 'Seleccionar Todos',
        unSelectAllText: 'Quitar todos',
        itemsShowLimit: 3,
        allowSearchFilter: this.ShowFilter
    };

    this.utilService.listFechaSincronizacion().subscribe((res: any) => {
      this.fechaUltimaActualizacion = res.data[0].dregister;
    });
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
  }

  ngOnInit(): void {
    this.getUserTeam();
  }

  getUserTeam(): any {
    this.utilService.listUserTeam().subscribe((res: any) => {
      this.listaUserTeam = res.data;
      this.getListPlayers();
    });
  }

  getListPlayers(): any {
    // this.spinner.hide(); 
    // debugger;
    let listToSend = [];
    if (this.listUser.length == 0) {
      listToSend = this.listaUserTeam;
    } else {
      this.listUser.forEach(el => {
        const element = this.listaUserTeam.filter(res => res.niduser == el.niduser)[0];
        listToSend.push(element);
      });
    }

    this.spinner.show();
    this.utilService.listPlayers(listToSend).subscribe((res: any) => {
      
      this.listPlayers = [];
      this.listPlayers = res.data;
      
      this.totalItems = this.listPlayers.length;
      this.filterPagination();
      this.spinner.hide();
    });
  }

  //Extern Calls
  getUpdatedTeam(): any 
  {   
    let listToSend = [];
    if (this.listUser.length == 0) {
      listToSend = this.listaUserTeam;
    } else {
      this.listUser.forEach(el => {
        const element = this.listaUserTeam.filter(res => res.niduser == el.niduser)[0];
        listToSend.push(element);
      });
    }

    this.spinner.show();
    this.utilService.saveFechaSincronizacion().subscribe((res: any) => {
      
      let x = res;
    });
    
    this.utilService.getUpdateTeam(listToSend).subscribe((res: any) => {
      this.result = res.data;
      this.spinner.hide();
      
      Swal.fire(
        'Satisfactorio',
        this.result.message,
        'success'
        ).then(() => 
          {
            this.getListPlayers();
          }
        );
    });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.filterPagination();
  }

  filterPagination() {
    this.listPlayersTemp = [];
    this.listPlayersTemp = this.listPlayers.filter((res: PlayerFull, index: number) => {
      if ( ((this.currentPage - 1) * this.itemsPerPage) <= index && index <= (this.currentPage * this.itemsPerPage) - 1) {
        return res;
      }
    });
  } 

  changePosition(event, player: PlayerFull) {
    player.bestPositionNew = event.target.value;
    const index = this.listPlayers.findIndex(x => x.idplayer == player.idplayer);
    this.listPlayers[index] = player;
    this.filterPagination();
  }

  changeMarca(event, player: PlayerFull) {
    player.check1 = event.target.value;
    const index = this.listPlayers.findIndex(x => x.idplayer == player.idplayer);
    this.listPlayers[index] = player;
    this.filterPagination();
  }

  changeSeleccion(event, player: PlayerFull) {
    player.check2 = event.target.value;
    const index = this.listPlayers.findIndex(x => x.idplayer == player.idplayer);
    this.listPlayers[index] = player;
    this.filterPagination();
  }

  savePlayers(): any {
    this.spinner.show();

    let contador = 0;
    const longitud = this.listPlayers.length;
    this.listPlayers.forEach((element: PlayerFull) => {
      console.log('element', element);
      let obj = {
        idplayer: element.idplayer,
        check1: element.check1,
        check2: element.check2,
        bestPositionNew: element.bestPositionNew
      };
      this.utilService.savePlayers(obj).subscribe((res: any) => {      
        contador++;
        if (contador == longitud) {
          this.spinner.hide();
            if (res != null) {
              //res.data[0]
              Swal.fire(
                'Satisfactorio',
                res.data[0].message,
                'success'
                ).then(() => 
                  {
                    this.getListPlayers();
                  }
                );
            } else {
              Swal.fire(
                'Error',
                'Ocurrio un error al guardar la información',
                'success'
                ).then(() => 
                  {
                    this.getListPlayers();
                  }
                );
            }
        }
      });
    });
    this.spinner.hide();
    // this.utilService.savePlayers(this.listPlayers).subscribe((res: any) => {      
    //   this.spinner.hide();
    //   if (res != null) {
    //     //res.data[0]
    //     Swal.fire(
    //       'Satisfactorio',
    //       res.data[0].message,
    //       'success'
    //       ).then(() => 
    //         {
    //           this.getListPlayers();
    //         }
    //       );
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       'Ocurrio un error al guardar la información',
    //       'success'
    //       ).then(() => 
    //         {
    //           this.getListPlayers();
    //         }
    //       );
    //   }
    // });
  }

  exportexcel(): void 
    {
      const fileName= 'Players.xlsx'; 
       /* table id is passed over here */   
       let element = document.getElementById('excel-tablexxx'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, fileName);
			
    }
  
}
