import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface DrugResponse{
  
  _id :string
  drug_name: string
  active_ingredients: string
  strength: string
  dosage_form_routes: string
  marketing_status: string
  te_code: string
  rld: string
  rs: string
  
}


@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private httpClient : HttpClient ) {}


  getDrugsList(){
    return this.httpClient.get('http://localhost:8000/viewdrug');
  }

  savedrug(inputData: any){

    return this.httpClient.post('http://localhost:8000/newdrug',inputData);
  }

  getadrug(_id:any){
    
    return this.httpClient.get(`http://localhost:8000/searchdrug/${_id}`); 
  }

  updateadrug(updateData:any,_id:string){

    return this.httpClient.put(`http://localhost:8000/updatedrug/${_id}`,updateData);
  }

  deleteaDrug(_id:string){
    return this.httpClient.delete(`http://localhost:8000/deletedrug/${_id}`)

  }

  bulkUploadDrug(drugs:DrugResponse[]){
    return this.httpClient.post(`http://localhost:8000/bulkupload/`,{drugs});
  }

}
