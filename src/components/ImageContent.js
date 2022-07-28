import React, {useState} from "react";
import {ImageList, ImageListItem, Box, Grid} from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";
import {asImageFormat, pattern} from "../utils/image";
import axios from "axios";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ImageContent({data}) {
    const [images, setImages] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);


    const getMoreImage = async () => {
        const {data} = await axios.get(
            `${process.env.NEXT_PUBLIC_UNSPLASH_API_URL}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=${page}`
        );
        const newImages = asImageFormat(data);
        setPage(page + 1);
        console.log(page);
        setImages((image) => [...image, ...newImages]);
    };

    return (
        <>
            <InfiniteScroll
                dataLength={images.length}
                next={getMoreImage}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                <ImageList
                    variant="quilted"
                    cols={6}
                >
                    {images.map((item, index) => (
                        <ImageListItem key={item.img}
                                       cols={pattern[index - Math.floor(index / pattern.length) * pattern.length].cols}
                                       rows={pattern[index - Math.floor(index / pattern.length) * pattern.length].rows}>
                            <img
                                {...srcset(item.img, 250, pattern[index - Math.floor(index / pattern.length) * pattern.length].rows, pattern[index - Math.floor(index / pattern.length) * pattern.length].cols)}
                                alt={item.description}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </InfiniteScroll>
        </>
    )
}




