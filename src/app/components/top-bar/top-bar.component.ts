import { Component, OnInit } from '@angular/core';
import {DrawingService} from '../../services/drawing.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private drawingService: DrawingService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  get isViewMode() {
    return this.drawingService.published;
  }

  get drawedShapes() {
    return this.drawingService.drawedShapes;
  }

  get undoList() {
    return this.drawingService.undoList;
  }

  undo() {
    this.drawingService.undo();
  }

  redo() {
    this.drawingService.redo();
  }

  erase() {
    this.drawingService.erase();
  }

  save(published = false) {
    this.drawingService.save(published, id => {
      if (published) {
        setTimeout(() => {
          const elem: any = document.getElementById('published-copy-link');
          elem.select();
          document.execCommand('copy');
        }, 1000);
        this.snackBar.open('Published! Link is copied to you clipboard', 'Close', {duration: 4000});
      }
      else {
        this.snackBar.open('Saved!', null, {duration: 1500});
      }
    });
  }

  isDrawingSaved() {
    return location.pathname.slice(1).length > 1;
  }

  getShareUrl() {
    return location.href;
  }

}
