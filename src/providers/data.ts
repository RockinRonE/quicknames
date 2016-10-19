import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Data {
  constructor( public storage: Storage) {

  }

  getChecklistData(): Promise<any> {
    return this.storage.get('checklists');
  }

  saveChecklist(data): void {
    let saveData = [];

    //Remove observables
    data.forEach((checklist) => { 
      saveData.push({
        title: checklist.title,
        items: checklist.items 
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData); 
  }
}
