import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  registerError = false;
  registerErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.registerError = false;
      
      this.userService.register(this.registerForm.value).subscribe({
      
        next: () => {
          console.log('Registration successful', this.registerForm.value);
          this.loading = false;
          this.router.navigate(['/login'], {
            state: { registrationSuccess: true }
          });
        },
        error: (error) => {
          this.loading = false;
          this.registerError = true;
          this.registerErrorMessage = error.error?.message || 'Registration failed. Please try again.';
          console.error('Registration failed:', error);
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}