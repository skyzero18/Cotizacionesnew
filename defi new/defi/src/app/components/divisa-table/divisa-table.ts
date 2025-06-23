import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-divisa-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './divisa-table.html',
  styleUrl: './divisa-table.css'
})

export class DivisaTable {
   productos: any[] = [];
  productosFiltrados: any[] = [];
  cargando = false;

  terminoBusqueda: string = '';
  campoBusqueda: 'title' | 'slug' = 'title';

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargando = true;
    this.api.get<any[]>('products').subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data; // inicial sin filtro
        this.cargando = false;
      },
      error: (e) => {
        console.error('Error al obtener productos:', e);
        this.cargando = false;
      }
    });
  }

  filtrarProductos() {
    const term = this.terminoBusqueda.trim().toLowerCase();

    if (!term) {
      this.productosFiltrados = this.productos;
      return;
    }

    this.productosFiltrados = this.productos.filter(prod => {
      const campo = (prod[this.campoBusqueda] || '').toString().toLowerCase();
      return campo.includes(term);
    });
  }
}
