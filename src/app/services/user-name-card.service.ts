import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { CreateUserNameCard } from '../models/user-name-card.model';

@Injectable({
  providedIn: 'root',
})
export class UserNameCardService {
  constructor(private http: HttpClient) {}

  // Thêm hoặc cập nhật name card
  UserNameCard_InsertUpdate(
    createUserNameCard: CreateUserNameCard
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/UserNameCard`,
      createUserNameCard
    );
  }

  // Lấy name card theo slug
  UserNameCard_GetBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/UserNameCard/${slug}`);
  }
}
