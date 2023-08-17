export class zoomSettings {

}

export class CashedSettings{
    constructor(scales: any,
        start_date : any,
        end_date: any,
        scroll_position: any) {
        this.scales =  scales,
        this.start_date = start_date,
        this.end_date = end_date ,
        this.scroll_position = scroll_position
      }
      scales: any;
      start_date : any;
      end_date: any;
      scroll_position: any;
}