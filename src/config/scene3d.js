// Shared 3D layout for the entrance "dolly-in" journey, so the camera path
// (Experience/CameraRig), the parallax layers (EntranceScene) and the cake
// (MagicCake) all agree on where things live in world space.
//
// The reference: start outside facing the «Кокос» signboard → camera dollies
// forward THROUGH the facade/doors into the interior → settles on the cake.

export const LAYOUT = {
  // Parallax layers along Z (camera flies from +Z toward −Z).
  foreground: { z: 2.6, y: 1.9 }, // signboard / facade (closest)
  midground: { z: -4 }, //           interior: counter, display, logs
  background: { z: -8 }, //          back wall, windows

  // Hero cake (Scene 2) — the camera's final focus.
  cake: { z: -1, lookY: 0.95 },

  // Camera keyframes (interpolated by scroll.offset, eased).
  camStart: { pos: [0, 1.7, 7.0], look: [0, 1.9, 2.6] }, // outside, on the sign
  camEnd: { pos: [0, 1.15, 1.8], look: [0, 0.95, -1.0] }, // close-up on the cake

  dollyEnd: 0.55, // scroll.offset at which the dolly-in completes
  fgFade: [0.2, 0.4], // foreground fades/rises across this offset range (>0.3)
};
