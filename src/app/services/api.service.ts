import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  newEmployee(data : any){
return this.http.post<any>("http://localhost:9090/employees/newEmployees",data)
.pipe(map((res :any)=>{  console.log(res.text())
  return res;
}))
  }

  getAllEmployee(data : any){
    return this.http.get<any>("http://localhost:9090/employees/getAll/"+data)
    .pipe(map((res :any)=>{
      return res;
    }))
      }

      updateEmployee(data : any,id : any){
        return this.http.put<any>("http://localhost:9090/employees/updateEmployees/"+id,data)
        .pipe(map((res :any)=>{
          return res;
        }))
          }


          deleteEmployee(row : any){
            return this.http.delete<any>("http://localhost:9090/employees/deleteEmployees/", {params: {'id': row.employeeId}})
            .pipe(map((res :any)=>{
              return res;
            }))
              }
}
