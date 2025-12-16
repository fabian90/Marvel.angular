
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loading = signal(false);
  error = signal<string | null>(null);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.authService.register(this.registerForm.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        // La navegación se maneja en el servicio.
        error: (err: any) => {
          this.error.set(err.error?.detail || 'El registro falló. El usuario ya puede existir.');
        }
      });
  }
}
