import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-meteo',
  templateUrl: './card-meteo.component.html',
  styleUrls: ['./card-meteo.component.scss']
})
export class CardMeteoComponent {
  public temperature: number = 0;
  public dateTimeVisual: string = "";
  public tempsArray: string[] = [];
  public dateArray: string[]= [];
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
        this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timeformat=unixtime`).subscribe((data: any) => {
          const index = data.hourly.time.indexOf(dateTime);
          console.log(data);
          this.temperature = data.hourly.temperature_2m[index];
          this.tempsArray = data.hourly.temperature_2m;
          this.dateArray = data.hourly.time;
        });
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  } 

  convertUnixTime(timestamp: number) {
    const date = new Date(timestamp * 1000); // Convertir les secondes en millisecondes
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajouter 1
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}`;
  }
}
