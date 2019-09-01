import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import {DrawingService} from '../../services/drawing.service';
import {elements} from '../../constants/sizes';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  shapes = ['circle', 'square', 'triangle'];
  shapeInitialMouseDragPosition: { x: number, y: number };
  idCounter = 0;
  lineCoordinates = [];

  constructor(private drawingService: DrawingService) { }

  ngOnInit() {
  }

  get isViewMode() {
    return this.drawingService.published;
  }

  get drawedShapes() {
    return this.drawingService.drawedShapes;
  }

  trackByFn(index, item) {
    return item + index;
  }

  onDragStart(event: DragEvent) {
    this.shapeInitialMouseDragPosition = { x: event.offsetX, y: event.offsetY };
  }

  onDrop(event: DndDropEvent) {
    const xPoint = event.event.clientX - elements.drawer.panel.width - this.shapeInitialMouseDragPosition.x;
    const yPoint = event.event.clientY - elements.topBar.height - this.shapeInitialMouseDragPosition.y;
    this.drawingService.add({
      type: event.data,
      id: ++this.idCounter,
      toBeSelected: false,
      style: { transform: `translate(${xPoint}px, ${yPoint}px)` }
    });
    this.drawingService.cancelRedo();
  }

  endLineDrawing() {
    this.drawingService.drawedShapes.forEach(shape => {
      shape.toBeSelected = false;
      shape.isSelected = false;
    });
    this.lineCoordinates = [];
  }

  onDrawedShapeClick(event) {
    if (this.isViewMode || this.drawingService.drawedShapes.length < 2) { return; }

    const illegalSelection = lc => {
      return (lc[0] === lc[2] && lc[1] === lc[3]); // Clicked twice on the same shape
    };
    const shapeMiddle = elements.drawer.shape.width / 2;
    const pos = event.target.getBoundingClientRect();
    this.lineCoordinates.push(pos.left - elements.drawer.panel.width + shapeMiddle);
    this.lineCoordinates.push(pos.top - elements.topBar.height + shapeMiddle);

    if (this.lineCoordinates.length === 4) {
      if (illegalSelection(this.lineCoordinates)) {
        this.endLineDrawing();
        return;
      }
      this.drawingService.add({
        type: 'line',
        id: ++this.idCounter,
        coords: [...this.lineCoordinates]
      });
      this.endLineDrawing();
    }
    else { // highlight shapes selection options
      const shapeId = Number(event.target.getAttribute('sid'));
      this.drawingService.drawedShapes.forEach(shape => {
        if (shape.id !== shapeId) {
          shape.toBeSelected = true;
        }
        else {
          shape.isSelected = true;
        }
      });
    }
  }

  clickOutside(event) { // cancel line drawing when clicking outside of a shape
    if (!event.target.classList.contains('drawed-shape')) {
      this.endLineDrawing();
    }
  }

  getDrawedShapeClass(shape) {
    return {
      'drawed-shape shape': true,
      [shape.type]: true,
      'to-be-selected': shape.toBeSelected,
      selected: shape.isSelected,
      'read-only': this.isViewMode
    };
  }
}
