export class Link {
    constructor(id: string, 
        source: string,
        target: string,
        type: string) {
        this.id = id,
        this.source = source,
        this.target = target,
        this.type = type
      }
    id: string;
    source: string;
    target: string;
    type: string;
}

export class LinkViewModel {
  constructor(id: string, 
      source: string,
      target: string,
      type: string) {
      this.id = id,
      this.source = source,
      this.target = target,
      this.type = type
    }
  id: string;
  source: string;
  target: string;
  type: string;
}