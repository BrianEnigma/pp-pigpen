import {
  transition,
  trigger,
  query,
  style,
  animate,
  animateChild,
  group
} from "@angular/animations";

export const fader = trigger("faderAnimation", [
  transition("* <=> *", [
    query(":enter, :leave", [
      style({
        position: "absolute",
        left: 0,
        width: "100%",
        opacity: 0,
        transform: "scale(0) translateY(100%)"
      })
    ]),
    query(":enter", [
      animate(
        "600ms ease",
        style({ opacity: 1, transform: "scale(1) translateY(0)" })
      )
    ])
  ])
]);

export const slideInAnimation = trigger("slideInAnimation", [
  transition("* <=> *", [
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%"
        })
      ],
      { optional: true }
    ),
    query(":enter", [style({ left: "-100%" })], { optional: true }),
    query(":leave", animateChild(), { optional: true }),
    group([
      query(":leave", [animate("300ms ease-out", style({ left: "100%" }))], {
        optional: true
      }),
      query(":enter", [animate("300ms ease-out", style({ left: "0%" }))], {
        optional: true
      })
    ]),
    query(":enter", animateChild(), { optional: true })
  ])
]);

export const fadeAnimation = trigger("fadeAnimation", [
  // The '* => *' will trigger the animation to change between any two states
  transition("* => *", [
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    query(
      ":leave",
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({ opacity: 1 }), animate("0.3s", style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ":enter",
      [style({ opacity: 0 }), animate("0.3s", style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
