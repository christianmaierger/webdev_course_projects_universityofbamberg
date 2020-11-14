export class Todo {
    constructor(
        public id:number,
        public title:string,
        public date: Date,
        public description: string,
        public state: boolean
        ){}
    
}
