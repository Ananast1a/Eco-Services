import { icon } from "leaflet";

export let defaultIcon = icon({
  iconSize:    [ 25, 41 ],
  iconAnchor:  [ 13, 41 ],
  popupAnchor: [0,-50],
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png'
})

export let plasticIcon = icon({
  iconSize:    [40, 40],
  iconAnchor:  [12, 34],
  popupAnchor: [6, -40],
  iconUrl: 'assets/markers/plastic.png',
})

export let paperIcon = icon({
  iconSize:    [35, 35],
  iconAnchor:  [12, 34],
  popupAnchor: [6, -40],
  iconUrl: 'assets/markers/paper.png',
})

export let glassIcon = icon({
  iconSize:    [35, 35],
  iconAnchor:  [12, 34],
  popupAnchor: [6, -40],
  iconUrl: 'assets/markers/glass.png',
})

export let metalIcon = icon({
  iconSize:    [35, 35],
  iconAnchor:  [12, 34],
  popupAnchor: [6, -40],
  iconUrl: 'assets/markers/metal.png',
})

export let multipleIcon = icon({
  iconSize:    [35, 35],
  iconAnchor:  [12, 34],
  popupAnchor: [6, -40],
  iconUrl: 'assets/markers/multiple.png',
})

export let icons : any = {
  paperIcon: paperIcon,
  metalIcon: metalIcon,
  glassIcon: glassIcon,
  plasticIcon: plasticIcon,
  multipleIcon: multipleIcon
}