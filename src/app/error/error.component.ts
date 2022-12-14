import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  private errorSub!: Subscription;
  constructor(
    private dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.errorSub = this.errorService
      .getErrorListener()
      .subscribe((message) => {
        this.data = { message: message };
      });
  }

  onHandleError() {
    this.errorService.handleError();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
  closeErrorBox() {
    this.dialogRef.close();
  }
}
