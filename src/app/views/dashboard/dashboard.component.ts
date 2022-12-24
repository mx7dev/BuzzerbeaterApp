import { Component, OnInit } from '@angular/core';
// import { UtilsService } from '../../services/utils.service';
import { UtilsService } from '../../services/utils.service';
import { environment } from '../../../environments/environment';
import { AmountMonthModel, AmountsModel } from '../../models/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  isCollapsedIncome: boolean = true;
  isCollapsedExpense: boolean = true;
  listYear: any;
  listMonths: any;
  nyear: number = 0;
  nmonth: number = 0;
  idUser: number = 0;
  listArraysAmounts: AmountsModel[] = [];
  arrayAmountIncome: number[] = [];
  arrayAmountExpense: number[] = [];
  public barChartData: any[] = [];
  sumIncomes: number = 0;
  sumExpenses: number = 0;
  nameMonth: string = '';
  listAmountxCategory: AmountMonthModel[] = [];
  listAmountxCategoryIncome: AmountMonthModel[] = [];
  listAmountxCategoryExpense: AmountMonthModel[] = [];


  constructor(
    private utilService: UtilsService
  ) {
    const objUser = JSON.parse(sessionStorage.getItem('User'));
    if (objUser !== null) {
      this.idUser = objUser.nid_user;
    }  
    this.getListYears();
    this.getListMonth();

    //test
  }

  getListYears() {
    // this.utilService.listParams(environment.key_anho).subscribe((res: any) => {
    //   this.listYear = res.data;
    //   const date = new Date();
    //   this.nyear = date.getFullYear();      
    // },
    // error => console.log('Error getListYears():', error),
    // () => {
    //   this.getListAmountsPerYear();
    //   this.getListAmountsPerMonth();
    //   }
    // )
  }

  getListMonth() {
    // this.utilService.listParams(environment.key_month).subscribe((res: any) => {
    //   this.listMonths = res.data;
    // })
  }

  ngOnInit(): void {
  }


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
 
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }


  findData(): void {
    this.getListAmountsPerYear();
    this.getListAmountsPerMonth();
  }

  getListAmountsPerYear(): void{
    // this.utilService.listAmountsPerYear(this.nyear, this.idUser).subscribe((res: any) => {
    //   this.listArraysAmounts = res.data;
    //   this.arrayAmountExpense = [];
    //   this.arrayAmountIncome = [];
    //   this.sumExpenses = 0;
    //   this.sumIncomes = 0;
    //   this.nameMonth = this.nmonth === 0 ? this.nyear.toString() : this.listMonths.find(res => res.nid_value == this.nmonth).svalue;
    //   this.listArraysAmounts.forEach(res => {
    //     this.arrayAmountIncome.push(res.amount_income);
    //     this.sumIncomes += res.amount_income;
    //     this.arrayAmountExpense.push(res.amount_expense);
    //     this.sumExpenses += res.amount_expense;
    //   });

    //   this.barChartData = [
    //     {data: this.arrayAmountExpense, label: 'Gastos'},
    //     {data: this.arrayAmountIncome, label: 'Ingresos'}
    //   ];
    // });
  }

  getListAmountsPerMonth(): void {
    // this.utilService.listAmountsPerMonth(this.idUser, this.nyear, this.nmonth).subscribe((res: any) => {
    //   this.listAmountxCategory = [];
    //   this.listAmountxCategoryIncome = [];
    //   this.listAmountxCategoryExpense = [];
    //   this.sumExpenses = 0;
    //   this.sumIncomes = 0;

    //   this.listAmountxCategory = res.data;
    //   this.listAmountxCategoryIncome = this.listAmountxCategory.filter(res => res.ntype === 1);
    //   this.listAmountxCategoryExpense = this.listAmountxCategory.filter(res => res.ntype === 2);

    //   this.listAmountxCategoryIncome.forEach(res => { this.sumIncomes += res.namount} );
    //   this.listAmountxCategoryExpense.forEach(res => { this.sumExpenses += res.namount} );
    // })
  }
}
