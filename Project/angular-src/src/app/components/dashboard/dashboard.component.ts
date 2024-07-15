import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  links: Array<any>;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile["user"];
    },
      err => {
        console.log(err);
        return false;
      });
    this.fetchLinks();
  }

  convertToEmbedUrl(url: string): string {
    let videoId = url.split('youtu.be/')[1];
    return 'https://www.youtube.com/embed/' + videoId;
  }

  fetchLinks() {
    this.http.get<any>('http://localhost:3000/links/fetch-links').subscribe(data => {
      this.links = data.links.map(link => {
        return {
          link,
          url: this.convertToEmbedUrl(link.url)
        };
      });
    }, error => {
      console.log(error);
    });
  }
}
