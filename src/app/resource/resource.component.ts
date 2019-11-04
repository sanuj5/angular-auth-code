import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  private foosUrl = '/resource-svc/foo';
  public name;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
  }
  getFoo(){
    this.resourceService.getResource(this.foosUrl)
     .subscribe(
        data => console.log(data),
        error =>  { console.log(error) ; this.name = 'Error' });
}

  

}
