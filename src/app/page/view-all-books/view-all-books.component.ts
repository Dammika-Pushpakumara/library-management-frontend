import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit{

  private http;

  public bookList:any ={};

  constructor(private httpClient:HttpClient){
    this.http=httpClient;
  }
  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(){
    this.http.get('http://localhost:8080/book/get').subscribe((data)=>{
    this.bookList=data;
    console.log(this.bookList);
    })
  }
}
