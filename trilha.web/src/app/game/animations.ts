import { trigger, transition, style, animate, state } from '@angular/animations';export const fadeAnimation =

trigger('fadeAnimation', [
    state('true', style({
        overflow: 'hidden',
        transform: 'translate({{coordenada}}vmin, {{coordenada1}}vmin)'
    }),  {params: {
        coordenada:0,
        coordenada1:0

    }}),
    transition(':enter', [
        style({transform: 'translateX(0%)'}),
        animate('300ms ease-in', )
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({transform: 'translateX(0%)'}))
      ])
  ]);