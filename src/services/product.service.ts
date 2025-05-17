    import { Injectable } from '@angular/core';
    import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
    import { Observable } from 'rxjs';

    export interface Product {
    id: string;
    name: string;
    price: number;
    type: 'ticket' | 'pass'; // lehet más típus is
    }

    @Injectable({
    providedIn: 'root'
    })
    export class ProductService {
    private productsRef;

    constructor(private firestore: Firestore) {
        this.productsRef = collection(this.firestore, 'products');
    }

    // 🔹 Összes termék
    getAllProducts(): Observable<Product[]> {
        return collectionData(this.productsRef, { idField: 'id' }) as Observable<Product[]>;
    }

    // 🔹 Csak jegyek
    getTickets(): Observable<Product[]> {
        return new Observable(observer => {
        this.getAllProducts().subscribe(products => {
            const tickets = products.filter(p => p.type === 'ticket');
            observer.next(tickets);
        });
        });
    }

    // 🔹 Csak bérletek
    getPasses(): Observable<Product[]> {
        return new Observable(observer => {
        this.getAllProducts().subscribe(products => {
            const passes = products.filter(p => p.type === 'pass');
            observer.next(passes);
        });
        });
    }

    // 🔹 Egy konkrét termék ID alapján
    getProductById(id: string): Observable<Product> {
        const productDoc = doc(this.firestore, `products/${id}`);
        return docData(productDoc, { idField: 'id' }) as Observable<Product>;
    }
}
