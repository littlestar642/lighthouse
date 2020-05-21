import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProfsService } from '../get-profs.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css']
})
export class ProfsComponent implements OnInit{

  profName="";
  popularity="";
  options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Citation count vs title'
    },
    subtitle: {
        text: 'comparitive analysis'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Citations'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Citations: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Citations',
        data: [['Shanghai', 24.2],
        ['Beijing', 20.8],
        ['Karachi', 14.9],
        ['Shenzhen', 13.7],
        ['Guangzhou', 13.1],
        ['Istanbul', 12.7],
        ['Mumbai', 12.4],
        ['Moscow', 12.2],
        ['São Paulo', 12.0],
        ['Delhi', 11.7],
        ['Kinshasa', 11.5],
        ['Tianjin', 11.2],
        ['Lahore', 11.1],
        ['Jakarta', 10.6],
        ['Dongguan', 10.6],
        ['Lagos', 10.6],
        ['Bengaluru', 10.3],
        ['Seoul', 9.8],
        ['Foshan', 9.3],
        ['Tokyo', 9.3]],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
}
  constructor(private activatedRoute:ActivatedRoute, private profs:GetProfsService,public dialog: MatDialog) { 
  this.activatedRoute.paramMap.subscribe(param=>{
    let name=param.get('name');
    this.profName=name;
  })

  }
  displayedColumns: string[] = ['title', 'link', 'citation'];
  dataSource = [];
  ngOnInit() {
    console.log(this.profName);
    this.profs.getProfData(this.profName).then(res=>{
      console.log(res);
      let finalArr=[];
      res.results.filter(data=>{
        return data.citedCount>50 && data.title!=="" && data.pdf!=="";
      }).forEach(data=>{
        finalArr.push({
          title:data.title,
          link:data.pdf,
          citation:data.citedCount
        })
      })
      this.dataSource=finalArr;


      let sorted=res.results.filter(data=>data.citedCount>0).sort((a,b)=>{
        return a.citedCount>b.citedCount;
      });
      let final=[];
      sorted.filter(data=>data.citedCount>50).forEach(data=>{
        final.push([data.title,parseInt(data.citedCount)]);
      })
      console.log(final);
      console.log(this.options);
      this.options.series[0].data=final;
      Highcharts.chart('container', this.options);

      let [one,two,three,four,five,...other]=sorted;
      let sum=0;
      other.forEach(data=>{
        let authors=data.authors.length;
        let final=data.citedCount/authors;
        sum+=final*.3;
      })
      sum+=(one.citedCount/one.authors.length)*.7;
      sum+=(two.citedCount/two.authors.length)*.7;
      sum+=(three.citedCount/three.authors.length)*.7;
      sum+=(four.citedCount/four.authors.length)*.7;
      sum+=(five.citedCount/five.authors.length)*.7;
      sum=sum/100;
      this.popularity=sum.toFixed(3);
    }).catch(e=>console.log(e));

  }

  

 
  
  openDialog(url): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      data: {url}
    });

}
}
