const CreateMatrix = (dim, data) => {
    let matrix = Array(dim).fill().map(()=>Array(dim).fill(0)); 
    data.forEach(element => {
        let {x,y} = element;
        x = x-1 >= 0 ? x-1 : 0;
        y = y-1 >= 0 ? y-1 : 0;
        matrix[y][x] = 80;
    });
    return matrix
}

const update_top = (matrix, co_ord, wind_direction) => {
    let [y, x] = co_ord;
    y -= 1;
    try {
        if(matrix[y][x] !== undefined) {
            if(matrix[y][x] === 80) {
                return (matrix);
            }
            else if(wind_direction === "NORTH" && matrix[y][x] !== 80) {
                matrix[y][x] = 50;
                return matrix;
            }
            else if (wind_direction !== "NORTH" && matrix[y][x] !== 80 && matrix[y][x] !== 50) {
                matrix[y][x] = 25;
                return matrix;
            }
            else if (wind_direction !== "NORTH" && matrix[y][x] === 50) {
                return matrix;
            }
        } else return (matrix);
    }
    catch(e) {
        return (matrix);
    }
} 

const update_down = (matrix, co_ord, wind_direction) => {
    let [y, x] = co_ord;
    y += 1;
    try {
        if(matrix[y][x] !== undefined) {
            if(matrix[y][x] === 80) {
                return (matrix);
            }
            else if(wind_direction === "SOUTH" && matrix[y][x] !== 80) {
                matrix[y][x] = 50;
                return matrix;
            }
            else if (wind_direction !== "SOUTH" && matrix[y][x] !== 80 && matrix[y][x] !== 50) {
                matrix[y][x] = 25;
                return matrix;
            }
            else if (wind_direction !== "SOUTH" && matrix[y][x] === 50) {
                return matrix;
            }
        } else return (matrix);
    }
    catch(e) {
        return (matrix);
    }
}

const update_left = (matrix, co_ord, wind_direction) => {
    let [y, x] = co_ord;
    x -= 1;
    try {
        if(matrix[y][x] !== undefined) {
            if(matrix[y][x] === 80) {
                return (matrix);
            }
            else if(wind_direction === "WEST" && matrix[y][x] !== 80) {
                matrix[y][x] = 50;
                return matrix;
            }
            else if (wind_direction !== "WEST" && matrix[y][x] !== 80 && matrix[y][x] !== 50) {
                matrix[y][x] = 25;
                return matrix;
            }
            else if (wind_direction !== "WEST" && matrix[y][x] === 50) {
                return matrix;
            } 
        } else return (matrix);
    }
    catch(e) {
        return (matrix);
    }
}

const update_right = (matrix, co_ord, wind_direction) => {
    let [y, x] = co_ord;
    x += 1;
    try {
        if(matrix[y][x] !== undefined) {
            if(matrix[y][x] === 80) {
                return (matrix);
            }
            else if(wind_direction === "EAST" && matrix[y][x] !== 80) {
                matrix[y][x] = 50;
                return (matrix);
            }
            else if (wind_direction !== "EAST" && matrix[y][x] !== 80 && matrix[y][x] !== 50) {
                matrix[y][x] = 25;
                return (matrix);
            }
            else if (wind_direction !== "EAST" && matrix[y][x] === 50) {
                return (matrix);
            }
        } else return (matrix);
    }
    catch(e) {
        return (matrix);
    }
}

const UpdateMatrix = (matrix, wind_direction) => {
    for (let i = 0; i < matrix.length; ++i){
        let row = matrix[i];
        for(let j = 0; j < row.length; ++j) {
            if(row[j] === 80){
                update_top(matrix, [i,j], wind_direction);
                update_left(matrix, [i,j], wind_direction);
                update_down(matrix, [i,j], wind_direction);
                update_right(matrix, [i,j], wind_direction);
            }
        } 
    }
    return(matrix);
}

const CalculateImpact = (matrix, gridSize) => {
    const total = matrix.flat().reduce((a , b) => a + b);
    const impact = (total/Math.pow(gridSize,2)).toFixed(2);
    return(impact);
}

export {
    CreateMatrix,
    UpdateMatrix,
    CalculateImpact,
}
