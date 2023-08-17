import { Injectable } from '@angular/core';
import {Link,LinkViewModel} from "../models/link";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GuidGenerator } from '../utils/UidGenerator';


@Injectable({
  providedIn: 'root'
})
export class LinkService {
  linkUrl = 'https://localhost:7094/Link';  // URL to web api
  constructor(private http: HttpClient) { }

  getLinks(): Observable<Link[]> {
   return this.http.get<Link[]>(this.linkUrl);
  }
  insert(link: Link): Observable<LinkViewModel> {
    var link1: Link = new Link(GuidGenerator.newGuid(), link.source,link.target,link.type);
    return this.http.post<LinkViewModel>(this.linkUrl, link1);
  }
  update(link: Link): Observable<LinkViewModel> {
    var link1: Link = new Link(link.id, link.source,link.target,link.type);
    return this.http.put<LinkViewModel>(this.linkUrl, link1);
  }
  
  remove(id: string): Observable<LinkViewModel> {
    var url = this.linkUrl +'/' + id;    
    return this.http.delete<LinkViewModel>(url);
  }

 
 
  get(): Promise<Link[]> {
  return Promise.resolve([
    {id:"9fc4e149-f326-4c12-9363-5501001f681f",type:"0",source:"ecf0b31d-a44c-4773-b656-f604878d8e6e",target:"b591ee22-466c-47da-9b82-c83ac2b82af1"},
    {id:"2eab63a0-8639-40c0-80b5-ef20b9d24192",type:"0",source:"ecf0b31d-a44c-4773-b656-f604878d8e6e",target:"42aa0a33-6bb0-4204-8380-f44566880268"}
    // {id: '1', source: '1', target: '2', type: "0"}
  ]);
}
}
