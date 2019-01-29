import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from './appConfig';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private _httpService: HttpClient) { }

    getNews() {
        return this._httpService.get(AppConfig.API_ENDPOINT + '/getNews');
    }

    searchNews(query: string) {
        const params = new HttpParams()
            .set('search', query);
        return this._httpService.get(AppConfig.API_ENDPOINT + '/searchNews', { params });
    }
}