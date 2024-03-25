import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";

@Component({
    selector: 'app-view-all-users',
    standalone: true,
    templateUrl: './view-all-users.component.html',
    styleUrl: './view-all-users.component.css',
    imports: [CommonModule, FormsModule, HttpClientModule, NavComponent]
})
export class ViewAllUsersComponent implements OnInit {

public userList:any;
private baseURL:string="http://localhost:8081";
public selectedUser:any={
  "id":null,
  "firstName":null,
  "lastName":null,
  "userName":null,
  "email":null,
  "address":null,
  "address2":null,
  "country":null,
  "phoneNumber":null
}

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this.http.get(this.baseURL+"/user/get-all-users").subscribe((res:any)=>{
      console.log(res);
      this.userList=res;
    })
  }
  deleteUser(){
    this.http.delete(this.baseURL+"/user/delete/"+this.selectedUser.id,{responseType:'text'}).subscribe((res:string)=>{
      console.log(res);
      this.loadUsers();
      Swal.fire({
        title: "Deleted Successfully!",
        text: " ",
        icon: "success"
      });
    })
  }
  saveUser(){
    this.http.post(this.baseURL+"/user/add-user",this.selectedUser).subscribe((res:any)=>{
      this.loadUsers();
      Swal.fire({
        title: "Updated Successfully!",
        text: " ",
        icon: "success"
      });
    })
     
    }

  setSelectedUser(user:any){
    this.selectedUser=user;
    console.log(user);
  }
}
