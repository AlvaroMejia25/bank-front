import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../domain/customer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [CustomerService], // Agregar esto para inyectar el servicio
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'] // Corrección: styleUrl -> styleUrls
})
export class CustomerListComponent implements OnInit {
  
  customers: Customer[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.loading = true;
    this.customerService.findAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los clientes';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
