import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableNotification } from 'rxjs';
import { MostDoctorsRatedData } from 'src/app/Models/Doctor/MostDoctorsRated';
import { Pagination } from 'src/app/Models/Helper/Pagination';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseServices {
  baseUrl = this.HostUrl+"/Doctor/";  
  constructor(private http: HttpClient) {super(); }

  async getMostDoctorsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostDoctorsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

  // return doctors Pagination ...
   getDoctorsPagination(pageNumber: Number, pageSize: Number):Observable<any>{
    return  this.http.post(this.baseUrl + "PaginationDoctors", { 'pageNumber': pageNumber, 'pageSize': pageSize });
  }

  async getDoctorInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }
  async getReserveDoctorData(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "GetReserveDoctorData",{ 'pageNumber': pageNumber, 'pageSize': pageSize },this.getoption());
  }
}
