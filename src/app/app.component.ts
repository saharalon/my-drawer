import { Component } from '@angular/core';
import { DrawingService } from './services/drawing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = true;

  constructor(private drawingService: DrawingService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
              private apiService: ApiService) { }

  ngOnInit() {
    const drawingId = location.pathname.slice(1);
    if (drawingId.length > 1) {
      this.httpClient.get(`${this.apiService.getDiagramsUrl()}/${drawingId}`).subscribe((res: any) => {
        const diagram = JSON.parse(res.diagram[0].json);
        this.drawingService.init({
          published: diagram.published,
          drawedShapes: diagram.drawedShapes,
          undoList: diagram.undoList
        });
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
        console.log(err);
      });
    }
    else {
      this.isLoading = false;
    }
  }
}
