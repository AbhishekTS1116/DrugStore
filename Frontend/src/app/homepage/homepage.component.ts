
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DrugService } from '../Services/drug.service';
import * as XLSX from 'xlsx';
import { DrugResponse } from '../Services/drug.service';

@Component({
  selector: 'app-homepage',
  imports: [FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  BulkData!: DrugResponse[]

  drugname!: string
  activeingredients!: string
  strength!: string
  dosageformroute!: string
  marketingstatus!: string
  tecode!: string
  rld!: string
  rs!: string

  constructor(private drugService: DrugService) { }


  savedrug() {
    var inputData = {
      drug_name: this.drugname,
      active_ingredients: this.activeingredients,
      strength: this.strength,
      dosage_form_routes: this.dosageformroute,
      marketing_status: this.marketingstatus,
      te_code: this.tecode,
      rld: this.rld,
      rs: this.rs,

    }


    this.drugService.savedrug(inputData).subscribe({
      next: (response: any)=> {
        console.log('Drug has been stored in the database successfully', response)
        alert(response.message);
        this.drugname = '';
        this.activeingredients = '';
        this.strength = '';
        this.dosageformroute = '';
        this.marketingstatus = '';
        this.tecode = '';
        this.rld = '';
        this.rs = '';

      },
      error: (error:any) => {
        console.log('Error occured during uploading', error);
      }
   });

  }
  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.BulkData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
      console.log(this.BulkData);
      const Drugs: { [key: string]: DrugResponse } = {};
      this.BulkData.forEach((drug: DrugResponse) => {
        Drugs[drug.drug_name] = drug;
        console.log(`Name: ${drug.drug_name}`);

      });
      console.log(Drugs);
      console.log(typeof this.BulkData);
      console.log(this.BulkData.length);
      this.uploadBulkData(Drugs);
    };

  }
  uploadBulkData(data: any) {

    this.drugService.bulkUploadDrug(data).subscribe({
      next:(response:any)=>{
        console.log("The Uploading of Bulk Data is Sucess",response)
        alert(response.message);
      },
      error:(error:any)=>{
        console.log("Error Occured During Uploading",error);
      }
    });
  }
}
