export class TodoData {
    thing: string;
    status: boolean;
    editing: boolean;

    constructor(_thing : string,_status: boolean,_editing: boolean) {
        this.thing = _thing;
        this.status = _status;
        this.editing = _editing;
    }

    openEditing() {
        this.editing = true;
    }

    closeEditing() {
        this.editing = false;
    }

}

export enum TodoListStatus {
    All, Active, Completed
}