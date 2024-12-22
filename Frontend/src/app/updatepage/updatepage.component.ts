
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DrugService } from '../Services/drug.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updatepage',
  imports: [CommonModule,FormsModule],
  templateUrl: './updatepage.component.html',
  styleUrls: ['./updatepage.component.css']
})
export class UpdatepageComponent {
  _id:any;
  drugupdate!:any;

constructor(private route:ActivatedRoute,private drugService:DrugService ){}

ngOnInit(){

  this._id = this.route.snapshot.paramMap.get('_id');

  this.drugService.getadrug(this._id).subscribe({
    next:(response:any)=>{
      this.drugupdate=response
      console.log('drugupdate:', this.drugupdate);
      console.log(response); 
    },
    error:(error:any) => {
      console.error('Error fetching drug data:', error);
    }
})
  }

  updatedrug(){
    var updateData ={
      id : this.drugupdate._id,
      drug_name: this.drugupdate.drug_name,
      active_ingredients: this.drugupdate.active_ingredients,
      strength: this.drugupdate.strength,
      dosage_form_routes: this.drugupdate.dosage_form_routes,
      marketing_status: this.drugupdate.marketing_status,
      te_code: this.drugupdate.te_code,
      rld: this.drugupdate.rld,
      rs: this.drugupdate.rs
    }
    this.drugService.updateadrug(updateData,this._id).subscribe({
      next:(response:any)=>{
        console.log(response);
        alert(response.message)
      },
      error:(error:any)=>{
        console.log('An error occured while updating Drug Information',error);
      }
  });

  }
}
