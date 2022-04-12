export interface Index {
    index(): object;
    send(id :number, name:string, reference:string, stock:number, price:number, category_id:number);
    destroy(id: number): void;
}
