import { Component, OnInit } from '@angular/core';
import {GetProfsService} from '../get-profs.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private prof :GetProfsService, private router:Router) { }
  typeOfCollege="";
  nameOfCollege="";
  nameOfInterest="";
  professorName="";
  colleges=[];
  nits=[
  {key:"svnit",name:"NIT Surat"},
  {key:"nitrourkela",name:"NIT Rourkela"},
  {key:"nittrichy",name:"NIT Trichy"},
  {key:"nitwarangal",name:"NIT Warangal"},
  {key:"nitsurathkal",name:"NIT Surathkal"},
];
  iits=[
    {key:"iitkanpur",name:"IIT Kanpur"},
        {key:"iitbombay",name:"IIT Bombay"},
        {key:"iitmadras",name:"IIT Madras"},
        {key:"iitkgb",name:"IIT Kharagpur"},
        {key:"iitgandhinagar",name:"IIT Gandhinagar"},
  ];

  profArr:any=[];
  dataSource=[];
  displayedColumns: string[] = ['name', 'email'];
  localStorage=window.localStorage;
  interests=new FormControl();
  listOfInterests=['Information Security','Encryption Systems','Cloud Computing','Machine Learning','Computer Vision'
  ,'Image Processing','Graphics','Distributed Computing','High Performance Computing','Bio Materials','Wireless Communication','Aircraft Design','Turbulence']


  ngOnInit() {
    if(this.localStorage.getItem('type')!==undefined){
      this.typeOfCollege=localStorage.getItem('type');
    }
    if(this.localStorage.getItem('college')!==undefined){
      this.nameOfCollege=localStorage.getItem('college');
    }
    if(this.localStorage.getItem('interest')!==undefined){
      this.nameOfInterest=localStorage.getItem('interest');
    }
    this.collegeChange();
  }

  collegeChange(){
    if(this.typeOfCollege=="all"){
      this.colleges=[...this.iits,...this.nits];
    }
    if(this.typeOfCollege=="nit"){
      this.colleges=[...this.nits];
    }
    if(this.typeOfCollege=="iit"){
      this.colleges=[...this.iits];
    }
  }

  searchForProfByName(){
    this.router.navigate(['/prof',this.professorName.toLocaleLowerCase().split(" ").join('-').replace('.','')]);
  }

  async searchForProfs(){
    this.localStorage.setItem('type',this.typeOfCollege);
    this.localStorage.setItem('college',this.nameOfCollege);
    this.localStorage.setItem('interest',this.nameOfInterest);
    this.profArr=await this.prof.getProfs(this.typeOfCollege,this.nameOfCollege,this.nameOfInterest);
    let finalArr=[];
    this.profArr.res[0].professors.forEach(prof=>{
      let flag=0;
      this.interests.value.forEach(val=>{
        if(prof.interests.includes(val)){
          if(flag==0){
            finalArr.push(prof);
            flag=1;
          }
        }
      })
    })
    this.dataSource = finalArr;

  }

  




}