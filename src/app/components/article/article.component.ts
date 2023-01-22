import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  download: string = '../../../assets/images/download.png';
  translate: string = '../../../assets/images/translate.png';
  share: string = '../../../assets/images/share.png';
  imprime: string = '../../../assets/images/imprimante.png';
  article: string = '../../../assets/images/article.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
