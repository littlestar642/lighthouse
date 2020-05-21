import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetProfsService } from '../get-profs.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit{

  constructor(private dataSource:GetProfsService) { }
  dataSource1=[];
  displayedColumns1=['rating','name','link'];
  dataSource2=[];
  displayedColumns2=['name','searches'];
  dataSource3=[];
  displayedColumns3=['name','rating'];
  ngOnInit() {
    this.dataSource1=[{rating:14.3,name:'Ajai Jain',link:'https://www.cse.iitk.ac.in/users/ajain/'},
    {rating:11.8,name:'Amey Karkare',link:'https://www.cse.iitk.ac.in/users/karkare/'},
    {rating:15.1,name:'Arnab Bhattacharya',link:'https://www.cse.iitk.ac.in/users/arnabb/'},]
    this.displayedColumns1=['rating','name','link'];

    this.dataSource2=[
      {name:'Blockchain', searches:490},
      {name:'Machine Learning', searches:234},
      {name:'Cloud Computing', searches:156},
    ];

    this.dataSource3=[
      {name:'IIT kharagpur', rating:12.3},
      {name:'NIT Rourkela', rating:15.6},
      {name:'IIT Mumbai', rating:14.4},
    ]
  }
  

  

}
