export interface Index {
    index(): object;
    send(id :number, name:string);  
    destroy(id: number): void;    
}
