export const fetchProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5; 
        if (shouldFail) {
          reject("Fallo al cargar los productos");
        } else {
          resolve([
            {
              id: "1",
              name: "celular",
              price: 400,
              image: "http",
              descripcion: "esto es una descripcion",
            },
            {
              id: "2",
              name: "tv",
              price: 500,
              image: "http",
              descripcion: "esto es una descripcion",
            },
            {
              id: "3",
              name: "Tabler",
              price: 900,
              image: "http",
              descripcion: "esto es una descripcion",
            },
          ]);
        }
      }, 1000);
    });
  };
  