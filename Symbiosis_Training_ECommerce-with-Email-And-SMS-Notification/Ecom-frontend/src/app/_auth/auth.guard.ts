import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
  
    const token = this.userAuthService.getToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
  
    // ✅ Get roles from localStorage
    const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  
    // ✅ Normalize user roles from local storage
    const userRoles: string[] = storedRoles.map((r: any): string => {
      const roleName: string = typeof r === 'string' ? r : r.roleName;
      return roleName.replace('ROLE_', '').toUpperCase();
    });
  
    // ✅ Normalize expected roles from route
    const normalizedExpectedRoles: string[] = expectedRoles.map((role: string): string =>
      role.replace('ROLE_', '').toUpperCase()
    );
  
    console.log('User roles:', userRoles);
    console.log('Expected roles:', normalizedExpectedRoles);
  
    // ✅ Check for match
    const hasRole: boolean = normalizedExpectedRoles.some((role: string): boolean =>
      userRoles.includes(role)
    );
  
    if (!hasRole) {
      this.router.navigate(['forbidden']);
      return false;
    }
  
    return true;
  }
  
  
}
