import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'epa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;  // показывает состояние логина
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setMessage();
  }

  ngOnDestroy(): void {
    console.log('[takeUntil ngOnDestroy]');
    this.unsubscribe$.complete();
  }

  onLogin() {
    this.message = 'Trying to log in ...';
    const observer = {
      next: () => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '/admin';
          // Redirect the user
          this.router.navigate([redirect]);
        }
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('[takeUntil] complete')
    };
    this.authService
      .login()
      // The TakeUntil subscribes and begins mirroring the source Observable.
      // It also monitors a second Observable that you provide.
      // If this second Observable emits an item or sends a termination notification,
      // the Observable returned by TakeUntil stops mirroring the source Observable and terminates.
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(observer);
  }

  onLogout() {
      this.authService.logout();
      this.setMessage();
  }

  private setMessage() {
      this.message = 'Logged ' + (this.authService.isLoggedIn ? 'IN' : 'OUT');
  }

}
