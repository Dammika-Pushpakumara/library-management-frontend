import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";


@Component({
    selector: 'app-view-all-books',
    standalone: true,
    templateUrl: './view-all-books.component.html',
    styleUrl: './view-all-books.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
})
export class ViewAllBooksComponent implements OnInit{

  private http;

  public bookList:any={};
  public selectedBook:any;

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
  deleteBook(){
    let api = "http://localhost:8080/book/"+this.selectedBook.id;
    this.http.delete(api,{responseType:'text'}).subscribe((Response:string) =>{
      console.log(Response);
      this.loadBooks();
      Swal.fire({
        title: "Deleted Successfully!",
        text: " ",
        icon: "success"
      });
      this.selectedBook = null;
    });
  }

  setSelectedBook(book:any){
    this.selectedBook = book;
    console.log("setSelectedBook"+book.id);
  }

  saveBook(){
    let postApi = "http://localhost:8080/book/add";
    this.http.post(postApi,this.selectedBook).subscribe(data=>{
      console.log("Saved!");
      this.loadBooks();
      Swal.fire({
        title: "Updated Successfully!",
        text: " ",
        icon: "success"
      });
      this.selectedBook={};
    })
  }
}
