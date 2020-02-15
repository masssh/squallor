export class Application {
  private _services = new Map<any, any>();

  constructor() {
    console.log('instantiating Application...');
  }

  startup() {
    console.log('starting Application...');
  }
}
