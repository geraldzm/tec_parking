import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats-funcionarios',
  templateUrl: './stats-funcionarios.component.html',
  styleUrls: ['./stats-funcionarios.component.css']
})




export class StatsFuncionariosComponent implements  OnDestroy, OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  
 



  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };

    this.http.get('https://dummy.restapiexample.com/api/v1/employees').subscribe(console.log);
    
    this.http.get('https://dummy.restapiexample.com/api/v1/employees')
    .subscribe((res: any) =>{
      this.data = res.data;
      this.dtTrigger.next(res.data);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
