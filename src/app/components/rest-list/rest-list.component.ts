import { Component, OnInit } from '@angular/core';
import { Restourant } from 'src/app/models/restourant';
import { RestourantService } from 'src/app/services/restourant.service';

@Component({
  selector: 'app-rest-list',
  templateUrl: './rest-list.component.html',
  styleUrls: ['./rest-list.component.css']
})
export class RestListComponent implements OnInit {

  filterRest:string
  rests:Restourant[]=[]
  constructor(private restService:RestourantService) { }

  ngOnInit(): void {
    this.getRests()
  }

  getRests(){
    this.restService.getRestourants().subscribe(response=>{
      this.rests = response.data
    })
  }

}
