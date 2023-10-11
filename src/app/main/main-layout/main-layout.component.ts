import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/auth/store/user/profile.state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  companyName: string;
  username: string;

  constructor(private store: Store) {
    this.companyName = '...';
    this.username = '...';
  }

  ngOnInit() {
    this.store.select(selectUserData).subscribe((userData) => {
      this.companyName = userData?.companyName;
      this.username = userData?.username;
    });
  }
}
