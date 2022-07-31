import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IElement } from 'src/app/pages/home/interfaces/element.interface';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() elements$: Observable<IElement[]> = of([]);

  constructor() { }

  ngOnInit(): void {}

}
