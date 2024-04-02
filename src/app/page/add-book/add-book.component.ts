import { Component } from '@angular/core';
import { NavComponent } from "../../common/nav/nav.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
  imports: [NavComponent, HttpClientModule, FormsModule, CommonModule]
})
export class AddBookComponent {

  constructor(private http: HttpClient) { }
  public book: any = {
    isbn: "",
    title: "",
    author: "",
    category: "",
    qty: ""
  }

  addBook() {
    console.log(this.book);
    this.http.post("http://localhost:8080/book/add",this.book).subscribe(data=>{
      console.log("Add Book");
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${this.book.title} Book Added !`,
        showConfirmButton: false,
        timer: 1500
      });
    })

  }
}