import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  constructor(  public authService: AuthService
    , private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }
  cerrarSession(){
    this.authService.SignOut()
    this.toastr.success('Inicio de sesión correctamente', '¡Proceso exitoso!');
  }
}
