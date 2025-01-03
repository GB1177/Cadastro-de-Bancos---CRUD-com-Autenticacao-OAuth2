import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.loginForm.value;

    this.authenticate(email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Erro na autenticação:', error);
        alert('Credenciais inválidas. Tente novamente.');
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  /**
   * Simula uma chamada de autenticação para o backend
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Promise<void>
   */
  private authenticate(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'devadmin@example.com' && password === 'admin@123') {
          resolve();
        } else {
          reject('Usuário ou senha inválidos.');
        }
      }, 2000); // Simula tempo de resposta da API
    });
  }
}
