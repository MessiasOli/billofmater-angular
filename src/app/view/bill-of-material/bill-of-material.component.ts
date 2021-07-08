import { BillOfMaterialService } from './../../services/bill-of-material.service';
import { BillOfMaterial } from './../../model/bill-of-material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Process } from 'src/app/model/process';
import { SwitchWaitService } from 'src/app/services/switch-wait.service';

@Component({
  selector: 'app-bill-of-material',
  templateUrl: './bill-of-material.component.html',
  styleUrls: ['./bill-of-material.component.css']
})
export class BillOfMaterialComponent implements OnInit {

  constructor(
    private service: BillOfMaterialService,
    private wait : SwitchWaitService,
  ) { }

  displayedColumns: string[] = [ "id",  "description",  "specificvalue",  "amount",  "specificunit", "value"];
  process : Process[] = []
  selectedProcess: string = "";
  report: BillOfMaterial [] = []
  total: number = 0
  @ViewChild(MatTable) table !: MatTable<BillOfMaterial>;

  async ngOnInit(): Promise<void> {
    this.wait.switchWait();
    this.process = await this.service.getProcess();
    this.wait.switchWait();
    this.selectedProcess = this.process[0].process
    await this.loadReport(this.process[0].id);
  }

  async loadReport(id:string){
    this.wait.switchWait();
    this.report = await this.service.getReport(id);
    this.total = 0;
    this.report.forEach(r => {this.total += r.value})
    this.wait.switchWait();
  }

}
