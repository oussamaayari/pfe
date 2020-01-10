import { LoginService } from './../../Services/login.service';
import { EntretienService } from '../../Services/entretien.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Entretien } from '../../Model/Entretien';
 @Component({
  selector: 'app-entretien-list',
  templateUrl: './entretien-list.component.html',
  styleUrls: ['./entretien-list.component.scss']
})
export class EntretienListComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Entretiens: Entretien[] = [];
  getallentretien(){this.entretienService.findall().subscribe(value => {

    this.Entretiens = value.body;
  });}
  constructor(private entretienService: EntretienService) {
    this.entretienService.findall().subscribe(value => {

      this.Entretiens = value.body;
      console.log(this.Entretiens);
      console.log(this.Entretiens);      
    });
    
  }
public test (){


  this.entretienService.search("i").subscribe(data=>{


    console.log(data)
  })
}
  ngOnInit() {
  }
  deleteEntretien(id: any) {
    this.entretienService.deleteEntretien(id).subscribe(resp => {
      if (resp.status == 200) {
        alert("Entretien supprimé avec succée")
      
      }
      else { alert("error suppression"); }
    });
  } 
search(event:any)
{
if (event.target.value=="")
{this.getallentretien()}
else{
  this.entretienService.search(event.target.value).subscribe(data=>{


    this.Entretiens = data.body;
  })


}
}


public getcolor (type:String):any{

if (type ==="Active")
   return{ 'badge':true,
   'badge-success':true};
  
  else if (type==="inactive")
  return{ 'badge':true,
   'badge-danger':true};
}
}
