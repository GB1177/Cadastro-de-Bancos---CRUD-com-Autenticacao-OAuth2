import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banco } from 'src/app/interfaces/Bancos/banco';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

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
    return this.http.get<Banco>(`${this.apiUrl}/${id}`);
  }

  // Criar novo banco
  createBanco(banco: Partial<Banco>): Observable<Banco> {
    return this.http.post<Banco>(this.apiUrl, banco);
  }

  // Atualizar banco
  updateBanco(id: number, banco: Partial<Banco>): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}/${id}`, banco);
  }

  // Excluir banco por ID
  deleteBanco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Deletar múltiplos bancos por IDs
  deleteBancos(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listIds`, {
      body: { listIds: ids },
    });
  }
}
