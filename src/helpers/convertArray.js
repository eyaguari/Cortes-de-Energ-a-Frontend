// Convierte un string de coordenadas a un array de arrays de coordenadas
export const stringToPolygon = (str) => {
    return str.split(',').reduce((acc, val, index, array) => {
        if (index % 2 === 0) {
            acc.push([parseFloat(array[index]), parseFloat(array[index + 1])]);
        }
        return acc;
    }, []);
};

// Convierte un array de arrays de coordenadas a un string de coordenadas
export const polygonToString = (polygon) => {
    return polygon.flat().join(',');
};