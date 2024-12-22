from bson import ObjectId
from fastapi import FastAPI,Body
from pydantic import BaseModel,Field
from fastapi.exceptions import HTTPException
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional
import json

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


MONGODB_URI="mongodb://localhost:27017/"


client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client.drugdb
drug_collection = db.get_collection("drugcoll")


ItemId = Annotated[str, BeforeValidator(str)]

class DrugDet(BaseModel):
   
    id: Optional[ItemId] = Field(alias="_id", default=None)
    drug_name : str
    active_ingredients : str
    strength : str
    dosage_form_routes : str
    marketing_status : str
    te_code : str
    rld : str
    rs : str

class UpdateDrug(BaseModel):

    drug_name : str
    active_ingredients : str
    strength : str
    dosage_form_routes : str
    marketing_status : str
    te_code : str
    rld : str
    rs : str




class DrugsList(BaseModel):
    druginfo : list[DrugDet]



@app.post('/newdrug')
async def add_drug(drug:DrugDet):
    drug_dict = drug.model_dump(exclude={"id"})
    add_new_drug=await drug_collection.insert_one(drug_dict)
    created_drug = await drug_collection.find_one({"_id": add_new_drug.inserted_id})
    if created_drug:
        created_drug["_id"]=str(created_drug["_id"])
    return {"message": "Drug added successfully", "data": created_drug}



@app.get('/searchdrug/{id}')
async def search_drug_by_drug_name(id:str):
    drug = await drug_collection.find_one({"_id":ObjectId(id)})
    if drug:
        return DrugDet(**drug)
    raise HTTPException(404,detail="Item Not Found")


@app.get('/viewdrug')
async def view_drug():
    return DrugsList(druginfo= await drug_collection.find().to_list(100))

@app.put('/updatedrug/{id}')
async def update_drug(id: str, drug: UpdateDrug):
    updated_drug = await drug_collection.update_one(

        {"_id":ObjectId(id)},{"$set":drug.model_dump()}
    )
    return{'message':'Drug Information Updated'}

@app.delete('/deletedrug/{id}')
async def delete_drug_by_drug_name(id:str):
        deleted_drug = await drug_collection.delete_one({"_id":ObjectId(id)})
        if deleted_drug.deleted_count ==1:
            return{'message':'Drug Information Deleted'}
        raise HTTPException(404,detail="Item Not Found")


@app.post('/bulkupload/')
async def bulk_upload(drugs: dict = Body(...)):
    try:
        insert_result =await drug_collection.insert_many(drugs["drugs"].values())
        created_drugs=[]
        for inserted_id in insert_result.inserted_ids:
            drug=await drug_collection.find_one({"_id":inserted_id})
            if drug:
                created_drugs.append(drug)
        return {'message':'Bulk Data Has Been Uploaded'}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f'An error occured during bulk uploading:{str(e)}'
        )