import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from 'src/app/Models/city';
import { HospitalInfo } from 'src/app/Models/Hospital/HospitalInfo';
import { DoctorProfileComponent } from 'src/app/profiles/doctor-profile/doctor-profile.component';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';

@Component({
  selector: 'app-update-hospital',
  templateUrl: './update-hospital.component.html',
  styleUrls: ['./update-hospital.component.scss']
})
export class UpdateHospitalComponent implements OnInit {
  hospitsalForm!:FormGroup
  cities:any;
  userName:any
  hospitalId!:Number
  hospitalInfoData!:Array<HospitalInfo>

  constructor( private fb:FormBuilder ,private accountService:AccountService,
    private hospitalService:HospitalService,private doctorService:DoctorService) {}



 async ngOnInit():Promise <void> {
    this.hospitsalForm=this.fb.group({
      'nameInput':['',Validators.required],
      'webSiteInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
      'aboutHospitalInput':['',[Validators.required]],
    });
    this.getCities();
    this.userName=this.doctorService.getValue();
    (await this.hospitalService.getHospitalInfo(this.userName)).subscribe(data => {
      this.hospitalInfoData = data;
      this.hospitalId = data.id;
    })
  }
    getCities(){
      this.accountService.getCities().subscribe(response =>{
        this.cities = response;
      })
    }

  async  onSubmit(event:any){
        let name = event.target.nameInput.value;
        let location=event.target.locationInput.value;
        let aboutHospital = event.target.aboutHospitalInput.value;
        let phoneNumer =event.target.phoneNumberInput.value;
        let homeNumber =event.target.homeNumberInput.value;
        let webSite =event.target.webSiteInput.value;
        let city =event.target.selectCityInput.value;
        let id =this.hospitalId

        if(id == undefined){
          alert ("I'm soory can't update Info ,please return to new Login..")
        }
        else {

        let result = await this.hospitalService.updateHospitalInfo(id,name,location,aboutHospital,
        phoneNumer,homeNumber,webSite,city)
        result.subscribe(response =>{
          if(response.data ==false)
          {
            alert("Please Try Agin ....")
          }
          else{
            alert(response.message)
          }
      });
  }}
}
