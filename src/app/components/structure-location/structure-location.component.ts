import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/shared/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

declare const L: any;

@Component({
  selector: 'app-structure-location',
  templateUrl: './structure-location.component.html',
  styleUrls: ['./structure-location.component.css'],
})
export class StructureLocationComponent implements OnInit {
  user_id: string = '';

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    // refresh the left-side-bar and the app-component-----> could catch an error if an incorrect user_id is given
    this._userService.getUserById(this.user_id + '').subscribe((user) => {
      LeftSideBarComponent.user_id = this.user_id;
      if (user.is_specialist) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.is_admin) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });

    // get position
    if (!navigator.geolocation) {
      console.log('location is not supported !');
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(
          `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
        );

        let latLong = [position.coords.latitude, position.coords.longitude];
        let structuresDeSante: { name: string; coords: number[] }[] = [
          {
            name: 'service Medical EPT',
            coords: [14.79759710124241, -16.967394452231684],
          },
          {
            name: 'Laboratoire National De Santé Publique Thies',
            coords: [14.793898530303617, -16.934326696057074],
          },
          {
            name: 'Institut Santé Multi Services',
            coords: [14.791687882207437, -16.93231344256073],
          },
          {
            name: 'Poste de Santé Sainte Anne',
            coords: [14.80054264648186, -16.929123533899006],
          },
          {
            name: 'Centre De Santé 10ème De Thiès',
            coords: [14.794363679206366, -16.925522327098545],
          },
          {
            name: 'District sanitaire de thies Poste de sante de mbour1',
            coords: [14.776985246064234, -16.943613431493993],
          },
        ];

        let map = L.map('map').setView(latLong, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        let marker = L.marker(latLong).addTo(map);
        marker.bindPopup('Votre position').openPopup();

        for (let structure of structuresDeSante) {
          let circle = L.circle(structure.coords, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100,
          }).addTo(map);
          circle.bindPopup(
            `${structure.name} <br> Latitude: ${structure.coords[0]} <br> Latitude: ${structure.coords[1]}`
          );
        }

        //this.watchPostion(14.7942, -16.9649, .0001);
      }
    );
  }

  // watch position function
  watchPostion(destLat: number, destLong: number, precision: number) {
    let watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (
          Math.abs(position.coords.latitude - destLat) < precision &&
          Math.abs(position.coords.longitude - destLong) < precision
        ) {
          navigator.geolocation.clearWatch(watchId);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
