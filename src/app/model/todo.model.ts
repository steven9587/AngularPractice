export class TodoData {
    // thing: string;
    // status: boolean;
    // editing: boolean;
    Editing: boolean;
    TodoId: string;
    Thing: string;
    Status: boolean;
    CreateTime: string;

    constructor(_Editing : boolean,_TodoId: string,_Thing: string,_Status: boolean,_CreateTime: string) {
        this.Editing = _Editing;
        this.TodoId = _TodoId;
        this.Thing = _Thing;
        this.Status = _Status;
        this.CreateTime = _CreateTime;
    }

    openEditing() {
        this.Editing = true;
    }

    closeEditing() {
        this.Editing = false;
    }

}

export enum TodoListStatus {
    All, Active, Completed
}