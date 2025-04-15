import { SafeUrl } from '@angular/platform-browser';

export interface FileHandel {
    readonly file: File;
    readonly url: SafeUrl;
}
