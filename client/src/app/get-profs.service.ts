import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class GetProfsService {

  constructor(private http:HttpClient) { }

  getProfs(type,college,interests):any{
    return this.http.post('http://localhost:3000/getProfs',{type,college,interests}).toPromise().then(res=>res).catch(e=>console.log(e));
  }

  getProfData(name):any{
    return this.http.post('http://localhost:3000/getProfData',{name}).toPromise().then(res=>res).catch(e=>console.log(e));    
  }

  getSummaryData(url):any{
    return this.http.post('http://localhost:3000/getPdfSummary',{url}).toPromise().then(res=>res).catch(e=>console.log(e));    
  }


}