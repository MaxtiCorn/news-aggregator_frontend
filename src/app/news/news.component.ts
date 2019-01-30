import { Component, OnInit } from '@angular/core';
import { NewsService } from '../newsService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private _news: { title: string, description: string, link: string }[];
  private _searchQuery: string;

  constructor(private _newsService: NewsService) { }

  public get news() {
    return this._news;
  }

  public set searchQuery(value: string) {
    this._searchQuery = value;
  }

  ngOnInit() {
    this.refresh()
  }

  private updateNews(observable: Observable<Object>) {
    observable.subscribe((news: { title: string, description: string, link: string }[]) => {
      this._news = news.map(n => {
        return {
          title: n.title ? n.title : n.link,
          description: n.description,
          link: n.link
        }
      });
    }, error => { console.log(error.message) })
  }

  refresh() {
    this.updateNews(this._newsService.getNews());
  }

  search() {
    if (this._searchQuery) {
      this.updateNews(this._newsService.searchNews(this._searchQuery));
    }
  }

}
