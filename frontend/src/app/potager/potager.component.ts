import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-potager',
  templateUrl: './potager.component.html',
  styleUrls: ['./potager.component.scss']
})
export class PotagerComponent implements OnInit {
  public temperature: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.onMeteo();
  }

  onMeteo(){
    const myArray: string[] = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const dateTime = `${year}-${month}-${day}T${hours}:00`;
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`).subscribe((data: any) => {
          const index = data.hourly.time.indexOf(dateTime);
          this.temperature = data.hourly.temperature_2m[index];
        });
      });
    } else {
      console.log("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  }    
}
 