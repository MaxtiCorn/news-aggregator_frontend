import { Component, OnInit } from '@angular/core';
import { NewsService } from '../newsService';

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

  refresh() {
    this._newsService.getNews()
      .subscribe((news: { title: string, description: string, link: string }[]) => {
        this._news = news.map(n => {
          return {
            title: n.title ? n.title : n.link,
            description: n.description,
            link: n.link
          }
        });
      });
  }

  search() {
    this._newsService.searchNews(this._searchQuery)
      .subscribe((news: { title: string, description: string, link: string }[]) => {
        this._news = news.map(n => {
          return {
            title: n.title ? n.title : n.link,
            description: n.description,
            link: n.link
          }
        });
      });
  }

}
