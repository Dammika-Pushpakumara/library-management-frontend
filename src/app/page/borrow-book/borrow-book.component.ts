import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";
@Component({
    selector: 'app-borrow-book',
    standalone: true,
    templateUrl: './borrow-book.component.html',
    styleUrl: './borrow-book.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
})
export class BorrowBookComponent{

public user:any;

public bookId:any;

public searchBookRes:any;

public cartList:any=[];

  private http;

  public userName:String="";

  constructor(http:HttpClient){
    this.http=http;
  }
  searchUser(){
    console.log(this.userName);

    this.http.get(`http://localhost:8081/user/find-by-user-name/${this.userName}`).subscribe(data=>{
      console.log(data);
      this.user=data;
    })
  }
  searchBook(){
    this.http.get(`http://localhost:8080/book/search/${this.bookId}`).subscribe(data=>{
      console.log(data);
      this.searchBookRes=data;
      Swal.fire({
        title: `"${this.searchBookRes.title}" Do you want to get this Book?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "yes",
        denyButtonText: `Don't`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Add to cart!", "", "success");
          this.cartList.push(this.searchBookRes);
          this.searchBookRes={};
          console.log(this.cartList);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    })
  }


  // --------------------------------------------------------------------

  bookIds:any=[];

  loadBookIds(){
    this.cartList.forEach((element:any) => {
        this.bookIds.push(element.id);
    });
  }

  borrowBooks(){
    this.loadBookIds();
    const borrowBook:any={
      borrowId:this.user.id,
      books:this.bookIds,
      date:new Date(),
      fine:""
    }
    console.log(borrowBook);

    this.http.post("http://localhost:8082/add-borrow-details",borrowBook).subscribe(res=>{
      console.log(res);

    })

  }

  onEnter(){}

}