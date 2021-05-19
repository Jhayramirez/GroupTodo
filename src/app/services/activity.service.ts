import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  ActivityCollectionId: any;
  constructor() {}

  setActivityId(colletionId) {
    this.ActivityCollectionId = colletionId;
  }
}
