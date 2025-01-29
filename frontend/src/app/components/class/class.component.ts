import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({ selector: 'app-class', templateUrl: './class.component.html' })
export class ClassComponent implements OnInit {
  videoUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ videoUrl: string }>(`${environment.apiUrl}/api/class`).subscribe((data) => {
      this.videoUrl = data.videoUrl;
    });
  }
}