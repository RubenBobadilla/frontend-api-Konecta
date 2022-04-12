export interface Product {
    index(): object;
    changeToCreate(): void;
    changeToUpdate(): void;
    store(): void;
    show(id: number): void;
    update(): void;
    destroy(id: number): void;
}
