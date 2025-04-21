import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customer.service';
import { DocumentTypeService } from '../../service/document-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentType } from '../../domain/document-type';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class CustomerEditComponent implements OnInit {
  custId!: number;
  customer!: Customer;
  documentTypes: DocumentType[]=[];
  showMsg: boolean = false;
  messages: string[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public documentTypeService: DocumentTypeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.custId = +id;

        this.customerService.findById(this.custId).subscribe({
          next: (data) => {
            this.customer = data;
            console.table(this.customer);
          },
          error: (err) => {
            console.error('Error loading customer:', err);
            this.messages.push('No se pudo cargar la información del cliente.');
            this.showMsg = true;
          },
        });
      } else {
        this.messages.push('ID del cliente no proporcionado en la URL.');
        this.showMsg = true;
      }
    });
    this.findAllDocumentType();
  }

  findAllDocumentType(): void {
    this.documentTypeService.findAll().subscribe({
      next: (data) => {
        this.documentTypes = data;
      },
      error: (err) => {
        console.error('Error al obtener los tipos de documento', err);
        this.messages = ['Error al cargar los tipos de documento'];
        this.showMsg = true;
      }
    });
  }

  update():void{
    this.customerService.update(this.customer).subscribe({
      next: () => {
        this.showMsg = true;
        this.messages = ["El customer se modificó con éxito"];
        this.router.navigate(['/customer-list']);
      },
      error: (err) => {
        this.showMsg = true;
  
        // Verificar si el error tiene estructura esperada
        if (err.error?.message) {
          this.messages = [err.error.message]; // Caso 1: Mensaje único del backend
        } else if (Array.isArray(err.error)) {
          this.messages = err.error; // Caso 2: El backend devuelve una lista de errores
        } else {
          this.messages = ["Ocurrió un error inesperado. Inténtalo de nuevo."]; // Fallback
        }
      }
    });
  }

  delete():void{
    this.customerService.delete(this.customer.custId).subscribe({
      next: () => {
        this.showMsg = true;
        this.messages = ["El customer se borro con éxito"];
        this.router.navigate(['/customer-list']);
      },
      error: (err) => {
        this.showMsg = true;
  
        // Verificar si el error tiene estructura esperada
        if (err.error?.message) {
          this.messages = [err.error.message]; // Caso 1: Mensaje único del backend
        } else if (Array.isArray(err.error)) {
          this.messages = err.error; // Caso 2: El backend devuelve una lista de errores
        } else {
          this.messages = ["Ocurrió un error inesperado. Inténtalo de nuevo."]; // Fallback
        }
      }
    });
  }
}