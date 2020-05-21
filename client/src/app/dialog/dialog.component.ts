import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetProfsService } from '../get-profs.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private getData:GetProfsService) { }

  summary="";
  async ngOnInit() {
    let val=await this.getData.getSummaryData(this.data.url);
    this.summary=val['sm_api_content'];
  }

}
