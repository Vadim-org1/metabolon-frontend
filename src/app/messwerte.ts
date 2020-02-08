
/* https://stackoverflow.com/questions/14142071/typescript-and-field-initializers */
/* tslint:disable:variable-name */
export class Messwerte {

  private monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];

  // ? - means that a property is optional
  datum?: Date;
  day?: number;
  month?: number;
  year?: number;

  niederschlag?: number;
  aussentemperatur?: number;
  zulauf_ka?: number;
  ph_zulauf_ka?: number;
  temperatur_zulauf_ka?: number;
  leitfaehigkeit_zulauf_ka?: number;
  ablauf_ka?: number;
  ph_ablauf_ka?: number;
  temperatur_ablauf_ka?: number;
  leitfaehigkeit_ablauf_ka?: number;
  faellmittelmenge_fecl3?: number;
}
