import * as React from 'react';
import {Box, Container, Typography} from '@mui/material';
import ImageContent from "../components/ImageContent";
import axios from "axios";
import {asImageFormat} from "../utils/image";

export default function Home({images}) {
    return (
        <Container sx={{textAlign: 'center'}}>
            <Typography variant={'h1'}>Welcome to gallery</Typography>
            <ImageContent data={images}/>
        </Container>
    );
}
export async function getStaticProps(context) {
    const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_UNSPLASH_API_URL}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=1`
    );
    const result = asImageFormat(data);
    return {
        props: {images: result},
    }
}