import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/',
  username : 'Arthur',
  password: '5691',
};

const basicAuth  = btoa(environment.username + ':' + environment.password)

export const headers = new HttpHeaders({
  Authorization: "Basic " + basicAuth,
});
