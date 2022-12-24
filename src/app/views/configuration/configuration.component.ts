import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../services/utils.service';
import { Configuration } from '../../models/configuration';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  listConfiguration: Configuration[];
  listConfigurationFilter: Configuration[];
  listConfigurationFilter2: Configuration[];
  itemSelected: Configuration = new Configuration();
  form: FormGroup;
  titleDetail: string;
  isPosicionEdition: boolean;
  idConfig: number;

  constructor(
    private utilService: UtilsService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    this.buildForm(null, true);
  }

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): any {
    this.utilService.listConfiguration().subscribe((res: any) => {
      this.listConfiguration = res.data;
      this.listConfigurationFilter = this.listConfiguration.filter(x => x.ntipo_config == 1);
      this.listConfigurationFilter2 = this.listConfiguration.filter(x => x.ntipo_config == 2);
    });
  }

  openEditConfiguration(element: Configuration, isPosition: boolean): any {
    console.log('element', element);    
    this.isPosicionEdition = isPosition;
    this.idConfig = element.nidconfig;
    // this.itemSelected = element;
    this.buildForm(element, false);
    this.primaryModal.show();
  }

  private buildForm (item: Configuration, isNew: boolean) {   

    if(isNew) {
      this.form =  this.formBuilder.group({
        id: [0],
        tiro: [0],
        alcance: [0],
        defensa_exterior: [0],
        manejo: [0],
        penetracion: [0],
        pases: [0],
        tiro_interior: [0],
        defensa_interior: [0],
        rebotes: [0],
        tapones: [0],
        resistencia: [0],
        tiros_libres: [0],
        param1: [0],
        param2: [0],
        param3: [0]
      });
    } else {
      this.titleDetail = item.sdescripcion1;    
      this.form =  this.formBuilder.group({
        id: [item.nidconfig],
        tiro: [item.ntiro],
        alcance: [item.nalcance],
        defensa_exterior: [item.ndefensa_exterior],
        manejo: [item.nmanejo],
        penetracion: [item.npenetracion],
        pases: [item.npases],
        tiro_interior: [item.ntiro_interior],
        defensa_interior: [item.ndefensa_interior],
        rebotes: [item.nrebotes],
        tapones: [item.ntapones],
        resistencia: [item.nresistencia],
        tiros_libres: [item.ntiros_libres],
        param1: [item.nparam1],
        param2: [item.nparam2],
        param3: [item.nparam3]
      });
    }
  }

  save(): void {
    if(this.form.valid){
      this.spinner.show();
      this.itemSelected.nidconfig = this.idConfig;
      this.itemSelected.ntiro = this.form.get('tiro').value == null ? 0 : Number(this.form.get('tiro').value);
      this.itemSelected.nalcance = this.form.get('alcance').value == null ? 0 : Number(this.form.get('alcance').value);
      this.itemSelected.ndefensa_exterior = this.form.get('defensa_exterior').value == null ? 0 : Number(this.form.get('defensa_exterior').value);
      this.itemSelected.nmanejo = this.form.get('manejo').value == null ? 0 : Number(this.form.get('manejo').value);
      this.itemSelected.npenetracion = this.form.get('penetracion').value == null ? 0 : Number(this.form.get('penetracion').value);
      this.itemSelected.npases = this.form.get('pases').value == null ? 0 : Number(this.form.get('pases').value);
      this.itemSelected.ntiro_interior = this.form.get('tiro_interior').value == null ? 0 : Number(this.form.get('tiro_interior').value);
      this.itemSelected.ndefensa_interior = this.form.get('defensa_interior').value == null ? 0 : Number(this.form.get('defensa_interior').value);
      this.itemSelected.nrebotes = this.form.get('rebotes').value == null ? 0 : Number(this.form.get('rebotes').value);
      this.itemSelected.ntapones = this.form.get('tapones').value == null ? 0 : Number(this.form.get('tapones').value);
      this.itemSelected.nresistencia = this.form.get('resistencia').value == null ? 0 : Number(this.form.get('resistencia').value);
      this.itemSelected.ntiros_libres = this.form.get('tiros_libres').value == null ? 0 : Number(this.form.get('tiros_libres').value);
      this.itemSelected.nparam1 = this.form.get('param1').value == null ? 0 : Number(this.form.get('param1').value);
      this.itemSelected.nparam2 = this.form.get('param2').value == null ? 0 : Number(this.form.get('param2').value);
      this.itemSelected.nparam3 = this.form.get('param3').value == null ? 0 : Number(this.form.get('param3').value);
      console.log('this.itemSelected', this.itemSelected);

      this.utilService.saveConfiguration(this.itemSelected).subscribe((res: any) => {
        this.spinner.hide();
          if (res.data.code == 0) {
            debugger;
            Swal.fire(
              'Satisfactorio',
              res.data.message,
              'success'
              ).then(() => 
                {
                  this.primaryModal.hide();
                  this.getConfiguration();
                }
              );
          } else {

          }
      });
      

    }
  }
}
