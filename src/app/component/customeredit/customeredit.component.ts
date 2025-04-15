import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customer.service';
import { DocumentTypeService } from '../../service/document-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CustomerEditComponent implements OnInit {
  custId!: number;
  customer!: Customer;
  documentTypes!: DocumentType[];

  showMsg: boolean = false;
  messages: string[] = [''];

  constructor(
    public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public documentTypeService: DocumentTypeService,
  ) {}

  ngOnInit(): void {
    this.custId = this.activatedRoute.snapshot.params['custId'];
    this.customerService.findById(this.custId).subscribe((data) => {
      this.customer = data;
      console.table(this.customer);
    });
  }
}
