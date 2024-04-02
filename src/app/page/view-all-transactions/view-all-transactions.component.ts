import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../../common/nav/nav.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-view-all-transactions',
    standalone: true,
    templateUrl: './view-all-transactions.component.html',
    styleUrl: './view-all-transactions.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
})
export class ViewAllTransactionsComponent implements OnInit{

    public allTransactions:any=[];

    constructor(private http:HttpClient){}

    ngOnInit(): void {
        this.loadTransactions();
    }

    loadTransactions(){
      this.http.get("http://localhost:8082/get-all").subscribe(res=>{
        console.log(res);
        this.allTransactions=res;

      })
    }

}