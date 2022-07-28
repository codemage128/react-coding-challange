// change the data with readable data format
export function asImageFormat(data) {
    const result  = [];
    data.forEach(item => {
        const imageItem = {
            id: item.id,
            img: item.urls.small,
            description: item.description,
        }
        result.push(imageItem);
    })
    return result;
}

// pattern for the image display
export const pattern = [
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 2,
    },
    {
        rows: 1,
        cols: 2,
    },
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 1,
    },
]