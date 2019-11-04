import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public clientId = 'user';
  public redirectUri = 'http://localhost:4200/';

  constructor(private http: HttpClient) { }

  checkCredentials(){
    return localStorage.getItem('access_token') != null;
  }

  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  retrieveToken(code){
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);
 
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa(this.clientId+":password")});
     this.http.post('http://localhost:9000/oauth/token', params.toString(), { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }

  getResource(resourceUrl) : Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+localStorage.getItem('access_token')});
    return this.http.get(resourceUrl,{ headers: headers, responseType: 'text' })
                   .pipe(catchError( (error) => Observable.throw(error.json().error || 'Server error')));
  }
  logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}
