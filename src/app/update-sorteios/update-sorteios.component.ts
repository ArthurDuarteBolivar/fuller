import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sorteios',
  templateUrl: './update-sorteios.component.html',
  styleUrls: ['./update-sorteios.component.scss']
})
export class UpdateSorteiosComponent implements OnInit{
  constructor(private actRoute: ActivatedRoute){}

  ngOnInit(): void {
      this.actRoute.params.subscribe(res => console.log(res))
  }
}
