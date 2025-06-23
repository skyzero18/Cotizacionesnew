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
  categorias: any[] = [];
  cargando = false;

  terminoBusqueda: string = '';
  campoBusqueda: 'title' | 'slug' = 'title';
  categoriaSeleccionada: string = '';

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargando = true;

    this.api.get<any[]>('products').subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.cargando = false;
      },
      error: (e) => {
        console.error('Error al obtener productos:', e);
        this.cargando = false;
      }
    });

    this.api.get<any[]>('categories').subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (e) => {
        console.error('Error al obtener categorías:', e);
      }
    });
  }

  filtrarProductos() {
    const term = this.terminoBusqueda.trim().toLowerCase();

    this.productosFiltrados = this.productos.filter(prod => {
      const coincideBusqueda = term
        ? prod.title.toLowerCase().includes(term) || prod.slug.toLowerCase().includes(term)
        : true;

      const coincideCategoria = this.categoriaSeleccionada
        ? prod.category?.slug === this.categoriaSeleccionada
        : true;

      return coincideBusqueda && coincideCategoria;
    });
  }
}