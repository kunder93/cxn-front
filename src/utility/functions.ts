import { useEffect } from "react";

/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
    return 'Welcome ' + userName + '!'
}



export const SetPageTitle = (newTitle:string) =>{
useEffect(() => {
    document.title = newTitle; // Establecer el título del documento cuando el componente se monta

    return () => {
      // Restaurar el título original al desmontar el componente, si es necesario
      document.title = 'Título predeterminado o de la aplicación';
    };
  }, [newTitle]);
}

