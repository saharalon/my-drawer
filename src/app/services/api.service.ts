import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  apiServer = 'https://my-drawer-server.herokuapp.com';

  constructor() { }

  getDiagramsUrl(): string {
    return this.apiServer + '/api/diagrams';
  }

}
