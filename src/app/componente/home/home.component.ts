import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Aquí va la lógica para manejar los botones y la información de las imágenes
  informacionPorTipo: { [key: string]: any[] } = {

    casa: [
      {
        src: 'assets/images/molina.png',
        location: 'LA MOLINA, PERÚ',
        rating: '⭐ 4.87',
        date: '15 - 25 octubre',
        price: 's/. 300 x día'
      },
      {
        src: 'assets/images/flores.png',
        location: 'MIRAFLORES, PERÚ',
        rating: '⭐ 4.95',
        date: '01 - 31 diciembre',
        price: 's/. 1000 x semana'
      },
      {
        src: 'assets/images/planicie.png',
        location: 'LA PLANICIE, PERÚ',
        rating: '⭐ 8.00',
        date: '03 - 15 noviembre',
        price: 's/. 1200 x día'
      },
      {
        src: 'assets/images/planicie2.png',
        location: 'LA PLANICIE, PERÚ',
        rating: '⭐ 4.50',
        date: 'TODO EL MES',
        price: 's/. 2000 x mes'
      }
    ],
    hoteles: [
      {
        src: 'assets/images/ibis.png',
        location: 'HOTEL IBIS, PERÚ',
        rating: '⭐ 6.00',
        date: 'HABITACIONES',
        price: 's/. 500 x noche'
      },
      {
        src: 'assets/images/palmetto.png',
        location: 'PALMETTO, PERÚ',
        rating: '⭐ 8.00',
        date: 'HABITACIONES',
        price: 's/. 800 x noche'
      },
      {
        src: 'assets/images/paraiso.png',
        location: 'EL PARAISO, PERÚ',
        rating: '⭐ 3.60',
        date: 'CUARTO MATRIMONIAL',
        price: 's/. 200 x noche'
      },
      {
        src: 'assets/images/planicie3.png',
        location: 'LA PLANICIE, PERÚ',
        rating: '⭐ 10.00',
        date: 'SWEET COMPLETO',
        price: 's/. 1800 x noche'
      }
    ],
    habitaciones: [
      {
        src: 'assets/images/miraflores.png',
        location: 'MIRAFLORES, PERÚ',
        rating: '⭐ 4.87',
        date: 'MATRIMONIAL',
        price: 's/. 600 x noche'
      },
      {
        src: 'assets/images/san isidro.png',
        location: 'SAN ISIDRO, PERÚ',
        rating: '⭐ 4.95',
        date: 'PERSONA SOLA',
        price: 's/. 200 x noche'
      },
      {
        src: 'assets/images/la molina.png',
        location: 'LA MOLINA, PERÚ',
        rating: '⭐ 8.00',
        date: 'PERSONA SOLA',
        price: 's/. 400 x noche'
      },
      {
        src: 'assets/images/la planicie2.png',
        location: 'LA PLANICIE, PERÚ',
        rating: '⭐ 4.50',
        date: 'MATRIMONIAL',
        price: 's/. 800 x noche'
      },
    ],
    piscinas: [
      {
        src: 'assets/images/chosica.png',
        location: 'CHOSICA, PERÚ',
        rating: '⭐ 6.89',
        date: 'FAMILIAR',
        price: 's/. 40'
      },
      {
        src: 'assets/images/perulandia.png',
        location: 'PERULANDIA, PERÚ',
        rating: '⭐ 4.0',
        date: 'FAMILIAR',
        price: 's/. 60'
      },
      {
        src: 'assets/images/agualandia.png',
        location: 'AGUALANDIA, PERÚ',
        rating: '⭐ 6.55',
        date: 'FAMILIAR',
        price: 's/. 80'
      },
      {
        src: 'assets/images/paraiso del sur.png',
        location: 'PARAISO DEL SUR, PERÚ',
        rating: '⭐ 7.80',
        date: 'FAMILIAR',
        price: 's/. 100'
      },
    ],
    vinedos: [
      {
        src: 'assets/images/luna.png',
        location: 'LUNA, PERÚ',
        rating: '⭐ 2.99',
        date: '06 - 11 setiembre',
        price: 's/. 200 x noche'
      },
      {
        src: 'assets/images/ica.png',
        location: 'ICA, PERÚ',
        rating: '⭐ 7.00',
        date: '3 - 8 setiembre',
        price: 's/. 882 x noche'
      },
      {
        src: 'assets/images/villa de leyva.png',
        location: 'VILLA DE LEYVA, PERÚ',
        rating: '⭐ 6.55',
        date: '1 - 6 setiembre',
        price: 's/. 1,084 x noche'
      },
      {
        src: 'assets/images/ica2.png',
        location: 'ICA, PERÚ',
        rating: '⭐ 7.80',
        date: '1 - 6 setiembre',
        price: 's/. 343 x noche'
      },
    ],
    cabanas: [
      {
        src: 'assets/images/salcantay.png',
        location: 'SALCANTAY, PERÚ',
        rating: '⭐ 4.61',
        date: '17 - 22 setiembre',
        price: 's/. 153 x noche'
      },
      {
        src: 'assets/images/valley.png',
        location: 'VALLEY, PERÚ',
        rating: '⭐ 4.99',
        date: '08 - 13 setiembre',
        price: 's/. 409 x noche'
      },
      {
        src: 'assets/images/cusco.png',
        location: 'CUSCO, PERÚ',
        rating: '⭐ 4.95',
        date: '19 - 24 setiembre',
        price: 's/. 638 x noche'
      },
      {
        src: 'assets/images/zuñiga.png',
        location: 'ZUÑIGA, PERÚ',
        rating: '⭐ 4.76',
        date: '02 - 07 setiembre',
        price: 's/. 567 x noche'
      },
    ]
  };

  selectedType: string = 'casa';  // Tipo por defecto
  selectedItems: any[] = [];      // Inicializamos como un arreglo vacío

  ngOnInit(): void {
    // Asegurarnos de que 'selectedType' existe en 'informacionPorTipo' antes de asignarlo
    this.updateSelectedItems();
  }

  // Método para actualizar los elementos según el tipo seleccionado
  onSelectType(type: string): void {
    this.selectedType = type;
    this.updateSelectedItems();
  }

  // Método para actualizar los 'selectedItems' basados en 'selectedType'
  private updateSelectedItems(): void {
    if (this.informacionPorTipo[this.selectedType]) {
      this.selectedItems = this.informacionPorTipo[this.selectedType];
    } else {
      // Si no hay datos para el tipo seleccionado, se puede manejar de alguna forma
      this.selectedItems = [];
    }
  }
}
