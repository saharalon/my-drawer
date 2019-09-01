import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import uuidv1 from 'uuid/v1';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

interface Shape {
  id: number;
  type: string;
  style?: {};
  isSelected?: boolean;
  toBeSelected?: boolean;
  coords?: Array<number>;
}

interface Drawing {
  published: boolean;
  drawedShapes: Array<Shape>;
  undoList: Array<Shape>;
}

@Injectable()
export class DrawingService {

  constructor(private router: Router, private httpClient: HttpClient, private apiService: ApiService) { }

  published = false;
  drawedShapes: Array<Shape> = [];
  undoList: Array<Shape> = [];

  init(drawing: Drawing): void {
    this.published = drawing.published;
    this.drawedShapes = drawing.drawedShapes;
    this.undoList = drawing.undoList;
  }

  get(): Drawing {
    return {
      published: this.published,
      drawedShapes: this.drawedShapes,
      undoList: this.undoList
    };
  }

  add(shape: Shape): void {
    this.drawedShapes.push(shape);
  }

  undo() {
    this.drawedShapes.length && this.undoList.push(this.drawedShapes.pop());
  }

  redo() {
    this.undoList.length && this.drawedShapes.push(this.undoList.pop());
  }

  cancelRedo() {
    this.undoList = [];
  }

  erase() {
    this.drawedShapes = [];
    this.undoList = [];
  }

  save(published = false, onSaveSuccess = id => {}) {
    const drawingId = uuidv1();
    const drawing = {
      ...this.get(),
      published
    };
    const body = {
      id: drawingId,
      json: drawing
    };
    this.httpClient.post(this.apiService.getDiagramsUrl(), body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((res: any) => {
      this.router.navigateByUrl('/' + drawingId);
      onSaveSuccess(drawingId);
    }, err => {
      console.log(err);
    });
  }

}
