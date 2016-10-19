import { Observable } from 'rxjs/Observable';

export class ChecklistModel {
    checklist: any;
    checklistObserver: any; 

    constructor(public title: string, public items: any[], public notes: string) {
        this.items = items; 
        this.notes = notes; 

        this.checklist = Observable.create(observer => {
            this.checklistObserver = observer; 
        });
    }

    addItem(item, notes): void {
        this.items.push({
            title: item,
            notes: notes,
            checked: false
        });
        this.checklistObserver.next(true);
    }

    removeItem(item): void {
        let index = this.items.indexOf(item);

        if( index > -1) {
            this.items.splice(index, 1);
        }

        this.checklistObserver.next(true);
    }

    renameItem(item, title): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items[index].title = title; 
        }

        this.checklistObserver.next(true);
    }

    setTitle(title): void {
        this.title = title; 
        this.checklistObserver.next(true);
    }

    toggleItem(item): void {
        item.checked = !item.checked; 
        this.checklistObserver.next(true);
    }
}