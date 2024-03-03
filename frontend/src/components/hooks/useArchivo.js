
let useArchivo = () => {

  let descargaExcelDesdeBase64 = (base64) => {

    const crudo = atob(base64);
    const bytes = new Array(crudo.length);

    for (let i = 0; i < crudo.length; i++) {
      bytes[i] = crudo.charCodeAt(i);
    }

    const obj = new Blob
    ( 
      [new Uint8Array(bytes)],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );

    const url = URL.createObjectURL(obj);
    const enlaceDescarga = document.createElement('a');

    enlaceDescarga.href = url;
    enlaceDescarga.download = "Ejemplo-carga.xlsx";
    
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(enlaceDescarga);

  };
    
  let leerArchivo = (archivo) => {
      return new Promise((resolve, reject) => {
          let leer = new FileReader();
          leer.onload = (e) => {
            let resultado = leer.result;
            let cadenaArray = resultado.split(",");
            resolve({ archBase64: cadenaArray[1], tipoArchivo: archivo.type, nombre: archivo.name });
          };
          leer.onerror = (e) => {
            reject(new Error("Error al leer el archivo"));
          };
          leer.readAsDataURL(archivo);
        });
  };

  let archivo = async (file) => {
    return await leerArchivo(file);
  };

  return [ archivo, descargaExcelDesdeBase64 ];
};

export default useArchivo;