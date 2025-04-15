import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule,MatButtonModule,MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  loginError: boolean = false;
  loading: boolean = false; // Loading state for the spinner

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  login(): void {
    this.loginError = false; // Reset error state on new attempt
    
    if (this.loginForm.valid) {
      this.loading = true; // Start loading spinner
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.loading = false; // Stop loading spinner
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        },
        (error) => {
          this.loading = false; // Stop loading spinner on error
          console.error('Login failed:', error);
          this.loginError = true; // Show error message and register link
        this.loginForm.reset(); // Reset the form on error
        }
      );
    }
  }

  registerUser(): void {
    this.router.navigate(['/register']);
  }
}