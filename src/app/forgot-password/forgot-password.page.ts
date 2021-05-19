import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;

  constructor(private AuthService: AuthService) {}

  ngOnInit() {}

  forgotPassword() {
    this.AuthService.resetPassword(this.email);
  }
}
