
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DrugResponse, DrugService } from '../Services/drug.service';
import { SearchPipe } from '../search.pipe';



@Component({
  selector: 'app-vieweditpage',
  imports: [CommonModule,FormsModule,RouterModule,SearchPipe],
  templateUrl: './vieweditpage.component.html',
  styleUrls: ['./vieweditpage.component.css'],
})




export class VieweditpageComponent {

  constructor(private drugService: DrugService){}

  druglist!:DrugResponse[];


  ngOnInit(){

    this.getDrugs();

  }


  getDrugs(){

    this.drugService.getDrugsList().subscribe({

      next:(response:any)=>{
        this.druglist=response.druginfo;
        console.log(response);
      },
      error:(error:any)=>{
        console.log('An error occured while fetching Drug Information',error);
      }
  });
  }


  deleteDrug(event:any,_id:any){

    if(confirm('Are you sure?'))
    {
      event.target.innerText = "Deleting...";

      this.drugService.deleteaDrug(_id).subscribe({
        next:(response:any)=>{

        this.getDrugs();
        alert(response.message)
        }

      });

    }
  }

  searchdrug='';
}
