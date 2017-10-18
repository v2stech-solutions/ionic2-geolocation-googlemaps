import { Component,ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
  declare var google: any;

  import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:[`
  #map {
    height: 100%;
    width:100%
  
}`],
  encapsulation: ViewEncapsulation.None

})
export class HomePage {

@ViewChild('map') mapElement: ElementRef;
 private map: any;

  constructor(public platform: Platform,public navCtrl: NavController,private geolocation: Geolocation,public toastCtrl: ToastController,private googleMaps: GoogleMaps) {

       platform.ready().then(() => {
         this.getCuurrentLocation()
          console.log("Start Loding MAP....")
      });
  }

  getCuurrentLocation():void{
        this.geolocation.getCurrentPosition().then((resp) => {
          this.showMyLocation(resp.coords.latitude,resp.coords.longitude);    
          debugger;
          this.loadMap(resp.coords.latitude,resp.coords.longitude);
          this.map = new GoogleMap('map');

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
          /*this.map.setCenter(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
          var position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          var dogwalkMarker = new google.maps.Marker({position: position, title: "Test",visible:true});
          dogwalkMarker.setMap(this.map);*/

          /*this.map.addMarker({
            
              'position': {lat:resp.coords.latitude,lng:resp.coords.longitude},
              'visible': true,
              'markerClick': function(marker) {
                console.log('Inside Add Marker');
              }
          });*/
          
          

          
         /* let marker = new google.maps.Marker({
            position: this.position,
            map: this.map,
            visible : true,
            title: 'Test'
          }); */
        });
        
      }).catch((error) => {
          console.log('Error getting location', error);
      });
      
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
 
      });
  }

  loadMap(lat,long){
    console.log("Map is loaded");
    let latLng = new google.maps.LatLng(lat, long);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var position = new google.maps.LatLng(lat, long);
    var dogwalkMarker = new google.maps.Marker({position: position, title: "Test",visible:true});
    dogwalkMarker.setMap(this.map);
  }

  showMyLocation(lat,lng):void{
      
      let toast = this.toastCtrl.create({
      message: "Lattitude is "+lat+" and "+ "Longitude is "+lng ,
      duration: 3000
    });
    toast.present();
  }



}
