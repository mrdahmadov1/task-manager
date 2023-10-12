import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  userEmail: string;
  companyName: string;
  username: string;

  constructor(private userDataService: UserDataService) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.companyName = '...';
    this.username = '...';
  }

  ngOnInit() {
    this.userDataService.getUserData(this.userEmail).subscribe((userData) => {
      this.companyName = userData[0].companyName;
      this.username = userData[0].username;
    });
  }
}
