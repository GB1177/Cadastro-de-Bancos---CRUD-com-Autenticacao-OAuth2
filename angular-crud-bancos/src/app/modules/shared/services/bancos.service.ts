import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Banco } from 'src/app/interfaces/Bancos/banco';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  private readonly apiUrl = environment.apiUrl;
  private urlBanc = '/v1/bancos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBancos(): Observable<Banco[]> {
    const url = `${this.apiUrl}${this.urlBanc}`;
    return this.http.get<any>(url).pipe(map((response) => response.content));
  }

  // Obter banco por ID
  getBancoById(id: number): Observable<Banco> {
    const url = `${this.apiUrl}${this.urlBanc}/${id}`;
    return this.http.get<Banco>(url);
  }

  // Criar novo banco
  createBanco(banco: Partial<Banco>): Observable<Banco> {
    const url = `${this.apiUrl}/v1/bancos`;
    return this.http.post<Banco>(url, banco);
  }

  // Atualizar banco
  updateBanco(id: number, banco: Partial<Banco>): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}${this.urlBanc}/${id}`, banco);
  }

  // Excluir banco por ID
  deleteBanco(id: number): Observable<void> {
    const url = `${this.apiUrl}${this.urlBanc}/${id}`;
    return this.http.delete<void>(url);
  }

  // Deletar múltiplos bancos por IDs
  deleteBancos(ids: number[]): Observable<void> {
    const url = `${this.apiUrl}${this.urlBanc}/listIds`;
    return this.http.delete<void>(url, {
      body: { listIds: ids },
    });
  }
}
