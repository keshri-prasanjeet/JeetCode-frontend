// animations.ts
import {trigger, transition, style, query, animate, group, animateChild} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    // Styles for host and child views
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    // Animation for entering view sliding


    //   query(':enter', [
    //     style({ left: '-100%' })
    //   ], { optional: true }),
    //   query(':leave', animateChild(), { optional: true }),
    //   group([
    //     query(':leave', [
    //       animate('1000ms ease-out', style({ left: '100%' }))
    //     ], { optional: true }),
    //     query(':enter', [
    //       animate('1000ms ease-out', style({ left: '0%' }))
    //     ], { optional: true }),
    //   ]),
    // ]),

    // Animation for entering view fading
    query(':enter', [
      style({ opacity: 0 })  // Start with opacity 0 for fade in effect
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('200ms ease-out', style({ opacity: 1 }))  // Fade in by changing opacity to 1
      ], { optional: true }),
    ]),
  ]),






  // Generic transition for all other cases sliding
  // transition('* <=> *', [
  //   style({ position: 'relative' }),
  //   query(':enter, :leave', [
  //     style({
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       width: '100%'
  //     })
  //   ], { optional: true }),
  //   query(':enter', [
  //     style({ left: '-100%' })
  //   ], { optional: true }),
  //   query(':leave', animateChild(), { optional: true }),
  //   group([
  //     query(':leave', [
  //       animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
  //     ], { optional: true }),
  //     query(':enter', [
  //       animate('300ms ease-out', style({ left: '0%' }))
  //     ], { optional: true }),
  //     query('@*', animateChild(), { optional: true })
  //   ]),
  // ])
]);
