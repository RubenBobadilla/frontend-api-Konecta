export interface Index {
    index(): object;
    destroy(id: number): void;
    send(id: number, name: string, email: string, role: string);
}
