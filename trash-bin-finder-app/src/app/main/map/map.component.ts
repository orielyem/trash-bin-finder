import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,Inject
} from '@angular/core';
import {
  Map,
  PointTuple,
  Marker,
  ZoomAnimEvent,
  Icon,
  FeatureGroup,
  LayerOptions
} from 'leaflet';
import * as esri from 'esri-leaflet';
import { QueryFormComponent } from '../query-form/query-form.component';
import {MAP_CONFIG} from '../main.config'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges {
  @Input('markers') private markers;
  private currentMarkers;
  private _map;
  private baseLayer;
  private icon;
  private onMouseMoveHandler;
  private isMapLoaded;

  lanLatText;

  constructor( @Inject(MAP_CONFIG) private config) {

    this.currentMarkers = [];
    this.onMouseMoveHandler = (evt: any) => this.onMapMouseMove(evt);
    this.icon = new Icon({
      iconUrl: config.iconSettings.mapIcon,
      iconSize:  config.iconSettings.iconSize as PointTuple,
      iconAnchor:  config.iconSettings.iconAnchor as PointTuple,
      shadowUrl:  config.iconSettings.mapShadowIcon,
      shadowSize:  config.iconSettings.shadowSize as PointTuple,
      shadowAnchor:  config.iconSettings.shadowAnchor as PointTuple,
    });
  }
  ngOnInit() {
    this.renderMap();
  }
  ngOnChanges(): void {
    if (this.isMapLoaded) {
      this.removeCurenntMarkers();
      this.showMarkers();
    }
  }

  protected renderMap(): void {
    this._map = new Map('mapid').setView([32.079, 34.794], 10);
    this.baseLayer = esri.basemapLayer('Imagery');
    this._map = this._map.addLayer(this.baseLayer);
    this.isMapLoaded = true;
  }

  protected removeCurenntMarkers() {
    this.currentMarkers.forEach((marker) => {
      this._map.removeLayer(marker);
    });
    this.currentMarkers = [];
  }
  protected showMarkers(): void {
    let maxLat;
    let minLon;

    for (let i = 0; i < this.markers.length; i++) {
      this.currentMarkers.push(
        new Marker([this.markers[i][0], this.markers[i][1]], {
          icon: this.icon,
        }).addTo(this._map)
      );
    }
    if (this.currentMarkers.length > 0) {
      this.mapZoomoFitMarkers(this.currentMarkers);
    }
  }

  mapZoomoFitMarkers(markers) {
    this._map.fitBounds(new FeatureGroup(markers).getBounds());
  }

  public ngAfterViewInit(): void {
    this.initMapHandlers();
  }

  protected initMapHandlers(): void {
    this._map.on('mousemove', this.onMouseMoveHandler);
  }

  protected onMapMouseMove(evt: any): void {
    const lat: string = evt.latlng.lat.toFixed(2);
    const long: string = evt.latlng.lng.toFixed(2);
    this.lanLatText = `Latitude: ${lat} , Longitude: ${long}`;
  }
}
