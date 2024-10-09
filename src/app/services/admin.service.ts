import { Injectable } from '@angular/core';
import {HttpClient,HttpRequest, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AdminDetail} from "../classes/admin-detail";
import {catchError, Observable, tap} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = "https://jeetcodebackend-latest.onrender.com/";
  private judgeZUrl: string = "http://64.227.139.187:2358/";

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
  }

  saveAdminDetails(adminDetail: AdminDetail): Observable<any> {
    let url = this.baseUrl + "signup";
    return this.http.post(url, adminDetail);
  }

  login(adminDetail: AdminDetail): Observable<any> {
    let url = this.baseUrl + "login";
    return this.http.post(url, adminDetail)
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      console.log("the token inside func is " + jwtToken)
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }

  logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['']);
  }

  isLoggedIn() {
    let token = localStorage.getItem('JWT');

    if (!token) {
      return false;
    }

    let expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let isExpired = this.jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  getAdminDetail(adminId: string): Observable<any> {
    let url = this.baseUrl + "getAdminData/" + adminId;
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let req = new HttpRequest('GET', url, {headers: headers});
    return this.http.request(req);
  }

  getProblems(): Observable<any> {
    let url: string = this.baseUrl + "problems";
    return this.http.get(url, {
      headers: this.createAuthorizationHeader() || undefined
    });
  }

  getUserData() {
    let url: string = this.baseUrl + "me";
    return this.http.get(url, {
      headers: this.createAuthorizationHeader() || undefined
    });
  }

  getProblemData(problemId: number): Observable<any> {
    let url: string = this.baseUrl + "problem/" + problemId; // Add a slash here
    return this.http.get(url, {
      headers: this.createAuthorizationHeader() || undefined
    });
  }

  getLanguages(): Observable<any>{
    let url: string = this.judgeZUrl + "languages/all";
    return this.http.get(url);
  }

  runCode(languageId:number, exampleIn:string, exampleOut:string, editorContent:string): Observable<any>{
    let url: string = this.judgeZUrl + "submissions?base64_encoded=false&fields=*";
    // const exampleInMatch = problemData.match(/exampleIn=([^,]+)/);
    // const exampleOutMatch = problemData.match(/exampleOut=([^,]+)/);
    const headers= new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      language_id: languageId,
      source_code: editorContent,
      stdin: exampleIn,
      expected_output: exampleOut
    };

    const req = new HttpRequest('POST', url, body, { headers: headers });
    return this.http.request(req);
  }

  submitToken(token:string){
    let url: string = this.judgeZUrl + `/submissions/${token}?base64_encoded=false&fields=*`;
    const headers= new HttpHeaders({});
    const req = new HttpRequest('GET', url, {headers:headers});
    return this.http.request(req);
  }
}
