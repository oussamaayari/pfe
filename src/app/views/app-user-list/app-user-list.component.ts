import { AppRole } from './../../Model/AppRole';
import { RoleService } from './../../Services/role.service';
import { AppUserService } from '../../Services/app-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AppUser } from '../../Model/AppUser';

@Component({
  selector: 'app-app-user-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.scss']
})
export class AppUserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'activated', 'user_id','roles','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public errorMsg;
  dataSource: MatTableDataSource<AppUser>;
    userForm: any = {};
  Appusers:AppUser[]= [];
  constructor(private appUserService : AppUserService, private formBuilder: FormBuilder,private roleService: RoleService) { 
  this.dataSource = new MatTableDataSource([]);
}
  ngOnInit() {
  this.appUserService.findall().pipe(first()).subscribe(
      (result) => { 
         console.log(result);
         
        this.dataSource = new MatTableDataSource(result.body);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.roleService.findall().pipe(first()).subscribe(
          data => {
            console.log('oui' +data);
            this.Appusers = data.body;
            console.log('les roles'+this.Appusers); 
          });

     // this.Appusers = value.body;
      //console.log(this.Appusers);
        
    });
    this.userForm = this.formBuilder.group({
      
      'username': ['', Validators.required],
      'activated': ['', Validators.required],
      'user_id': ['', Validators.required],
      'password':['',Validators.required],
      'role': ['', Validators.required]
    
    });
  }  

  saveMenu() {
    console.log(this.userForm.value);
    const appuser: AppUser = new AppUser();
    appuser.username = this.userForm.get(['username']).value;
    appuser.password = this.userForm.get(['password']).value;
    appuser.activated = this.userForm.get(['activated']).value;
    
    //adding role to user!!!!!!!!!!!!!!!!!!
   //const approle:AppRole =new AppRole;
    //approle.roleName=this.userForm.get(['role'])
    //console.log(appuser);
    //console.log(approle);
    this.appUserService.add(appuser).subscribe(data =>console.log(data.body)
                                      ,error => {this.errorMsg=error
      
                                        console.log(this.errorMsg)}
    );
   //this.appUserService.addRoletoUser(appuser,approle).subscribe(data =>console.log(data.body));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteUtilisateur(id: any) {
    
      this.appUserService.deleteUser(id).subscribe(resp => {
        if (resp.status == 200) {
          this.appUserService.findall().pipe(first()).subscribe(
            (data: AppUser[]) => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
        }
        else { alert("error suppression"); }
      });
    }

      updateMenuModel(userForm: any) {
        this.userForm = this.formBuilder.group({
          'user_id': [this.userForm.user_id, Validators.required],
          'username': [this.userForm.username, Validators.required],
          'activated': [this.userForm.activated, Validators.required],
          
          'role': [this.userForm.role, Validators.required]
        });
      }
  


  



}


  
  /////
 

 /* export class UsersComponent implements OnInit {
    displayedColumns: string[] = ['code utilisateur', 'login', 'roles', 'type utilisateur', 'action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    dataSource: MatTableDataSource<User>;
    userForm: any = {};
    listUsers: User[];
  
    constructor(private userService: UsersService, private formBuilder: FormBuilder, private roleService: RoleService) {
      this.dataSource = new MatTableDataSource([]);
    }
  
    ngOnInit() {
      this.userService.getAllUsers().pipe(first()).subscribe(
        (data: User[]) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  
      this.roleService.getAllRole().pipe(first()).subscribe(
        data => {
          this.listUsers = data;
        });
  
  
        this.userForm = this.formBuilder.group({
          'code_user': [{ value: "", disabled: true }, Validators.required],
          'login': ['', Validators.required],
          'password': ['', Validators.required],
          'type_user': ['', Validators.required],
          'roles': ['', Validators.required]
    
        });
    }
  
  
    saveMenu() {
    }
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
  
    deleteMenu(id: any) {
    }
  
  
    updateMenuModel(menu: Menu) {
    }
  
  
  
  }
  
*/
