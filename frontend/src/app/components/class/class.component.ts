import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app-class', templateUrl: './class.component.html' })
export class ClassComponent implements OnInit {
  videoUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ videoUrl: string }>('http://localhost:5000/api/class').subscribe((data) => {
      this.videoUrl = data.videoUrl;
    });
  }
}