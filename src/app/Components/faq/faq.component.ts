import {Component, OnInit, NgModule, trigger, transition, style, animate, state} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  imgSrc = '/assets/images/minus.png';
  imgSrc2 = '/assets/images/minus.png';

  constructor() {
  }

  ngOnInit() {
  }

  toggle(obj) {

    const str = obj.slice(1);
    console.log('str:' + str);

    const x = document.getElementById(obj);

    if (x.style.display === 'none') {
      x.style.display = 'block';
      if (str === 'div1') {
        this.imgSrc = '/assets/images/minus.png';
      } else if (str === 'div2') {
        this.imgSrc2 = '/assets/images/minus.png';
      }

    } else {
      x.style.display = 'none';
      if (str === 'div1') {
        this.imgSrc = '/assets/images/add(1).png';
      } else if (str === 'div2') {
        this.imgSrc2 = '/assets/images/add(1).png';
      }

    }
  }
}
