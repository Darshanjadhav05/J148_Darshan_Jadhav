import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [CommonModule],
})
export class UserComponent implements OnInit {
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.forUser();
  }

  forUser(): void {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
