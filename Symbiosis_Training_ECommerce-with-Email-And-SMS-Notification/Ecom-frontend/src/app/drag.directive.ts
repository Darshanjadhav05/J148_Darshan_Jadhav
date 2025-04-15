import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandel } from './_model/file-handel.model';

@Directive({
  selector: '[appDrag]',
  standalone: true,
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandel> = new EventEmitter();

  @HostBinding('style.background') private background = '#eee';

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
      const file = evt.dataTransfer.files[0];

      const url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );

      const fileHandel: FileHandel = { file, url };
      this.files.emit(fileHandel);
    }
  }
}
