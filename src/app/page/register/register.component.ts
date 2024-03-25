import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private http;
  public countryList:any;
  public selectedCountry:any;
  public isExistsUser:any;
  public userObj={
    firstName:null,
    lastName:null,
    userName:null,
    email:null,
    address:null,
    address2:null,
    country:null,
    phoneNumber:null
  }
  public selectedCountryCode:any;

  constructor(private httpClient:HttpClient, public router:Router){
    this.http=httpClient;
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(){
    let api ="https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe(res =>{
      this.countryList=res;
      console.log(res);
    })
  }
  setSelectedCountry(country:any){
    this.selectedCountry=country;
    this.selectedCountryCode=country.idd.root+""+country.idd.suffixes[0];
    console.log(this.selectedCountryCode);
    console.log(this.selectedCountry);
  }

  submitForm(){
    console.log(this.userObj);
    this.http.get(`http://localhost:8081/user/is-exist-user/${this.userObj.userName}`).subscribe(data=>{
      console.log(data);
      this.isExistsUser=data;
      this.registerUser(this.isExistsUser);
    })
  }

  registerUser(isExistsUser:any){
    if(!isExistsUser==true){
      this.http.post("http://localhost:8081/user/add-user",this.userObj).subscribe(data =>{
        Swal.fire({
          title: "Success",
          text: `${this.userObj.userName} has been registered !`,
          icon: "success"
        });
        this.router.navigate(['/login'])
      })
    }else{
      Swal.fire({
        title: "Can't register this user",
        text: `${this.userObj.userName} has been already registered !`,
        icon: "error"
      });
    }
    console.log(isExistsUser);
  }
}
