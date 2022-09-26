export class TaskRecord {
    id: number;
    name: string;
    isCompleted: boolean;

    constructor(id: number, name: string, isCompleted: boolean) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
    }

    equals(task: TaskRecord): boolean {
        return this.id === task.id && this.name === task.name && this.isCompleted === task.isCompleted;
    }
}