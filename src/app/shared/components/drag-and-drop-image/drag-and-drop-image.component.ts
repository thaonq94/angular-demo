import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drag-and-drop-image',
  templateUrl: './drag-and-drop-image.component.html',
  styleUrls: ['./drag-and-drop-image.component.scss']
})
export class DragAndDropImageComponent implements OnInit {
  files: any[] = [];
  localUrl = '';
  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  async fileBrowseHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    let files = target.files as any;
    for(let file of files){
    let reader = new FileReader();
      reader.onload = (_) => {
        file.src = reader.result;
      }
      await reader.readAsDataURL(file);
    }
    console.log('files', files)
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFiles() {
    let _files = this.files.filter(filer => filer.size > 8*1024*1024) 
    if (_files?.length) {
      let config = new MatSnackBarConfig();
      config.duration = 2000;
      this.snackBar.open('Hình upload không được quá 8MB!', '', config)
    }
  }

}
