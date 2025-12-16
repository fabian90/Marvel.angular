
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  loading = signal(false);
  error = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        // La navegación se maneja en el servicio, por lo que un 'next' vacío está bien.
        error: (err: any) => {
          this.error.set(err.error?.detail || 'Credenciales inválidas. Por favor, intenta de nuevo.');
        }
      });
  }
}
