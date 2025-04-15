import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeService } from '../../service/document-type.service';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../domain/customer';
import { DocumentType } from '../../domain/document-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-save',
  standalone: true, // Agregar para Standalone Component
  imports: [CommonModule, FormsModule], // Importar CommonModule para directivas como *ngIf, *ngFor
  templateUrl: './customersave.component.html',
  styleUrls: ['./customersave.component.css'],
})
export class CustomerSaveComponent implements OnInit {
  
  customer: Customer = {} as Customer; // Inicializar para evitar errores
  documentTypes: DocumentType[] = [];

  showMsg: boolean = false; // Ahora el mensaje no se mostrará por defecto
  messages: string[] = [];

  constructor(
    public customerService: CustomerService,
    public documentTypeService: DocumentTypeService) {}

    ngOnInit(): void {
      this.customer = {
        address: '',
        custId: 0,
        dotyId: 0,
        email: '',
        enable: true,
        name: '',
        phone: '',
        token: ''
      }
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


  save(): void {
    this.customerService.save(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se grabo con exito";
    }, error => {
      this.showMsg = true;
      this.messages = error.error.error;
    });
  }

}
