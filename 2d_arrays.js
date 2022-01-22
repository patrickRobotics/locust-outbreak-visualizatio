const data = {
    "grid_width_and_length": 6,
	"wind_direction": "EAST",
	"confirmed_outbreaks": [{
			"x": 2,
			"y": 2
		},
		{
			"x": 4,
			"y": 3
		}
	]
}

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
    for (i = 0; i < matrix.length; ++i){
        let row = matrix[i];
        for(j = 0; j < row.length; ++j) {
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

const matrix = CreateMatrix(data.grid_width_and_length, data.confirmed_outbreaks);
console.table(matrix);

const visualization_data = UpdateMatrix(matrix, data.wind_direction);
console.table(visualization_data);

const impact = CalculateImpact(matrix, data.grid_width_and_length);
console.log("Total impact: " + impact);

/**
 * Given 2D Array and wind direction as NORTH: 
┌─────────┬───┬────┬────┬────┐
│ (index) │ 0 │ 1  │ 2  │ 3  │
├─────────┼───┼────┼────┼────┤
│    0    │ 0 │ 0  │ 0  │ 0  │
│    1    │ 0 │ 80 │ 80 │ 80 │
│    2    │ 0 │ 0  │ 80 │ 0  │
│    3    │ 0 │ 0  │ 0  │ 0  │
└─────────┴───┴────┴────┴────┘
 * 
Expected output:
┌─────────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │
├─────────┼────┼────┼────┼────┤
│    0    │ 0  │ 50 │ 50 │ 50 │
│    1    │ 25 │ 80 │ 80 │ 80 │
│    2    │ 0  │ 25 │ 80 │ 25 │
│    3    │ 0  │ 0  │ 25 │ 0  │
└─────────┴────┴────┴────┴────┘
 * 
 * 
 * If wind direction as EAST: 
Expected output:
┌─────────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │
├─────────┼────┼────┼────┼────┤
│    0    │ 0  │ 25 │ 25 │ 25 │
│    1    │ 25 │ 80 │ 80 │ 80 │
│    2    │ 0  │ 25 │ 80 │ 50 │
│    3    │ 0  │ 0  │ 25 │ 0  │
└─────────┴────┴────┴────┴────┘
 * 
 * 
 * If wind direction as SOUTH: 
Expected output:
┌─────────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │
├─────────┼────┼────┼────┼────┤
│    0    │ 0  │ 25 │ 25 │ 25 │
│    1    │ 25 │ 80 │ 80 │ 80 │
│    2    │ 0  │ 50 │ 80 │ 50 │
│    3    │ 0  │ 0  │ 50 │ 0  │
└─────────┴────┴────┴────┴────┘
 * 
 * 
 * If wind direction as WESt: 
Expected output:
┌─────────┬────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │ 3  │
├─────────┼────┼────┼────┼────┤
│    0    │ 0  │ 25 │ 25 │ 25 │
│    1    │ 50 │ 80 │ 80 │ 80 │
│    2    │ 0  │ 50 │ 80 │ 25 │
│    3    │ 0  │ 0  │ 25 │ 0  │
└─────────┴────┴────┴────┴────┘
 * 
 * 
 */