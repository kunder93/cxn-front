import { useEffect } from "react";

const usePageTitle = (newTitle: string) => {
    useEffect(() => {
        document.title = newTitle;

        return () => {
            document.title = 'Título predeterminado o de la aplicación';
        };
    }, [newTitle]);
};

export default usePageTitle;
