import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public role :String;

  constructor( ) 
  { 
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {    
  }

}
