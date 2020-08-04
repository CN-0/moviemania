import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VedioPlayerService } from './vedioplayer.service';

@Component({
  selector: 'app-vedioplayer',
  templateUrl: './vedioplayer.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class VedioplayerComponent implements OnInit, OnDestroy {
  safeURL: SafeResourceUrl;
  vedioKey: string;
  VedioPlayerService: any;
  @ViewChild('vedioContent', {static: true}) vedioContent: ElementRef;

  constructor(private _sanitizer: DomSanitizer, private modalService: NgbModal, private vedioservice: VedioPlayerService) {
  }
  ngOnInit(): void {
    this.vedioservice.vedioDataEmitter
      .subscribe(data => {
        this.vedioKey = data;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.vedioKey);
        this.openBackDropCustomClass(this.vedioContent);
      });
  }
  openBackDropCustomClass(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', size: 'xl', windowClass: 'dark-modal', centered: true });
  }
  ngOnDestroy(): void{
    this.vedioservice.vedioDataEmitter.unsubscribe();
  }

}
