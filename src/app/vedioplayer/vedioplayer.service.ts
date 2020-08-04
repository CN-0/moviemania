import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class VedioPlayerService {
    vedioDataEmitter = new Subject<string>();
}
