import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-meteo',
  templateUrl: './card-meteo.component.html',
  styleUrls: ['./card-meteo.component.scss']
})
export class CardMeteoComponent {
  public dateTimeVisual: string = "";
  public tempsArray: string[] = [];
  public dateArray: string[]= [];
  public weathercode: number[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.onMeteo();
  }

  onMeteo(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dateTime = `${year}-${month}-${day}T14:00`;
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.dateTimeVisual = `${month}-${day}`;
        this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timeformat=unixtime&timezone=auto`).subscribe((data: any) => {
          const index = data.hourly.time.indexOf(dateTime);
          console.log(data);
          this.tempsArray = data.hourly.temperature_2m;
          this.dateArray = data.hourly.time;
          this.weathercode = data.hourly.weathercode;
        });
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  } 

  convertUnixTime(timestamp: string) {
    const date = new Date(Number.parseInt(timestamp)* 1000); // Convertir les secondes en millisecondes
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajouter 1
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}`;
  }
}
