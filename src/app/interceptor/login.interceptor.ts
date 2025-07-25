import {HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {catchError, EMPTY, throwError} from "rxjs";
/*
Este interceptor se encarga de añadir el token de autorización a las peticiones
Se genera con el comando ng g interceptor interceptor/login --skip-tests
Se registra en app.config.ts cómo parametro de provideHttpClient:
provideHttpClient(withInterceptors([loginInterceptor]))
 */

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Intercepto!!");
  const token = localStorage.getItem('token');
  console.log("Token recuperado:", token)
  let authReq = req;
  // Clona la solicitud y añade el encabezado de autorización
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer "+
        localStorage.getItem("token")?.toString())
    });
    console.log("Se terminó de clonar la solicitud");
  }

  return next(authReq).pipe(
    catchError(error => {
      console.log("Error en la petición");
      if (error.status === HttpStatusCode.Forbidden) {
        //this.loginService.logout();
        alert("NO TIENES PERMISOS!")
        return EMPTY;
      } else {
        return throwError(() => error);
      }
    })
  );
};
