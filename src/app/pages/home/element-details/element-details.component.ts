import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { IElement } from '../interfaces/element.interface';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss']
})
export class ElementDetailsComponent implements OnInit {
  elementDetails!: IElement;
  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(map((elements: any) => elements.elementDetails[0]))
      .subscribe(details => {
        this.elementDetails = details;
      })
  }

}
