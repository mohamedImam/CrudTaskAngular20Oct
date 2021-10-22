import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators } from '@angular/forms'
import { EmployeeModel } from '../employee-dashboard.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;
employeeModelObj : EmployeeModel=new EmployeeModel();
employeeData !:any;
showAdd !: boolean;
showEdit !: boolean;
  constructor(private formBuilder : FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:['', [ Validators.required,Validators.minLength(2)]],
      lastName:['',[ Validators.required,Validators.minLength(2)]],
      email:['', Validators.required],
      phoneNumber:['',[ Validators.required, Validators.minLength(10),
        Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
      hireDate:[''],
      salary:['', [Validators.required,Validators.min(1)]],
      manager_id:[''],
      departmentId:['']
    })
    this.getAllEmployees(0);
  }
clickNewButton(){
  this.formValue.reset();
  this.showAdd=true;
  this.showEdit=false;
}

addNewEmployee(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.phoneNumber=this.formValue.value.phoneNumber;
  this.employeeModelObj.hireDate=this.formValue.value.hireDate;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this.employeeModelObj.managerId=this.formValue.value.manager_id;
  this.employeeModelObj.departmentId=this.formValue.value.departmentId;

  this.api.newEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee added")
    let canc=document.getElementById('cancel')
    canc?.click();
    this.formValue.reset();
   // var selectBox = document.getElementById("rowsNum");
   // var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    this.getAllEmployees(0);
  },
  err=>{
    alert("Error")
  })
}

getAllEmployees(data : any)
{
  this.api.getAllEmployee(data)
  .subscribe(res=>{
this.employeeData=res;
  })
}

deleteEmployees(row : any)
{
  this.api.deleteEmployee(row)
  .subscribe(res=>{
alert("Employee deleted");
this.getAllEmployees(0);
  })
}

  onEditEmployee(row : any)
{
  this.showAdd=false;
  this.showEdit=true;
  this.employeeModelObj.id=row.employeeId;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
  this.formValue.controls['hireDate'].setValue(row.hireDate);
  this.formValue.controls['salary'].setValue(row.salary);
  this.formValue.controls['manager_id'].setValue(row.manager_id);
  this.formValue.controls['departmentId'].setValue(row.departmentId);
}

updateEmployee(){
 
 this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.phoneNumber=this.formValue.value.phoneNumber;
  this.employeeModelObj.hireDate=this.formValue.value.hireDate;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this.employeeModelObj.managerId=this.formValue.value.manager_id;
  this.employeeModelObj.departmentId=this.formValue.value.departmentId;

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    console.log(res);
    alert("Employee Updated")
    let canc=document.getElementById('cancel')
    canc?.click();
    this.formValue.reset();
    this.getAllEmployees(0);
  },
  err=>{
    alert("Error")
  })
}
reloadList(event: any){
  
  this.getAllEmployees(event.target.value);
}
}
 
