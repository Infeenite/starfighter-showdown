import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Starfighter } from '../../models/starfighter';

@Injectable()
export class StarfightersService {
    constructor(private http: HttpClient) { }

    getStarfighters(page?: number): Observable<Starfighter[]> {
        return this.http.get(`${environment.apiUrl}/starships/?page=${page || 1}`).pipe(pluck('results'));
    }
}
