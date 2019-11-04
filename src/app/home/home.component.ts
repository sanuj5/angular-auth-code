import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/services/resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public isLoggedIn = false;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.isLoggedIn = this.resourceService.checkCredentials();    
        let i = window.location.href.indexOf('code');
        if(!this.isLoggedIn && i != -1){
            this.resourceService.retrieveToken(window.location.href.substring(i + 5));
        }
  }

  login() {
    window.location.href = 'http://localhost:9000/oauth/authorize?response_type=code&client_id=' + this.resourceService.clientId + '&redirect_uri='+ this.resourceService.redirectUri;
  }

  logout() {
    this.resourceService.logout();
}

}
