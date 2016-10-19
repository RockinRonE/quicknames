import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ChecklistPage } from '../checklist-page/checklist-page';
import { ChecklistModel } from '../../models/checklist-model';
import { Data } from '../../providers/data';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  checklists: ChecklistModel[] = [];

  constructor(public nav: NavController, public dataService: Data, public alertCtrl: AlertController) {

    this.dataService.getChecklistData().then((checklists) => {
      let savedChecklists: any = false; 

      if(checklists && typeof(checklists) != 'undefined') {
        savedChecklists = JSON.parse(checklists);
      }

      if(savedChecklists) {
        savedChecklists.forEach((savedChecklist) => {
          let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items, savedChecklist.notes);
          this.checklists.push(loadChecklist);

          loadChecklist.checklist.subscribe(update => {
            this.saveChecklist(); 
          });
        });
      }
    });
  }

  addChecklist(): void {
    let prompt = this.alertCtrl.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [ 
        {
        name: 'name' 
        }
      ], 
      buttons: [
        {
          text: 'Cancel'
        }, 
        {
          text: 'Save', 
          handler: data => {
            let newChecklist = new ChecklistModel(data.name, [], ''); 
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => { 
              this.saveChecklist();
            });

            this.saveChecklist(); 
          }
        } 
      ]
    });

    prompt.present(); 
  }

  renameChecklist(checklist): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:', 
      inputs: [
        {
          name: 'name'
        }
        ], 
        buttons: [
          {
          text: 'Cancel'
          }, 
          {
          text: 'Save', 
          handler: data => {
            let index = this.checklists.indexOf(checklist);
            if(index > -1) { 
              this.checklists[index].setTitle(data.name); 
              this.saveChecklist();
            }
          } 
        }
      ] 
    });
      prompt.present(); 
  }
  

  viewChecklist(checklist): void { 
    this.nav.push(ChecklistPage, {
      checklist: checklist 
    });
  }

  removeChecklist(checklist): void{ 
    let index = this.checklists.indexOf(checklist);

    if(index > -1){ 
      this.checklists.splice(index, 1); 
      this.saveChecklist();
    }
  }

  saveChecklist(): void{
    this.dataService.saveChecklist(this.checklists);
  }

}
